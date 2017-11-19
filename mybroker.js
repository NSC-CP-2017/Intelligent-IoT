var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Projects = require('./models/Projects');
var Devices = require('./models/Devices');

mongoose.connect('mongodb://localhost/IntelligentThings');

var mosca = require('mosca');

var pubsub = {
    type: 'mongo',		
    url: 'mongodb://localhost:27017/mqtt',
    pubsubCollection: 'pubsub',
    mongo: {}
};

var moscaSettings = {
    port: 1883,
    backend: pubsub,
};

var server = new mosca.Server(moscaSettings);

server.on('ready', setup);

var updateDeviceData = function(deviceID,value,lat,lon){
    Devices.findOne({deviceID:deviceID}).exec(function(err,device){
        var date = new Date();
        device['data'].push({'value': value,'date': date});
        device['position'].push({'date': date,'lat': lat,'lon': lon});
        device.save((err)=>{console.log(err);});
    });
};
var setDeviceOnline = function(deviceID,isOnline){
    Devices.findOne({deviceID:deviceID}).exec(function(err,device){
        device['online'] = isOnline;
        device['lastOnline'] = new Date();
        device.save((err)=>{console.log(err);});
    });
}

//Accepts the connection if the username and password are valid
var authenticate = function(client, username, password, callback) {
    console.log('authentication...')
    var authorized = false; 
    //console.log("deviceID:",username.toString().trim(),"  deviceKey:",password.toString().trim());
    Devices.findOne({deviceID:username.toString().trim(),deviceKey:password.toString().trim()},function(err,device){
        if (device !== null){
            authorized = true;
            client.deviceID = username.toString().trim();
        }
        if (authorized) console.log(client.id,'is authorized');
        else console.log(client.id,'is not authorized');
        callback(null, authorized);
    });
};
// In this case the client authorized as alice can publish to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
var authorizePublish = function(client, topic, payload, callback) {
    var topic = topic.split('/');
    //console.log("deviceID : ",client.deviceID);
    //console.log(topic);
    //console.log('authorize published :',client.deviceID == topic[0] && 'publish' == topic[1]);
    callback(null, client.deviceID === topic[0] && 'publish' === topic[1]);
};
  
// In this case the client authorized as alice can subscribe to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
var authorizeSubscribe = function(client, topic, callback) {
    var topic = topic.split('/');
    callback(null, client.deviceID == topic[0] && 'subscribe' == topic[1]);
};

server.on('clientConnected', function(client) {
    console.log('client connected :',client.id);	
    setDeviceOnline(client.deviceID,true);	
});

server.on('clientDisconnected', function(client) {
    console.log('clientDisconnected : ', client.id);
    setDeviceOnline(client.deviceID,false);
});

// fired when the mqtt server is ready
function setup() {
    server.authenticate = authenticate;
    server.authorizePublish = authorizePublish;
    // server.authorizeSubscribe = authorizeSubscribe;
    console.log('Server is up and running on Port:1883')
};

// fired when a message is received
server.on('published', function(packet, client) {  
    var topic = packet.topic.split('/');
    if (topic[1] == 'publish'){
        var data = JSON.parse(packet.payload.toString());
        updateDeviceData(topic[0],data["value"],data["lat"],data["lon"]);
    }
});

server.on('subscribed', function(topic, client) {
    console.log('subscribed : ', topic);
});

server.on('unsubscribed', function(topic, client) {
    console.log('unsubscribed : ', topic);
});

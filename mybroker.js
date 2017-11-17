var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Reacts = require('./models/Reacts');
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

var updateDevice = function(deviceID,name,value,lat,lon){
    if (isNaN(deviceID)) return;
    Devices.findOne({deviceID:Number(deviceID)}).exec(function(err,device){
        if (device != null){
            console.log('found');
            device.value = value;
            device.lat = lat+0;
            device.lon = lon+0;
            device.save()
        }
        else {
            console.log('not found');
            var device = new Devices({
                name: name,
                deviceID: Number(deviceID),
                online: true,
                lastOnline: null,
                environment: null,
                time: null,
                value: value,
                lat: lat,
                lon: lon
            });
            device.save(function(err,device){
                if(err){
                    console.log(err);
                }
                else {
                    console('new device is saved');
                }
            });
        }
    });
};

server.on('ready', setup);

server.on('clientConnected', function(client) {
	console.log('client connected', client.id);		
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.payload.toString());
  var msg = packet.payload.toString().split(',');
  console.log(msg);
  updateDevice(msg[0],msg[1],msg[2],msg[3],msg[4]);
});

// fired when a client subscribes to a topic
server.on('subscribed', function(topic, client) {
    console.log('subscribed : ', topic);
});

// fired when a client subscribes to a topic
server.on('unsubscribed', function(topic, client) {
    console.log('unsubscribed : ', topic);
});

// Accepts the connection if the username and password are valid
var authenticate = function(client, username, password, callback) {
    var authorized = ((username === 'kamekame' && password.toString() === 'secret'))||(username === 'a bc' && password.toString() === 'secret'));
    if (!authorized) return callback(null, authorized);
    client.user = username;
    callback(null, authorized);
};
  
// In this case the client authorized as alice can publish to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
var authorizePublish = function(client, topic, payload, callback) {
    callback(null, client.user == topic.split('/')[1]);
};

// In this case the client authorized as alice can subscribe to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
var authorizeSubscribe = function(client, topic, callback) {
    callback(null, client.user == topic.split('/')[1]);
};

// fired when the mqtt server is ready
function setup() {
    server.authenticate = authenticate;
    server.authorizePublish = authorizePublish;
    server.authorizeSubscribe = authorizeSubscribe;
    console.log('Server is up and running on Port:1883')
};

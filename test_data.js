var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Projects = require('./models/Projects');
var Devices = require('./models/Devices');

mongoose.connect('mongodb://localhost/IntelligentThings');

var device1 = new Devices({
    name: 'Thermometer',
    deviceID: '1000',
    deviceKey: 'secret',
    online: false,
    lastOnine: new Date(),
    authorized: false,
    data: [],
    position: [],
    externalData: [] 
});

var device2 = new Devices({
    name: 'Accelerometer',
    deviceID: '2000',
    deviceKey: 'secret',
    online: false,
    lastOnine: new Date(),
    authorized: false,
    data: [],
    position: [],
    externalData: [] 
});

var device3 = new Devices({
    name: 'Gyroscope',
    deviceID: '3000',
    deviceKey: 'secret',
    online: false,
    lastOnine: new Date(),
    authorized: false,
    data: [],
    position: [],
    externalData: [] 
});

// device1.save();
// device2.save();
// device3.save();
var username = '1000';
var password = 'secret';
var test = true;
if (test){
    var check = false;
    Devices.find({deviceID:username,deviceKey:password},function(err,device){
        if (device !== null){
            check = true;
            console.log(device);
        }
        console.log(check);
    });
}
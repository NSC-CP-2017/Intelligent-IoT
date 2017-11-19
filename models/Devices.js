var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaDevices = new Schema({
    name: String,
    deviceID: String,
    deviceKey: String,
    online: Boolean,
    lastOnine: Date,
    authorized: Boolean,
    data: Array,
    position: Array,
    externalData: Array 
});
module.exports = mongoose.model('devices',schemaDevices);

/*
note
data contains array of object
for example [{'value' : ___ , 'date' : ___} ,{'value' : ___ , 'date' : ___}]
postion contains array of object
for eaxmple [{'date':__,'lat':__,'lon':__}]
*/

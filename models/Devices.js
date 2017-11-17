var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaDevices = new Schema({
    name: String,
    deviceID: Number,
    online: Boolean,
    lastOnline: Date,
    environment: String,
    projectID: Schema.ObjectId,
    time: Date,
    value: String,
    lat: Number,
    lon: Number
});

module.exports = mongoose.model('devices',schemaDevices);

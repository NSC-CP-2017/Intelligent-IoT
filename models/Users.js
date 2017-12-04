var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaUsers = new Schema({
    username : String,
    userpassword : String,
    email : String,
    phone : String,
    projects : {},
    devices : {},
    registrationDate : Date,
    fullname : String,
    age : Number,
    devicecount : Number
});

module.exports = mongoose.model('users',schemaUsers);

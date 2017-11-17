var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaReacts = new Schema({
    sms: Boolean,
    phone: String,
    threshold: Number,
    status: Boolean,
    email: String,
    subject: String,
    message: String
});

module.exports = mongoose.model('reacts',schemaReacts)
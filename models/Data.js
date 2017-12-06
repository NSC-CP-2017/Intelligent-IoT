var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaData = new Schema({
    type : String,
    ownerDevice : Schema.ObjectId,
    position: Array,
    value : Array,
    lastUpdate : Date
});
module.exports = mongoose.model('data',schemaData);

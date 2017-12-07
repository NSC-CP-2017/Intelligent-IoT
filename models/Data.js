var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaData = new Schema({
    type : String,
    ownerDevice : Schema.ObjectId,
    value : Array,
    timeStamp : Number,
});
module.exports = mongoose.model('data',schemaData);

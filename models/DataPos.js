var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaData = new Schema({
    type : String,
    ownerDevice : Schema.ObjectId,
    lat : Number,
    lon : Number,
    timeStamp : Number,
});
module.exports = mongoose.model('datapos',schemaData);

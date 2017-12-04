var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaData = new Schema({
    //please add fields here
});
module.exports = mongoose.model('data',schemaData);

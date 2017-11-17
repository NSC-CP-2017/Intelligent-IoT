var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaProjects = new Schema({
    UserID: Schema.ObjectId,
    name: String,
    projectID : Number,
    desc: String,
    appID: Number,
    appKey: String,
    appSecret: String,
    slots: Array
});

module.exports = mongoose.model('projects',schemaProjects);
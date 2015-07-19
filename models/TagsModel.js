/**
 * Created by roide on 7/19/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var tagsSchema = new Schema({
    tags: { type: String, required: true, unique:true }
});

// the schema is useless so far
// we need to create a model using it
var TagsModel = mongoose.model('Tag', tagsSchema);

// make this available to our users in our Node applications
module.exports = TagsModel;
/**  */
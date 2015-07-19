/**  */
var mongoose = require('mongoose');
var TagsModel = require('./TagsModel.js');
var Schema = mongoose.Schema;
// create a schema
var questionSchema = new Schema({
    question: { type: String, required: true, unique: true },
    tags: Array,
    difficulty: { type: Number, required: true },
    answered: { type: Boolean, required: false },
    canRepeat: { type: Boolean},
    noOfTimesAttempted: {type: Number}
});

// the schema is useless so far
// we need to create a model using it
var QuestionModel = mongoose.model('Question', questionSchema);

// make this available to our users in our Node applications
module.exports = QuestionModel;
/**  */

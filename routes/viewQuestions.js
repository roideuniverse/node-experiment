/**
 * Created by roide on 5/3/15.
 */

var express = require('express');
var QuestionModel = require('../models/QuestionModel');
var router = express.Router();

router.get('/', function(req, res, next) {
        res.render('viewQuestions', {});
});

router.get('/fetchAll', function(req, res, next) {

    QuestionModel.find(function(error, questionList) {
        if(error) {
            console.log("error=" + error);
            return
        }
        console.log("gotSomeValue-preparing to write");
        res.end(JSON.stringify(questionList))
    });
});

module.exports = router;
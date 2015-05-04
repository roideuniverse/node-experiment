/**
 * Created by roide on 5/3/15.
 */

var express = require('express');
var QuestionModel = require('../models/QuestionModel');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('viewQuestions', {});
});

module.exports = router;
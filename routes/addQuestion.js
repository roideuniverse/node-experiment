/**
 * Created by roide on 5/2/15.
 */

var express = require('express');
var QuestionModel = require('../models/QuestionModel');
var TagsModel = require("../models/TagsModel");
var router = express.Router();


/* SHOW UI for entering questions. */

router.get('/', function(req, res, next) {
    res.render('addQuestion', {});
});

router.post('/add', function(request, res, next) {
    console.log("add-request::");
    console.log("question=" + request.body.question );
    console.log("tags=" + request.body.tags);
    console.log("difficulty=" + request.body.difficulty);

    var resp = res;
    var tagArr = JSON.parse(request.body.tags);
    var count = -1;
    var tagModelArr = [];
    for(var i=0; i<tagArr.length; i++) {
        console.log(i + 'tag=' + tagArr[i]);
        var prom = TagsModel.findOne({tags: tagArr[i]}).exec();
        prom.then(function(tModel) {
            count++;
            if(!tModel) {
                tModel = new TagsModel({
                    tags: tagArr[count].trim()
                });
                //could be a problem now waiting for callback - but will work for now.
                tModel.save();
            }
            tagModelArr[count] = tModel;
            console.log("count=" + count + "::len=" + tagArr.length + "::res=" + res);
            if(count == tagArr.length - 1) {
                console.log("call - save");
                saveQuestion(request.body.question, tagModelArr, request.body.difficulty, resp);
            }
        });
    }
});

function saveQuestion(question, arr, difficulty, resp){
    console.log("saveQuestion::response=" + resp);

    var questionModel = new QuestionModel({
        question: question,
        tags: arr,
        difficulty: difficulty
    });

    questionModel.save(function(err) {
        if (err) {
            console.log("error when saving Question=" + err);
            resp.statusCode = 400;
            resp.send('{"result": "error-' + JSON.stringify(err, ['message']) + '"}');
            return;
        }
        console.log('Question saved successfully!');
        resp.send('{"result": "ok"}');
     });
}

module.exports = router;
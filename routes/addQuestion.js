/**
 * Created by roide on 5/2/15.
 */

var express = require('express');
var router = express.Router();


/* SHOW UI for entering questions. */

router.get('/', function(req, res, next) {
    res.render('addQuestion', {});
});

router.post('/add', function(request, res, next) {
    console.log("add-request::")
    console.log("question=" + request.body.question );
    console.log("tags=" + request.body.tags);
    console.log("difficulty=" + request.body.difficulty);
    res.send('{"result": "ok"}');
});

module.exports = router;
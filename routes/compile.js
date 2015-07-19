/**
 * Created by roide on 5/10/15.
 */

var express = require('express');
var fs = require('fs');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log(req.body);

    var filePath = '/tmp/Solution.java';
    var filePathClass = '/tmp/Solution.class';

    if(fs.existsSync(filePathClass)) {
        fs.unlinkSync(filePathClass);
    }

    if(fs.existsSync(filePath)) {
        fs.unlink(filePath, function(err) {
            if(err) {
                console.log("failed to delete file");
                return;
            }
            //file delete proceed
            saveAndExecute(res, req, filePath);
        });
        return;
    }

    saveAndExecute(res, req, filePath, filePathClass);
});

function saveAndExecute(res, req, filePath, filePathClass) {
    fs.writeFile(filePath, req.body.code, function(err) {
        if(err) {
            console.log(err);
            return;
        }
        console.log("files was saved");

        compile(filePath, filePathClass, function() {
            console.log("success");
            execute(filePath, '/tmp/Solution', function(success) {
                console.log(success);
            }, function(failure) {
                console.log(failure);
                res.end('{"result": "error-execute" }');
                endConnection(res, failure);
            })
        }, function(data) {
            console.log("faulure::data=" + data);
            endConnection(res, data);
        });
    });
}

function compile(filePath, filePathClass, successCallBack, failureCallBack) {
    var terminal = require('child_process').spawn('bash');
    terminal.stdin.setEncoding('utf8');
    terminal.stdout.setEncoding('utf8');
    terminal.stderr.setEncoding('utf8');

    var errorMessage = '';
    terminal.stderr.on('data', function (data) {
        console.log("error");
        console.log(data);
        errorMessage += data;
    });

    terminal.on('exit', function (code) {
        console.log('child process exited with code ' + code);
        if(code != 0) {
            failureCallBack(errorMessage);
            return;
        }
        successCallBack();
    });

    setTimeout(function() {
        console.log('Sending stdin to terminal');
        terminal.stdin.write('javac ' + filePath + ' \n');
        terminal.stdin.end();
    }, 1000);
}

function execute(filePath, filePathClass, successCallBack, failureCallBack) {
    var terminal = require('child_process').spawn('bash');
    terminal.stdin.setEncoding('utf8');
    terminal.stdout.setEncoding('utf8');
    terminal.stderr.setEncoding('utf8');

    var errorMessage = '';
    terminal.stderr.on('data', function (data) {
        console.log("error");
        console.log(data);
        errorMessage += data;
    });

    var outputMessage = '';
    terminal.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
        outputMessage += data;
    });

    terminal.on('exit', function (code) {
        console.log('child process exited with code ' + code);
        if(code != 0) {
            failureCallBack(errorMessage);
            return;
        }
        successCallBack(outputMessage);
    });

    setTimeout(function() {
        console.log('Sending stdin to terminal');
        terminal.stdin.write('java -cp /tmp Solution \n');
        terminal.stdin.end();
    }, 1000);
}

function endConnection(res, data) {
    var jsObj = { result: data};
    console.log(jsObj);
    res.end(JSON.stringify(jsObj));
}

module.exports = router;
/**
 * Created by aa on 2016/5/26.
 */

var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var User = require('../models/test.js');
var http = require('http');
var querystring = require('querystring');


function testGetData(test,callback){
    http.get({host: 'www.byvoid.com'}, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            callback(data);
        });
    });
}

function testPost(callback){
    var contents = querystring.stringify({
        name: 'byvoid',
        email: 'byvoid@byvoid.com',
        address: 'Zijing 2#, Tsinghua University',
    });
    var options = {
        host: 'localhost',
        port:3000,
        path: '/testPostServer',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length' : contents.length
        }
    };
    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            callback(data);
        });
    });
    req.write(contents);
    req.end();
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Expresss',items:['express', 'Node.js'] ,layout:'layoutfortest'});
});

/* GET home page. */
router.get('/testHref', function(req, res, next) {
    res.render('testHref', { title: 'Expresss',items:['express', 'Node.js'] ,layout:'layoutfortest'});
});

router.get('/test', function(req, res, next) {
    res.render('test/testlogin', { title: '测试' ,layout:'layoutfortest'});
});

router.get('/testdata', function(req, res, next) {
    //get
    /*testGetData(1,function(result){
        res.json(result);
    });*/
    //post
    testPost(function(result){
        res.json(result);
    });
});

router.post('/testPostServer',function(req,res,next){
    res.send('sfdsdf');
});

router.post('/test',function(req,res,next){
    var user=new User({name:req.body.username,password:req.body.password});
    user.getUser(req.body.username,function(user){
        if(!user){
            req.flash('error', '用户不存在');
            return res.redirect('/test');
        }
        else{
            var md5 = crypto.createHash('md5');
            var password = md5.update(req.body.password).digest('base64');
            if(password==user.password){
                req.flash('success', '登录成功');
                return res.redirect('/');
            }
            else {
                req.flash('error', '密码错误');
                return res.redirect('/test');
            }
        }
    })
});

router.get('/api/comments', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

module.exports = router;
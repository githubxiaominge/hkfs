/**
 * Created by aa on 2016/5/26.
 */

var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var User = require('../models/test.js')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Expresss',items:['express', 'Node.js'] ,layout:'layoutfortest'});
});

router.get('/test', function(req, res, next) {
    res.render('test/testlogin', { title: '测试' ,layout:'layoutfortest'});
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
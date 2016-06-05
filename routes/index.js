var express = require('express');
var crypto = require('crypto');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',items:['nodejs','express'] ,layout:'layoutfortest'});
});

module.exports = router;

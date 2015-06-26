var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Guessing that the user is saved in the session
  res.render('index', { title: 'Express', user: req.user });
});

module.exports = router;

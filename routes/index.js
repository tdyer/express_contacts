var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Yes, the user is automatically saved in the session by the SessionStrategy
  res.render('index', { title: 'Express', user: req.user });
});

module.exports = router;

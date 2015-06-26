var util = require('util');
var passport = require('passport');
var Account = require('../models/account');
var express = require('express');
var router = express.Router();

router.route('/register')
  .get(function(req, res, next) {
    res.render('register', {});
  })
  .post(function(req, res, next) {
    var newAccount = new Account({username: req.body.username});
    console.log('POST /register', util.inspect(newAccount));

    Account.register(newAccount, req.body.password, function(err, account) {
      if(err) {
        return res.render('register', {account: account});
      }

      req.login(account, function(err) {
        res.redirect('/contacts');
      });
    })
  })

router.get('/login', function(req, res, next) {
  res.render('login', {user: req.user});
});

// Login user, just for debugging
router.post('/login', function(req, res, next){
  debugger;
  console.log('POST /login', util.inspect(req.body));
  next();
});

// Login user, passport authenticate
router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

// router.post('/login', passport.authenticate('local', {
//   successfully: '/',
//   failureRedirect: '/login',
//   failureFlash: true
// }));

router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;

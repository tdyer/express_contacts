var express = require('express');
var router = express.Router();
var _ = require('underscore');
var util = require('util');
var moment = require('moment');

var Contact = require('../models/contact');

// GET /contacts
// Read ALL contacts
router.get('/', function(req, res) {
  Contact.find(function(err, contacts, count){
    res.render('list', {contacts: contacts});
  });
});

// POST /contacts
// Create a contact
router.post('/', function(req, res) {
  var new_contact = new Contact({
    name: req.body.fullname,
    job: req.body.job,
    nickname: req.body.nickname,
    email: req.body.email
  }).save(function(err, contact, count){
    if(err){
      res.status(400).send("Error saving new contact: " + err);
    }else{
      // res.send("New Contact Created");
      res.redirect('/contacts');
    }
  });

});

// GET /add
// Retrieve the HTML form to create a contact
// Rails: this is the new action
router.get('/add', function(req, res) {
  res.render('add', {contact: {}});
});

// (GET, POST, PUT, DELETE) /contacts/:contact_id
// Rails: Acts like a before_action
router.route('/:contact_id')
  .all(function(req, res, next) {
    contact_id = req.params.contact_id;
    contact = {};
    contact = Contact.findById(contact_id, function(err, c){
      contact = c;
      next();
    });
  })
// GET /contacts/:contact_id
  .get(function(req, res) {
    res.render('edit', {contact: contact, moment: moment});
  })
// POST /contacts/:contact_id
  .post(function(req, res) {
    // Update notes
    contact.notes.push({
      created: Date(),
      note: req.body.notes
    });

    contact.save(function(err, contact){
      if(err){
        res.status(400).send("Error saving contact notes: " + err);
      }else{
        res.redirect('/contacts/' + contact.id);
      }
    });
  })
// PUT /contacts/:contact_id
  .put(function(req, res) {
    //Update a contact
    contact.name = req.body.fullname;
    contact.job = req.body.job;
    contact.nickname = req.body.nickname;
    contact.email = req.body.email;

    contact.save(function(err, contact, count){
      if(err){
        res.status(400).send("Error saving contact: " + err);
      }else{
        res.redirect('/contacts');
      }
    });

  })
// DELETE /contacts/:contact_id
  .delete(function(req, res) {
    res.send('Delete for contact '+contact_id);
  });

module.exports = router;

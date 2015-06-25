var express = require('express');
var router = express.Router();
var _ = require('underscore');
var util = require('util');
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
    contact = lookupContact(contact_id);

    next();
  })
// GET /contacts/:contact_id
  .get(function(req, res) {
    res.render('edit', {contact: contact});
  })
// POST /contacts/:contact_id
  .post(function(req, res) {
    if(!contact.notes) {
      contact.notes = [];
    }

    contact.notes.push({
      created: Date(),
      note: req.body.notes
    });

    res.send('Created new note for contact id '+contact_id);
    // res.redirect('/contact/'+contact_id);
  })
// PUT /contacts/:contact_id
  .put(function(req, res) {
    contact.name = req.body.fullname;
    contact.job = req.body.job;
    contact.nickname = req.body.nickname;
    contact.email = req.body.email;

    res.send('Update succeeded for contact id: '+contact_id);
    // res.render('/contacts/');
  })
// DELETE /contacts/:contact_id
  .delete(function(req, res) {
    res.send('Delete for contact '+contact_id);
  });

module.exports = router;

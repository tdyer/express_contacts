var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('It worked, contacts that is!');
});

router.post('/', function(req, res, next){
  res.send('Contacts got a POST');
});

router.route('/:contact_id')
  .all(function(req, res, next){
    contact_id = req.params.contact_id;
    next();
  })
  .get(function(req, res){
    res.send('Hello for contact ' + contact_id);
  })
  .post(function(req, res, next){
    res.send('Post for contact ' + contact_id);
  })
  .put(function(req, res, next){
    res.send("Put for contact " + contact_id);
  })
  .delete(function(req, res){
    res.send('Delete for contact ' + contact_id);
  });

module.exports = router;
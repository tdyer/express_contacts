var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
  // examples, app won't use either of these
  // username and password are defined in the helper code.
  nickname: String,
  birthdate: Date
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);

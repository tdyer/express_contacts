var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    // See https://github.com/saintedlama/passport-local-mongoose
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
  // examples, app won't use either of these
  // username and password are defined in the helper code.
  nickname: String,
  birthdate: Date
});

// Add a plugin to the model
// See http://mongoosejs.com/docs/plugins.html

// See https://github.com/saintedlama/passport-local-mongoose
// passportLocalMongoose will add a username, hash and salt field
// to store the username, the hashed password and the salt value
Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);

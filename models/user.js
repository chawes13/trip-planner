var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
   username: { type: String,lowercase: true, trim: true },
   password: String,
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
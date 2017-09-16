var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name:  String,
  password: String,
  email:   {type: String, required: true, index: { unique: true }},
  phone: String,
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  role: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
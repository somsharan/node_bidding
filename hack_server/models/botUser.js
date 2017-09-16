var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var botuserSchema = new Schema({
  auctionId:  String,
  userId: String,
  hits:  String,
  userAgent: String,
  botDesc: String,
  botIp: String,  
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('botuser', botuserSchema);
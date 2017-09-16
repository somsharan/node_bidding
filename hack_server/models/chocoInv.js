var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chocoSchema = new Schema({
    cName:  String,
    cDesc:   String,
    sellerId: String,
    date: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
  });
  
  module.exports = mongoose.model('choco', chocoSchema);
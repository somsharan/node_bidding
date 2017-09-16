var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var auctionSchema = new Schema({
    chocoId:  String,
    startingPrice: String,
    highBid:   String,
    startTime: String,
    endTime: Number,
    sellerId: String,
    chocoName : String,
    chocoId: String,
    winnerId: {
      id: String,
      userName: String
    },
    date: { type: Date, default: Date.now },
    active:  { type: Boolean, default: true }
  });
  
  module.exports = mongoose.model('auction', auctionSchema);
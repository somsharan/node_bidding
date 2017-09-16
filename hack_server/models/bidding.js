var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var biddingSchema = new Schema({
  chocoId:  String,
  chocoName: String,
  userId: String,
  biddingRate:  String,
  auctionId: String,
  bidTime: { type: Date, default: Date.now },
  userAgent: String,
  userPlatForm: String,
  bidPrDiff: String,
  oTimeGap: String,  
  date: { type: Date, default: Date.now },
  active: Boolean
});

module.exports = mongoose.model('bid', biddingSchema);
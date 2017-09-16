var Auction = require('../models/auction');
var Bid = require('../models/bidding');
var User = require('../models/users');
var jwtToken = require('jsonwebtoken');

var addAuction = function (req, callback) {
    var thirtyMinutesLater = new Date();
        thirtyMinutesLater.setMinutes(thirtyMinutesLater.getMinutes() + 30);
    var document = {
        chocoId: req.body.chocoId,
        startingPrice: req.body.startPrice,
        highBid: req.body.startPrice,
        sellerId: req.body.sellerId,
        chocoName: req.body.chocoName,
        chocoDesc: req.body.chocoDesc,
        startTime: new Date().getTime(),
        endTime:  new Date(thirtyMinutesLater).getTime()       
    };
    Auction.findOne({ chocoId: req.body.chocoId , startingPrice:  req.body.startPrice, active: true}, function (err, chocoData) {
        if (!chocoData) {
            new Auction(document).save(function (err, data) {
                if (err) callback({ success: false, msg: err });
                if (data) {
                    callback({ success: true, msg: 'auction Succesfully added' });
                }
            });
        } else {
            callback({ success: false, msg: 'Aleardy Exists' });
        }
    });
}

var deleteAuction = function (req, callback) {
    User.findOne({_id: req.body.auctionId, active: true }, function(error, successData) {
        if (successData) {
            User.update({_id: successData._id}, {active: false},  function (err,data) {
                if(!err) {
                    callback({ success: true, msg: 'removed successfully' })
                } else {
                     callback({ success: false, msg: err })   
                }                
            });
        } else {
            callback({ success: false, msg: error })
        }
    });
}


var getAuctionList = function (req, callback) {
    Auction.find({active: true }, function(error, successData) {
        console.log(error, successData,'successDatasuccessData')
        if (successData) {
            callback({ success: true, msg: 'successfully', auctionList: successData })
        } else {
            callback({ success: false, msg: error })
        }
    });
}

var getUserAuctionList = function (req, callback) {
    Auction.find({sellerId: req.body.sellerId}, function(error, successData) {
        console.log(error, successData,'successDatasuccessData')
        if (successData) {
            callback({ success: true, msg: 'successfully', myList: successData })
        } else {
            callback({ success: false, msg: error })
        }
    });
}


var getActiveAuctionList = function (req, callback) {
    Auction.find({sellerId: req.body.sellerId, active:true}, function(error, successData) {
        console.log(error, successData,'successDatasuccessData')
        if (successData) {
            callback({ success: true, msg: 'successfully', myList: successData })
        } else {
            callback({ success: false, msg: error })
        }
    });
}


var updateWiner = function (req, callback) {
    Auction.find({_id: req.body._id,'winnerId.id': {$exists: true}, active: false }, function(error, successData) {
        console.log(error, successData,'successDatasuccessData')
        if (successData && successData.length <= 0) {
            Bid.aggregate( [
                { $match: { auctionId: req.body._id} },
                { $group: { "_id": "$userId",  
                    "bidPrice": {$max:'$biddingRate'} }}], function(err, bidData){
                        if(bidData.length <= 0) {
                            Auction.update({_id: req.body._id},{active:false}, function(error, successUData) {
                                if(successUData) {
                                        callback({ success: true, msg: 'Winner Updated' })
                                } else {
                                        callback({ success: false, msg: 'Winner Already There' })
                                }
                            })
                        } else {
                             var maxValue = Math.max.apply(Math,bidData.map(function(o){return o.bidPrice;}))
                        var higestValue = '', allValues = [];
                        bidData.forEach(function(elementData, i) {
                            if(maxValue != '-Infinity' && elementData.bidPrice  == maxValue){
                                higestValue = elementData;
                                allValues.push(elementData)
                            } else {
                                allValues.push(elementData)
                            }
                            if(allValues.length == bidData.length) {
                                if(higestValue != '') {
                                    User.findOne({'_id': higestValue._id}, function(err, UserData){console.log(UserData,'UserDataUserData')
                                        Auction.update({_id: req.body._id},{'winnerId.id': UserData._id,'winnerId.userName': UserData.name,active:false}, function(error, successUData) {
                                            if(successUData) {
                                                    callback({ success: true, msg: 'Winner Updated' })
                                            } else {
                                                    callback({ success: false, msg: 'Winner Already There' })
                                            }
                                        })
                                    })    
                                } else {
                                     Auction.update({_id: req.body._id},{active:false}, function(error, successUData) {
                                            if(successUData) {
                                                    callback({ success: true, msg: 'Winner Updated' })
                                            } else {
                                                    callback({ success: false, msg: 'Winner Already There' })
                                            }
                                        })
                                }
                                        
                            }
                        });
                        } 
                    })  
            // Auction.update({_id: req.body._id}, {'winnerId.id':req.body.userId,'winnerId.userName': req.body.userName,active: false}, function(err, winnerData){
            //     if(winnerData) {
            //         callback({ success: true, msg: 'winner added successfully' })
            //     } else {
            //         callback({ success: true, msg: 'winner not added successfully' })
            //     }
            // })
            
        } else {
            callback({ success: false, msg: 'Winner Already There' })
        }
    });
}


var auction = {
    getAuction: getAuctionList,
    deleteAuction: deleteAuction,
    addAuction: addAuction,
    getUserAuctionList: getUserAuctionList,
    updateWiner: updateWiner,
    getActiveAuctionList: getActiveAuctionList
}
module.exports = auction;
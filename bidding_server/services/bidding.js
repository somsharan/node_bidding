var Bid = require('../models/bidding');
var Auction = require('../models/auction');
var BotUser = require('../models/botUser');
var async = require('async');
var botDetect = require('bot-detector');

var addBid = function (req, callback) {
    console.log(IO,'ioioioi')
    var document = {
        userId: req.body.userId,
        biddingRate: parseInt(req.body.bidPrice),
        chocoId: req.body.chocoId,
        auctionId: req.body.auctionId,
        userAgent: req.body.userAgent,
        userPlatfrom: req.body.userPlatfrom,
        chocoName: req.body.chocoName
    };
    BotUser.count({auctionId:req.body.auctionId, userId: req.body.userId}, function(err, countData){
        if(countData || countData > 0) {
            callback({ success: false, msg: 'You Are a Bot' });
        } else {
             if(!botDetect.isBot(req.body.userAgent)){
                Bid.findOne({ userId: req.body.userId, auctionId: req.body.auctionId, biddingRate: req.body.bidPrice}, function (err, userData) {
                    if (!userData) {
                        Auction.findOne({_id:req.body.auctionId}, function(err, acData){
                            console.log(acData.highBid,'acData.highBid')
                            if(parseInt(acData.highBid) < parseInt(req.body.bidPrice)) { 
                                Bid.findOne({userId: req.body.userId, auctionId: req.body.auctionId}).sort({date: -1}).exec(function(err1, post) { 
                                    if(post && post.biddingRate){  
                                        var startDateTime = new Date()
                                        document.bidPrDiff = parseInt(req.body.bidPrice) - parseInt(post.biddingRate);                     
                                        document.oTimeGap =  startDateTime.getHours() - new Date(post.date).getHours();                            
                                        document.bidTime =  startDateTime;
                                    }  else {
                                        var startDateTime = new Date()
                                        document.bidPrDiff = parseInt(req.body.bidPrice) - acData.highBid;                     
                                        document.oTimeGap =  startDateTime.getHours();
                                        document.bidTime =  startDateTime;
                                    }   
                                        document.curBidDiff =  parseInt(req.body.bidPrice) - acData.highBid;
                                        console.log(document,'documentdocument')     
                                                        
                                        new Bid(document).save(function (err2, data) {
                                            if (err2) callback({ success: false, msg: err2 });
                                            if (data) {
                                                Bid.aggregate( [{$match:{chocoId: req.body.chocoId, auctionId: req.body.auctionId}}, { $group: { _id: "$auctionId", maxTotalAmount: { $max:  '$biddingRate' }}}], function(err, data){
                                                    console.log(data,'datadatadata')
                                                    if(data && data[0].maxTotalAmount) {
                                                        // IO.on('connection', function (socket) {
                                                        //     console.log('socket connected')
                                                        //     socket.emit('auctionData', { auctionId: req.body.auctionId,highBid: req.body.bidPrice});
                                                            
                                                        // });     
                                                        IO.emit('auctionData', { auctionId: req.body.auctionId,highBid: req.body.bidPrice});                                                    
                                                        Auction.update({_id:req.body.auctionId}, {highBid: data[0].maxTotalAmount}, function(err, data){
                                                            callback({ success: true, msg: 'Bid Succesfully registered' });
                                                        })
                                                    } else {
                                                        //  socketIO.on('connection', function (socket) {
                                                        //     socket.emit('auctionData', { auctionId: req.body.auctionId,highBid: req.body.bidPrice});
                                                            
                                                        // });  
                                                        //SOCKET.emit('auctionData', { auctionId: req.body.auctionId,highBid: req.body.bidPrice});
                                                        Auction.update({_id:req.body.auctionId}, {highBid: req.body.bidPrice}, function(err, data){
                                                            callback({ success: true, msg: 'Bid Succesfully registered' });
                                                        })
                                                    }
                                                    
                                                })
                                            }
                                        });
                                
                                });
                            } else {
                                callback({ success: false, msg: 'Bid for Higher Value then current bid' });
                            }
                        });            
                    } else {
                        callback({ success: false, msg: 'Bid Aleardy Exists' });
                    }
                });
            } else {
                var botData = {
                    userId: req.body.userId,
                    auctionId: req.body.auctionId,
                    userAgent: req.body.userAgent,
                    botDesc: botDetect.isBot(req.body.userAgent)
                }
                new BotUser(botData).save(function (err2, data) {
                    callback({ success: false, msg: 'You Are a Bot' });
                })
            }
        }
    })
   
}


var getBid = function (req, callback) { //get laest
    Bid.aggregate( [
         { $match: { userId: req.body.userId} },
         { $group: { "_id": "$auctionId",  
                    "bidPrice": {$max:'$biddingRate'}}}], function(err, data){
        console.log(data,'datadatadata')
        if(data && data.length > 0) {
            var itemList = [], activeItemList = [];
            data.forEach(function(bidValue, key){
                console.log(bidValue, key,'bidValue, keybidValue, key')
                Auction.findOne({_id:bidValue._id,active:true}, function(err, acData){
                    var parsedData = '';
                    if(acData) {
                        parsedData = JSON.parse(JSON.stringify(acData));;
                        console.log(parsedData,'bbbiiididid before', bidValue.bidPrice)
                        parsedData.myBid = bidValue.bidPrice
                        activeItemList.push(parsedData)
                        itemList.push(parsedData)
                    } else {
                        itemList.push(bidValue)
                    }
                    if(itemList.length == data.length) {
                        callback({ success: true, msg: 'List' , myList: activeItemList});
                    }
                })
            })
                
        } else {
                callback({ success: false, msg: 'failed' });
        }
        
    })
}

var getBidCount = function (req, callback) { //get laest
    Bid.aggregate( [
         { $group: { "_id": "$auctionId",  
                    "count": { "$sum": 1 }}}], function(err, data){
        console.log(data,'datadatadata')
        if(data && data.length > 0) {
            var itemList = [];
            data.forEach(function(bidValue, key){
                console.log(bidValue, key,'bidValue, keybidValue, key')
                Auction.findOne({_id:bidValue._id, sellerId: req.body.sellerId}, function(err, acData){
                    var parsedData = ''
                    if(acData) {
                        parsedData = JSON.parse(JSON.stringify(acData));;
                        console.log(parsedData,'bbbiiididid before', bidValue.count)
                        parsedData.myBidCount = bidValue.count                        
                        itemList.push(parsedData)
                    } else {
                        itemList.push(bidValue)
                    }
                    if(itemList.length == data.length) {
                        console.log(itemList,'itemList')
                        callback({ success: true, msg: 'List' , myList: itemList});
                    }
                })
            })
                
        } else {
                callback({ success: false, msg: 'failed' });
        }
        
    })
}


var authUser = {
    addBid: addBid,
    getBid: getBid,
    getBidCount: getBidCount
}
module.exports = authUser;
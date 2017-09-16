var item = require('../models/chocoInv');
var Auction = require('../models/auction')

var addItem = function (req, callback) {
    var document = {
        cName: req.body.cName,
        cDesc: req.body.cDesc,
        sellerId: req.body.sellerId
    };
    new item(document).save(function (err, data) {
        if (err) callback({ success: false, msg: err });
        if (data) {
            callback({ success: true, msg: 'Bid Succesfully registered' });
        }
    });
        
}


var getLastBid = function (req, callback) {
    var chocoId;
    if(req.body.CID) {
        chocoId = req.body.CID;
    }
    Auction.find({_id:chocoId}).sort({x:1}, function (err, data) {
        console.log(err, data,'err, dataerr, data')
        callback(data)
    });
        
}

var getItem = function (req, callback) {
    item.find({ }, function(error, successData) {
        console.log(error, successData,'successDatasuccessData')
        if (successData) {
            callback({ success: true, msg: 'loggedin user successfully', itemList: successData })
        } else {
            callback({ success: false, msg: error })
        }
    });
}

var authUser = {
    addItem: addItem,
    getItem: getItem,
    getLastBid: getLastBid
}
module.exports = authUser;
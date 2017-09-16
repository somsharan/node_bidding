var auth = require('./auth')
var auction = require('./auction')
var Bid = require('./bidding')
var item = require('./item')
var register = function(req, res, callback) {
    auth.register(req, function(data) {
         if(data.success == true) {
            callback('',data);
        } else {
            callback(data, '');
        }
    })
}

var login = function(req, res, callback) {
    auth.login(req, function(data) {
        if(data.success == true) {
            callback('',data);
        } else {
            callback(data, '');
        }        
    })
}

var getAuction = function(req, res, callback) {
    auction.getAuction(req, function(data) {
        if(data.success == true) {
            callback('',data);
        } else {
            callback(data, '');
        }        
    })
}


var addAuction = function(req, res, callback) {
    auction.addAuction(req, function(data) {
        if(data.success == true) {
            callback('',data);
        } else {
            callback(data, '');
        }        
    })
}


var deleteAuction = function(req, res, callback) {
    auction.deleteAuction(req, function(data) {
        if(data.success == true) {
            callback('',data);
        } else {
            callback(data, '');
        }        
    })
}



var getUserAuctionList = function(req, res, callback) {
    auction.getUserAuctionList(req, function(data) {
        if(data.success == true) {
            callback('',data);
        } else {
            callback(data, '');
        }        
    })
}


var addBid = function(req, res, callback) {
    Bid.addBid(req, function(data) {
        if(data.success == true) {
            callback('',data);
        } else {
            callback(data, '');
        }        
    })
}


var getBid = function(req, res, callback) {
    Bid.getBid(req, function(data) {
        if(data.success == true) {
            callback('',data);
        } else {
            callback(data, '');
        }        
    })
}



var addItem = function(req, res, callback) {
    item.addItem(req, function(data) {
        if(data.success == true) {
            callback('',data);
        } else {
            callback(data, '');
        }        
    })
}


var getItem = function(req, res, callback) {
    item.getItem(req, function(data) {
        if(data.success == true) {
            callback('',data);
        } else {
            callback(data, '');
        }        
    })
}

var getLastBid = function(req, res, callback) {
    item.getLastBid(req, function(data) {
        if(data.success == true) {
            callback('',data);
        } else {
            callback(data, '');
        }        
    })
}


var getBidCount = function(req, res, callback) {
    Bid.getBidCount(req, function(data) {
        if(data.success == true) {
            callback('',data);
        } else {
            callback(data, '');
        }        
    })
}

var updateWiner = function(req, res, callback) {
    auction.updateWiner(req, function(data) {
        if(data.success == true) {
            callback('',data);
        } else {
            callback(data, '');
        }        
    })
}

var getActiveAuctionList = function(req, res, callback) {
    auction.getActiveAuctionList(req, function(data) {
        if(data.success == true) {
            callback('',data);
        } else {
            callback(data, '');
        }        
    })
}


module.exports.register = register;
module.exports.login = login;
module.exports.getAuction = getAuction;
module.exports.addAuction = addAuction;
module.exports.deleteAuction = deleteAuction; 
module.exports.addBid = addBid;
module.exports.getBid = getBid;
module.exports.addItem = addItem;
module.exports.getItem = getItem;
module.exports.getUserAuctionList = getUserAuctionList;
module.exports.getBidCount = getBidCount;
module.exports.updateWiner = updateWiner;
module.exports.getActiveAuctionList = getActiveAuctionList;
module.exports.getLastBid = getLastBid;
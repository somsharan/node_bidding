var express = require('express');
var apiServices = require('../services/api')
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'WelCome TO Choco Hack' });
});



/* post Login. */
router.post('/login', function (req, res, next) {
  apiServices.login(req, res, function(err, data){
    if(err){ res.send(err) } else { res.send(data) }
  })
});


/* post Register. */
router.post('/register', function (req, res, next) {
    apiServices.register(req, res, function(err, data){
      if(err){ res.send(err) } else { res.send(data) }
    })
});


/* post addAuction. */
router.post('/addAuction', function (req, res, next) {
    apiServices.addAuction(req, res, function(err, data){
      if(err){ res.send(err) } else { res.send(data) }
    })
});

/* post getAuction. */
router.post('/getAuction', function (req, res, next) {
    apiServices.getAuction(req, res, function(err, data){
      if(err){ res.send(err) } else { res.send(data) }
    })
});

/* post getAuction. */
router.post('/getSellerAuction', function (req, res, next) {
    apiServices.getUserAuctionList(req, res, function(err, data){
      if(err){ res.send(err) } else { res.send(data) }
    })
});

/* post deleteAuction. */
router.post('/deleteAuction', function (req, res, next) {
    apiServices.deleteAuction(req, res, function(err, data){
      if(err){ res.send(err) } else { res.send(data) }
    })
});

/* post addBid. */
router.post('/addBid', function (req, res, next) {
  console.log(req.headers.user)
    apiServices.addBid(req, res, function(err, data){
      if(err){ res.send(err) } else { res.send(data) }
    })
});
/* post getBid. */
router.post('/getBid', function (req, res, next) {
    apiServices.getBid(req, res, function(err, data){
      if(err){ res.send(err) } else { res.send(data) }
    })
});

/* post add product. */
router.post('/addItem', function (req, res, next) {
    apiServices.addItem(req, res, function(err, data){
      if(err){ res.send(err) } else { res.send(data) }
    })
});

/* post add product. */
router.post('/getItem', function (req, res, next) {
    apiServices.getItem(req, res, function(err, data){
      if(err){ res.send(err) } else { res.send(data) }
    })
});


/* post getbid Count. */
router.post('/getBidCount', function (req, res, next) {
    apiServices.getBidCount(req, res, function(err, data){
      if(err){ res.send(err) } else { res.send(data) }
    })
});


/* post getbid Count. */
router.post('/updateWiner', function (req, res, next) {
    apiServices.updateWiner(req, res, function(err, data){
      if(err){ res.send(err) } else { res.send(data) }
    })
});


/* post getActiveAuctionList. */
router.post('/getActiveAuctionList', function (req, res, next) {
    apiServices.getActiveAuctionList(req, res, function(err, data){
      if(err){ res.send(err) } else { res.send(data) }
    })
});

/* post getActiveAuctionList. */
router.post('/getLastBid', function (req, res, next) {
  apiServices.getLastBid(req, res, function(err, data){
    if(err){ res.send(err) } else { res.send(data) }
  })
});

module.exports = router;

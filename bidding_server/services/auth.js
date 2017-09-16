var User = require('../models/users');
var jwtToken = require('jsonwebtoken');

var registerUser = function (req, callback) {
    var document = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role
    };
    User.findOne({ email: req.body.email }, function (err, userData) {
        if (!userData) {
            new User(document).save(function (err, data) {
                if (err) callback({ success: false, msg: err });
                if (data) {
                    callback({ success: true, msg: 'User Succesfully registered' });
                }
            });
        } else {
            callback({ success: false, msg: 'User Aleardy Exists' });
        }
    });
}

var loginUser = function (req, callback) {
    console.log('loginUser', req.body, req.params)
    var email = req.param('email'),
    password = req.param('password');
    User.findOne({email: email, password: password }, function(error, successData) {
        console.log(error, successData,'successDatasuccessData')
        if (successData) {
            var getToken = genrateToken(req.body.email);
            callback({ success: true, msg: 'loggedin user successfully', token: getToken, userInfo: successData })
        } else {
            callback({ success: false, msg: error })
        }
    });
}

var genrateToken = function(userEmail) {
    return jwtToken.sign({email: userEmail}, 'secreateKey')
}

var authUser = {
    register: registerUser,
    login: loginUser,
}
module.exports = authUser;
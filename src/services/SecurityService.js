var userDAO = require('../model/dao/UserDAO');


var sercurityService = {
    login: function (req, res, next) {
        console.log("login --> username: " + req.body.username + ", password: " + req.body.password);
        return res.json({code:"ok"});
    }
};

module.exports.login = sercurityService.login;

'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.userDelete = function userDelete (req, res, next) {
  User.userDelete()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userLogin = function userLogin (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.userLogin(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userLogout = function userLogout (req, res, next) {
  User.userLogout()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userMe = function userMe (req, res, next) {
  User.userMe()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userRegistration = function userRegistration (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.userRegistration(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userRegistrationPicture = function userRegistrationPicture (req, res, next) {
  var email = req.swagger.params['email'].value;
  var image = req.swagger.params['image'].value;
  User.userRegistrationPicture(email,image)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUpdate = function userUpdate (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.userUpdate(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

const {decodeJWT} = require('../service/AuthService');

module.exports.userDelete = function userDelete (req, res, next) {
  //Extract session
  var session = decodeJWT(req);

  // Checking if it is the correct one
  if((!session) || session.name == 'TokenExpiredError')
    return utils.unauthorizeAction(res);

  User.userDelete(session.user.email)
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
  //Extract session
  var session = decodeJWT(req);

  // Checking if it is the correct one
  if((!session) || session.name == 'TokenExpiredError')
    return utils.unauthorizeAction(res);

  utils.writeJson(res, {response: "Successful logout"});
};

module.exports.userMe = function userMe (req, res, next) {
  //Extract session
  var session = decodeJWT(req);

  // Checking if it is the correct one
  if((!session) || session.name == 'TokenExpiredError')
    return utils.unauthorizeAction(res);

  User.userMe(session.user.email)
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
  //Extract session
  var session = decodeJWT(req);

  // Checking if it is the correct one
  if((!session) || session.name == 'TokenExpiredError')
    return utils.unauthorizeAction(res);

  var body = req.swagger.params['body'].value;

  // Checking not fake modification
  if(session.user.email != body.email)
    return utils.unauthorizeAction(res);

  User.userUpdate(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

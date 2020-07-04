'use strict';

var utils = require('../utils/writer.js');
var Comment = require('../service/CommentService');

const {decodeJWT} = require('../service/AuthService');

module.exports.commentLikePost = function commentLikePost (req, res, next) {
  //Extract session
  var session = decodeJWT(req);

  // Checking if it is the correct one
  if((!session) || session.name == 'TokenExpiredError')
    return utils.unauthorizeAction(res);

  var id = req.swagger.params['id'].value;

  Comment.commentLikePost(id,session.user.email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentLikeRemove = function commentLikeRemove (req, res, next) {
  //Extract session
  var session = decodeJWT(req);

  // Checking if it is the correct one
  if((!session) || session.name == 'TokenExpiredError')
    return utils.unauthorizeAction(res);

  var id = req.swagger.params['id'].value;

  Comment.commentLikeRemove(id,session.user.email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentsGet = function commentsGet (req, res, next) {
  //Extract session
  var session = decodeJWT(req);
  var email = '';

  // Checking if it is the correct one
  if((session) && session.name != 'TokenExpiredError')
    email = session.user.email;

  var article = req.swagger.params['article'].value;

  Comment.commentsGet(article,email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentsPost = function commentsPost (req, res, next) {
  //Extract session
  var session = decodeJWT(req);

  // Checking if it is the correct one
  if((!session) || session.name == 'TokenExpiredError')
    return utils.unauthorizeAction(res);

  // Checking not fake modification
  if(session.user.email != body.user.email)
    return utils.unauthorizeAction(res);

  var article = req.swagger.params['article'].value;
  var body = req.swagger.params['body'].value;

  Comment.commentsPost(article,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

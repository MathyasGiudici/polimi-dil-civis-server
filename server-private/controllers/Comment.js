'use strict';

var utils = require('../utils/writer.js');
var Comment = require('../service/CommentService');

module.exports.commentLikePost = function commentLikePost (req, res, next) {
  var id = req.swagger.params['id'].value;
  Comment.commentLikePost(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentLikeRemove = function commentLikeRemove (req, res, next) {
  var id = req.swagger.params['id'].value;
  Comment.commentLikeRemove(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentsGet = function commentsGet (req, res, next) {
  var article = req.swagger.params['article'].value;
  Comment.commentsGet(article)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentsPost = function commentsPost (req, res, next) {
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

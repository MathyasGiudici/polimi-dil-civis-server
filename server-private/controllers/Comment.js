'use strict';

var utils = require('../utils/writer.js');
var Comment = require('../service/CommentService');

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

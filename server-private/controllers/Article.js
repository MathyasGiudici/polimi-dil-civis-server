'use strict';

var utils = require('../utils/writer.js');
var Article = require('../service/ArticleService');

module.exports.article = function article (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Article.article(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.articleById = function articleById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Article.articleById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.articleByTopic = function articleByTopic (req, res, next) {
  var topic = req.swagger.params['topic'].value;
  Article.articleByTopic(topic)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.articleHome = function articleHome (req, res, next) {
  Article.articleHome()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.articleLikePost = function articleLikePost (req, res, next) {
  var id = req.swagger.params['id'].value;
  Article.articleLikePost(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.articleLikeRemove = function articleLikeRemove (req, res, next) {
  var id = req.swagger.params['id'].value;
  Article.articleLikeRemove(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.articleRecommended = function articleRecommended (req, res, next) {
  Article.articleRecommended()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

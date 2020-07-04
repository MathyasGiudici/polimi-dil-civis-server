'use strict';

var utils = require('../utils/writer.js');
var Article = require('../service/ArticleService');

const {decodeJWT} = require('../service/AuthService');

module.exports.article = function article (req, res, next) {
  //Extract session
  var session = decodeJWT(req);
  var email = '';

  // Checking if it is the correct one
  if((session) && session.name != 'TokenExpiredError')
    email = session.user.email;

  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;

  Article.article(offset,limit,email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.articleById = function articleById (req, res, next) {
  //Extract session
  var session = decodeJWT(req);
  var email = '';

  // Checking if it is the correct one
  if((session) && session.name != 'TokenExpiredError')
    email = session.user.email;

  var id = req.swagger.params['id'].value;

  Article.articleById(id,email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.articleByTopic = function articleByTopic (req, res, next) {
  //Extract session
  var session = decodeJWT(req);
  var email = '';

  // Checking if it is the correct one
  if((session) && session.name != 'TokenExpiredError')
    email = session.user.email;

  var topic = req.swagger.params['topic'].value;

  Article.articleByTopic(topic,email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.articleHome = function articleHome (req, res, next) {
  //Extract session
  var session = decodeJWT(req);
  var email = '';

  // Checking if it is the correct one
  if((session) && session.name != 'TokenExpiredError')
    email = session.user.email;

  Article.articleHome(email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.articleLikePost = function articleLikePost (req, res, next) {
  //Extract session
  var session = decodeJWT(req);

  // Checking if it is the correct one
  if((!session) || session.name == 'TokenExpiredError')
    return utils.unauthorizeAction(res);

  var id = req.swagger.params['id'].value;

  Article.articleLikePost(id,session.user.email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.articleLikeRemove = function articleLikeRemove (req, res, next) {
  //Extract session
  var session = decodeJWT(req);

  // Checking if it is the correct one
  if((!session) || session.name == 'TokenExpiredError')
    return utils.unauthorizeAction(res);

  var id = req.swagger.params['id'].value;

  Article.articleLikeRemove(id,session.user.email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.articleRecommended = function articleRecommended (req, res, next) {
  //Extract session
  var session = decodeJWT(req);

  // Checking if it is the correct one
  if((!session) || session.name == 'TokenExpiredError')
    return utils.unauthorizeAction(res);

  Article.articleRecommended(session.user.email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

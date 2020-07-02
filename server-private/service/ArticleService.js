'use strict';

var sqlDatabase;

// Utils
var {parseArticle, getArticles} = require("./utils/ArticleUtils");

exports.articleInit = function(database) {
  articleTable(database);
}

const articleTable = function(database) {
  sqlDatabase = database;
  sqlDatabase.schema.hasTable("articles").then( exists => {
    if(!exists){
      console.log("[CIVIS]: Creating articles' table");
      sqlDatabase.schema.createTable("articles", table => {
        table.increments("id");
        table.text("title");
        table.text("text");
        table.text("topic");
        table.integer("likesCount");
        table.integer("commentsCount");
        table.datetime("timestamp");
        table.text("statistics");
        table.boolean("isHome");
        table.text("sourceName");
        table.text("sourceUrl");
      }).then( () => {
        console.log("[CIVIS]: Filling articles' table");
        return Promise.all(getArticles()).then( obj => {
          return sqlDatabase("articles").insert(obj);
        });
      });
    }
    else{
      return true;
    }
  });
}

/**
 *
 * returns List
 **/
exports.article = function() {
  return sqlDatabase("articles").select().then(result => {
    var array = [];
    result.forEach((item, i) => {
      parseArticle(item);
    });
    return array;
  });
}


/**
 *
 * id BigDecimal
 * returns Article
 **/
exports.articleById = function(id) {
}


/**
 *
 * topic String
 * returns List
 **/
exports.articleByTopic = function(topic) {
}


/**
 *
 * returns List
 **/
exports.articleHome = function() {
}


/**
 *
 * id BigDecimal
 * returns Article
 **/
exports.articleLikePost = function(id) {
}


/**
 *
 * id BigDecimal
 * returns Article
 **/
exports.articleLikeRemove = function(id) {
}


/**
 *
 * returns List
 **/
exports.articleRecommended = function() {
}

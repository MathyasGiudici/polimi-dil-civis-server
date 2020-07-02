'use strict';

var sqlDatabase;

// Utils
var {parseArticle, getArticles, getRecommendations, getLikes} = require("./utils/ArticleUtils");

exports.articleInit = function(database) {
  articleTable(database);
  recTable(database);
  likesTable(database);
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

const recTable = function(database) {
  sqlDatabase = database;
  sqlDatabase.schema.hasTable("recommendations").then( exists => {
    if(!exists){
      console.log("[CIVIS]: Creating recommendations' table");
      sqlDatabase.schema.createTable("recommendations", table => {
        table.integer("article");
        table.text("user");
      }).then( () => {
        console.log("[CIVIS]: Filling recommendations' table");
        return Promise.all(getRecommendations()).then( obj => {
          return sqlDatabase("recommendations").insert(obj);
        });
      });
    }
    else{
      return true;
    }
  });
}

const likesTable = function(database) {
  sqlDatabase = database;
  sqlDatabase.schema.hasTable("articleLikes").then( exists => {
    if(!exists){
      console.log("[CIVIS]: Creating articleLikes' table");
      sqlDatabase.schema.createTable("articleLikes", table => {
        table.integer("article");
        table.text("user");
      }).then( () => {
        console.log("[CIVIS]: Filling articleLikes' table");
        return Promise.all(getLikes()).then( obj => {
          return sqlDatabase("articleLikes").insert(obj);
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

'use strict';

var sqlDatabase;

// Utils
var {getComments, getLikes} = require("./utils/CommentUtils");

exports.commentInit = function(database) {
  commentTable(database);
  likesTable(database);
}

const commentTable = function(database) {
  sqlDatabase = database;
  sqlDatabase.schema.hasTable("comments").then( exists => {
    if(!exists){
      console.log("[CIVIS]: Creating comments' table");
      sqlDatabase.schema.createTable("comments", table => {
        table.increments("id");
        table.integer("article");
        table.text("user");
        table.integer("parent");
        table.text("text");
        table.integer("likesCount");
        table.integer("commentsCount");
        table.datetime("timestamp");
      }).then( () => {
        console.log("[CIVIS]: Filling comments' table");
        return Promise.all(getComments()).then( obj => {
          return sqlDatabase("comments").insert(obj);
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
  sqlDatabase.schema.hasTable("commentLikes").then( exists => {
    if(!exists){
      console.log("[CIVIS]: Creating commentLikes' table");
      sqlDatabase.schema.createTable("commentLikes", table => {
        table.integer("comment");
        table.text("user");
      }).then( () => {
        console.log("[CIVIS]: Filling commentLikes' table");
        return Promise.all(getLikes()).then( obj => {
          return sqlDatabase("commentLikes").insert(obj);
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
 * id BigDecimal
 * returns Comment
 **/
exports.commentLikePost = function(id) {

}


/**
 *
 * id BigDecimal
 * returns Comment
 **/
exports.commentLikeRemove = function(id) {

}

/**
 *
 * article BigDecimal
 * returns List
 **/
exports.commentsGet = function(article) {

}


/**
 *
 * article BigDecimal
 * body Comment
 * returns List
 **/
exports.commentsPost = function(article,body) {

}

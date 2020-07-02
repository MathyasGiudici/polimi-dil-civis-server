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
 * article BigDecimal
 * returns List
 **/
exports.commentsGet = function(article) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "likesCount" : 5.63737665663332876420099637471139430999755859375,
  "children" : [ null, null ],
  "commentsCount" : 2.3021358869347654518833223846741020679473876953125,
  "userLike" : true,
  "id" : 0.080082819046101150206595775671303272247314453125,
  "text" : "text",
  "user" : {
    "birthday" : 1,
    "country" : "country",
    "password" : "password",
    "premium" : true,
    "gender" : "female",
    "phone" : "phone",
    "level" : 3,
    "surname" : "surname",
    "profilePic" : "http://example.com/aeiou",
    "name" : "name",
    "email" : "email"
  },
  "article" : 0.602745618307040320615897144307382404804229736328125,
  "timestamp" : "2000-01-23T04:56:07.000+00:00"
}, {
  "likesCount" : 5.63737665663332876420099637471139430999755859375,
  "children" : [ null, null ],
  "commentsCount" : 2.3021358869347654518833223846741020679473876953125,
  "userLike" : true,
  "id" : 0.080082819046101150206595775671303272247314453125,
  "text" : "text",
  "user" : {
    "birthday" : 1,
    "country" : "country",
    "password" : "password",
    "premium" : true,
    "gender" : "female",
    "phone" : "phone",
    "level" : 3,
    "surname" : "surname",
    "profilePic" : "http://example.com/aeiou",
    "name" : "name",
    "email" : "email"
  },
  "article" : 0.602745618307040320615897144307382404804229736328125,
  "timestamp" : "2000-01-23T04:56:07.000+00:00"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * article BigDecimal
 * body Comment
 * returns List
 **/
exports.commentsPost = function(article,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "likesCount" : 5.63737665663332876420099637471139430999755859375,
  "children" : [ null, null ],
  "commentsCount" : 2.3021358869347654518833223846741020679473876953125,
  "userLike" : true,
  "id" : 0.080082819046101150206595775671303272247314453125,
  "text" : "text",
  "user" : {
    "birthday" : 1,
    "country" : "country",
    "password" : "password",
    "premium" : true,
    "gender" : "female",
    "phone" : "phone",
    "level" : 3,
    "surname" : "surname",
    "profilePic" : "http://example.com/aeiou",
    "name" : "name",
    "email" : "email"
  },
  "article" : 0.602745618307040320615897144307382404804229736328125,
  "timestamp" : "2000-01-23T04:56:07.000+00:00"
}, {
  "likesCount" : 5.63737665663332876420099637471139430999755859375,
  "children" : [ null, null ],
  "commentsCount" : 2.3021358869347654518833223846741020679473876953125,
  "userLike" : true,
  "id" : 0.080082819046101150206595775671303272247314453125,
  "text" : "text",
  "user" : {
    "birthday" : 1,
    "country" : "country",
    "password" : "password",
    "premium" : true,
    "gender" : "female",
    "phone" : "phone",
    "level" : 3,
    "surname" : "surname",
    "profilePic" : "http://example.com/aeiou",
    "name" : "name",
    "email" : "email"
  },
  "article" : 0.602745618307040320615897144307382404804229736328125,
  "timestamp" : "2000-01-23T04:56:07.000+00:00"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

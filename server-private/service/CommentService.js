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

const getSimpleUser = async function (email) {
  var promise = new Promise(function(resolve, reject) {
    return sqlDatabase("users").where("email",email).select().then(
      data => {
        var simple = {};
        simple.email = data[0].email;
        simple.name = data[0].name;
        simple.surname = data[0].surname;
        simple.level = data[0].level;
        simple.profilePic = data[0].profilePic;
        return simple;
      });
  });

  var user = await promise;
  return user;
}

const getUserLike = async function (comment,email) {
  var promise = new Promise(function(resolve, reject) {
    if(email == '')
      resolve(false);
    else
      return sqlDatabase("commentLikes").where("user",email).where("comment",comment).select().then(result => {
        if(result.length != 0)
          resolve(true);
        else
          resolve(false);
      });
  });

  var result = await promise;
  return result;
}

const getArticle = async function (id,email) {
  var promise = new Promise(function(resolve, reject) {
    sqlDatabase("articles").where("id",id).select().then(result => {
      resolve(result[0]);
    });
  });

  var result = await promise;
  return result;
}

const getComment = async function (id) {
  var promise = new Promise(function(resolve, reject) {
    sqlDatabase("comments").where("id",id).select().then(result => {
      resolve(result[0]);
    });
  });

  var result = await promise;
  return result;
}

/**
 *
 * id BigDecimal
 * returns Comment
 **/
exports.commentLikePost = async function(id,email) {
  var comment =  getComment(id);
  var alreadyLiked = getUserLike(id,email);

  if(alreadyLiked){
    comment.user = getSimpleUser(comment.user)
    comment.children = [];
    comment.userLike = true;
    return comment;
  }

  comment.likesCount += 1;

  await sqlDatabase("comments").where("id",comment.id).update(comment);
  await sqlDatabase("commentLikes").insert({comment:comment.id,user:email});

  omment.user = getSimpleUser(comment.user)
  comment.children = [];
  comment.userLike = true;

  return comment;
}


/**
 *
 * id BigDecimal
 * returns Comment
 **/
exports.commentLikeRemove = async function(id,email) {
  var comment =  getComment(id);
  var alreadyLiked = getUserLike(id,email);

  if(!alreadyLiked){
    comment.user = getSimpleUser(comment.user)
    comment.children = [];
    comment.userLike = false;
    return comment;
  }

  comment.likesCount -= 1;

  await sqlDatabase("comments").where("id",comment.id).update(comment);
  await sqlDatabase("commentLikes").where("user",email).where("comment",id).del();

  omment.user = getSimpleUser(comment.user)
  comment.children = [];
  comment.userLike = false;

  return comment;
}

/**
 *
 * article BigDecimal
 * returns List
 **/
exports.commentsGet = function(article,email) {
  return sqlDatabase("comments").where("article",article).select().then(data => {
    var usersId = new Set();
    var top = [];
    var bottom = [];

    // Looping on comments
    data.forEach((item, i) => {
      // Splitting comments
      if(item.parent == -1)
        top.push(item);
      else
        bottom.push(item);

      // Creating users
      usersId.add(item.user);
    });

    // Looking for users
    userId = [...userId];
    var user = [];

    userId.forEach((item, i) => {
      user.push(getSimpleUser(item));
    });

    top.forEach((topItem, i) => {
      topItem.user = user[userId.indexOf(topItem.user)];
      topItem.children = [];
      topItem.userLike = getUserLike(topItem.id,email);

      bottom.forEach((bottomItem, i) => {
        bottomItem.userLike = getUserLike(bottomItem.id,email);
        bottomItem.user = user[userId.indexOf(bottomItem.user)];

        if(bottomItem.parent = topItem.id)
          topItem.children.push(bottomItem);
      });
    });

    return top;
  });
}


/**
 *
 * article BigDecimal
 * body Comment
 * returns List
 **/
exports.commentsPost = async function(article,body) {
  delete body.children;
  delete body.userLike;
  body.likesCount = 0;
  body.commentsCount = 0;
  body.user = body.user.email;

  var promise =  new Promise(async function(resolve, reject) {
    var article =  getArticle(id);
    article.commentsCount += 1;

    return sqlDatabase("articles").where("id",article.id).update(article);
  });

  await promise;

  if(body.parent != -1){
    promise =  new Promise(function(resolve, reject) {
      var comment = getComment(body.parent);
      comment.commentsCount += 1;

      return sqlDatabase("comments").where("id",comment.id).update(comment);
    });

    await promise;
  }

  return sqlDatabase("comments").insert(body).then(result => {
    result.user = getSimpleUser(result.user);
    topItem.children = [];
    topItem.userLike = false;
  });
}

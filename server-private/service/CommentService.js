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
  return new Promise(async function(resolve, reject) {
    sqlDatabase("users").where("email",email).select().then(
      data => {
        var simple = {};
        simple.email = data[0].email;
        simple.name = data[0].name;
        simple.surname = data[0].surname;
        simple.level = data[0].level;
        simple.profilePic = data[0].profilePic;
        resolve(simple);
      });
  });
}

const getUserLike = async function (comment,email) {
  return new Promise(async function(resolve, reject) {
    if(email == '')
      resolve(false);
    else
      await sqlDatabase("commentLikes").where("user",email).where("comment",comment).select().then(result => {
        if(result.length != 0)
          resolve(true);
        else
          resolve(false);
      });
  });
}

const getArticle = async function (id) {
  return new Promise(async function(resolve, reject) {
    await sqlDatabase("articles").where("id",id).select().then(result => {
      resolve(result[0]);
    });
  });
}

const getComment = async function (id) {
  return new Promise(async function(resolve, reject) {
    await sqlDatabase("comments").where("id",id).select().then(result => {
      resolve(result[0]);
    });
  });
}

/**
 *
 * id BigDecimal
 * returns Comment
 **/
exports.commentLikePost = async function(id,email) {
  var comment =  await getComment(id);
  var alreadyLiked = await getUserLike(id,email);

  if(alreadyLiked){
    comment.user = await getSimpleUser(comment.user)
    comment.children = [];
    comment.userLike = true;
    return comment;
  }

  comment.likesCount += 1;

  await sqlDatabase("comments").where("id",comment.id).update(comment);
  await sqlDatabase("commentLikes").insert({comment:comment.id,user:email});

  comment.user = await getSimpleUser(comment.user)
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
  var comment =  await getComment(id);
  var alreadyLiked = await getUserLike(id,email);

  if(!alreadyLiked){
    comment.user = await getSimpleUser(comment.user)
    comment.children = [];
    comment.userLike = false;
    return comment;
  }

  comment.likesCount -= 1;

  await sqlDatabase("comments").where("id",comment.id).update(comment);
  await sqlDatabase("commentLikes").where("user",email).where("comment",id).del();

  comment.user = await getSimpleUser(comment.user)
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
  return sqlDatabase("comments").where("article",article).select().then(async function(data){
    var usersId = new Set([]);
    var top = [];
    var bottom = [];

    // Looping on comments
    data.forEach((item, i) => {
      // Creating users
      usersId.add(item.user);
      // Splitting comments
      if(item.parent == -1)
        top.push(item);
      else
        bottom.push(item);
    });

    // Looking for users
    usersId = [...usersId];
    var user = [];

    for(let i=0; i < usersId.length; i++){
      let obj = await getSimpleUser(usersId[i]);
      user.push(obj);
    }

    for(let i=0; i < top.length; i++){
      var topItem = top[i];
      topItem.user = user[usersId.indexOf(topItem.user)];
      topItem.children = [];
      topItem.userLike = await getUserLike(topItem.id,email);

      for(let j=0; j < bottom.length; j++){
        var bottomItem = bottom[j];
        bottomItem.user = user[usersId.indexOf(bottomItem.user)];
        bottomItem.userLike = await getUserLike(bottomItem.id,email);

        if(bottomItem.parent == topItem.id)
          topItem.children.push(bottomItem);
      }
    }
    return top;
  });
}


/**
 *
 * article BigDecimal
 * body Comment
 * returns List
 **/
exports.commentsPost = async function(body) {
  // Dropping useless variables
  delete body.children;
  delete body.userLike;
  // Initialize parameters
  body.likesCount = 0;
  body.commentsCount = 0;

  // Checking the ID (find the max)
  var promise = new Promise(async function(resolve, reject) {
    await sqlDatabase("comments").max('id as maxId').first().then(maxIdQuery => {
      resolve(maxIdQuery.maxId);
    });
  });

  var max = await promise;
  body.id = max + 1;

  // Update the article comment count
  var promise = new Promise(async function(resolve, reject) {
    var article =  await getArticle(body.article);
    article.commentsCount += 1;

    await sqlDatabase("articles").where("id",article.id).update(article).then(()=>{resolve();});
  });

  await promise;

  // Updating comment count (if need)
  if(body.parent != -1){
    promise = new Promise(async function(resolve, reject) {
      var comment = await getComment(body.parent);
      comment.commentsCount += 1;

      await sqlDatabase("comments").where("id",comment.id).update(comment).then(()=>{resolve();});
    });

    await promise;
  }

  // Pushing the comment in the db
  return sqlDatabase("comments").insert(body).then(result => {
    return sqlDatabase("comments").where("id",body.id).then(async function(array){
      var data = array[0];
      data.user = await getSimpleUser(data.user);
      data.children = [];
      data.userLike = false;
      return data;
    });
  });
}

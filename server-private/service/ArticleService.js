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

const getUserLike = async function (article,email) {
  return new Promise(async function(resolve, reject) {
    if(email == '')
      resolve(false);
    else
      await sqlDatabase("articleLikes").where("user",email).where("article",article).select().then(result => {
        if(result.length != 0)
          resolve(true);
        else
          resolve(false);
      });
  });
}

const getArticle = async function (id,email) {
  return new Promise(function(resolve, reject) {
    sqlDatabase("articles").where("id",id).select().then(async function(result) {
      result[0].userLike = await getUserLike(result[0].id,email);
      resolve(result[0]);
    });
  });
}

/**
 *
 * returns List
 **/
exports.article = function(offset,limit,email) {
  return sqlDatabase("articles").limit(limit).offset(offset).select().then(async function(result) {
    for(var i=0; i < result.length; i++){
      result[i].userLike = await getUserLike(result[i].id,email);
      parseArticle(result[i]);
    }
    return result;
  });
}


/**
 *
 * id BigDecimal
 * returns Article
 **/
exports.articleById = async function(id,email) {
  let article = await getArticle(id,email)
  parseArticle(article);
  return article;
}


/**
 *
 * topic String
 * returns List
 **/
exports.articleByTopic = function(topic,email) {
  return sqlDatabase("articles").where("topic",topic).select().then(async function(result) {
    for(var i=0; i < result.length; i++){
      result[i].userLike = await getUserLike(result[i].id,email);
      parseArticle(result[i]);
    }
    return result;
  });
}


/**
 *
 * returns List
 **/
exports.articleHome = function(email) {
  return sqlDatabase("articles").where("isHome",true).select().then(async function(result) {
    for(var i=0; i < result.length; i++){
      result[i].userLike = await getUserLike(result[i].id,email);
      parseArticle(result[i]);
    }
    return result;
  });
}


/**
 *
 * id BigDecimal
 * returns Article
 **/
exports.articleLikePost = async function(id,email) {
  var article =  await getArticle(id,email);
  var alreadyLiked = await getUserLike(id,email);

  if(alreadyLiked){
    parseArticle(article);
    return article;
  }

  delete article.userLike;
  article.likesCount += 1;

  await sqlDatabase("articles").where("id",article.id).update(article);
  await sqlDatabase("articleLikes").insert({article:article.id,user:email});

  article.userLike = true;

  parseArticle(article);
  return article;
}


/**
 *
 * id BigDecimal
 * returns Article
 **/
exports.articleLikeRemove = async function(id,email) {
  var article =  await getArticle(id,email);
  var alreadyLiked = await getUserLike(id,email);

  if(article==null)
    return {};

  if(!alreadyLiked){
    parseArticle(article);
    return article;
  }

  delete article.userLike;
  article.likesCount -= 1;

  await sqlDatabase("articles").where("id",article.id).update(article);
  await sqlDatabase("articleLikes").where("user",email).where("article",id).del();

  article.userLike = false;

  parseArticle(article);
  return article;
}


/**
 *
 * returns List
 **/
exports.articleRecommended = async function(email) {
  var promise = new Promise(function(resolve, reject) {
    return sqlDatabase("recommendations").where("user",email).select().then(
      result => {
        resolve(result.map( x => x.article));
      }
    )});

  var articles = await promise;

  return sqlDatabase("articles").whereIn("id",articles).select().then(async function(result) {
    for(var i=0; i < result.length; i++){
      result[i].userLike = await getUserLike(result[i].id,email);
      parseArticle(result[i]);
    }
    return result;
  });
}

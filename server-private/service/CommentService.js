'use strict';


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


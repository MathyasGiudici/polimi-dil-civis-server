'use strict';


/**
 *
 * returns String
 **/
exports.userDelete = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * body AuthReq 
 * returns AuthRes
 **/
exports.userLogin = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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
  "token" : "token"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * no response value expected for this operation
 **/
exports.userLogout = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * returns User
 **/
exports.userMe = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * body User 
 * no response value expected for this operation
 **/
exports.userRegistration = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * email String 
 * image File 
 * no response value expected for this operation
 **/
exports.userRegistrationPicture = function(email,image) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * body User New user informations. If password is empty the server know that you do not want to change your password
 * returns User
 **/
exports.userUpdate = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


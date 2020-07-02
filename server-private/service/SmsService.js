'use strict';

var sqlDatabase;

// Utils
// var {getSMS} = require("./utils/SmsUtils");

exports.smsInit = function(database) {
  return;
}

/**
 *
 * returns List
 **/
exports.getSms = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "code" : 0.80082819046101150206595775671303272247314453125,
  "email" : "email"
}, {
  "code" : 0.80082819046101150206595775671303272247314453125,
  "email" : "email"
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
 * body SMSCode
 * returns User
 **/
exports.smsVerification = function(body) {
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

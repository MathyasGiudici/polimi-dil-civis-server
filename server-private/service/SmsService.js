'use strict';

var sqlDatabase;

// Utils
var {getSMS} = require("./utils/SmsUtils");

exports.smsInit = function(database) {
  sqlDatabase = database;
  sqlDatabase.schema.hasTable("sms").then( exists => {
    if(!exists){
      console.log("[CIVIS]: Creating sms' table");
      sqlDatabase.schema.createTable("sms", table => {
        table.increments("id");
        table.text("email");
        table.integer("code");
        table.datetime("timestamp");
      }).then( () => {
        console.log("[CIVIS]: Filling sms' table");
        return Promise.all(getSMS()).then( obj => {
          return sqlDatabase("sms").insert(obj);
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

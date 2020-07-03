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
        table.text("email");
        table.text("code");
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
  return sqlDatabase("sms").select();
}


/**
 *
 * body SMSCode
 * returns User
 **/
exports.smsVerification = async function(body) {
  var promise = new Promise(function(resolve, reject) {
    return sqlDatabase("sms").where("email",body.email).select().then( data => {
      if(data.length > 0){
          if(body.code == data[0].code)
            resolve(true);
          else
            response(false);
      }
      else {
        response(false);
      }
    });
  });

  var codeCheck = await promise;

  if(!codeCheck)
    return {response: "Something got wrong. Check the code!"};

  promise = new Promise(function(resolve, reject) {
    return sqlDatabase("users").where("email",body.email).select().then(
      data => { resolve(data[0]);});
  });

  var user = await promise;

  user.verify = true;

  return sqlDatabase("users").where("email",user.email).update(user).then( data => {
     return sqlDatabase("users").where("email",user.email).select().then(
        data => {
          return data.map( e => {
             delete e.password;
             return e;
          });
        }).then( data => {return data[0];});
  });
}

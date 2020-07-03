'use strict';

// Import of JWT
const argon2 = require('argon2');
const {generateJWT} = require('./AuthService');

// Import of image uploader
const fileupload = require('express-fileupload');

var sqlDatabase;

// Utils
var {getUsers} = require("./utils/UserUtils");

exports.userInit = function(database) {
  sqlDatabase = database;
  sqlDatabase.schema.hasTable("users").then( exists => {
    if(!exists){
      console.log("[CIVIS]: Creating users' table");
      sqlDatabase.schema.createTable("users", table => {
        table.string("email").primary();
        table.boolean("verify");
        table.string("name");
        table.string("surname");
        table.string("password");
        table.enum("gender",["female","male"]);
        table.date("birthday");
        table.string("country");
        table.string("phone");
        table.string("profilePic");
        table.integer("level");
        table.boolean("premium");
      }).then(async function(){
        console.log("[CIVIS]: Filling users' table");
        var array = await getUsers();
        return Promise.all(array).then( obj => {
          return sqlDatabase("users").insert(obj);
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
 * returns String
 **/
exports.userDelete = function(email) {
  return sqlDatabase("users").where("email",email).del().then(function(response){
    if(response){
      return {response: email};
    } else {
      return {response: "Something gets wrong"};
    }
  });
}


/**
 *
 * body AuthReq
 * returns AuthRes
 **/
exports.userLogin = async function(body) {
  return sqlDatabase("users").where("email",body.email).select().then(async function(data) {
      // Checking if the user exists
      if(data.length == 0)
        return {response: "You must be register"};

      var user = data[0];

      if(!user.verify)
        return {response: "You must verify your phone"};
      // Checking the password
      const correctPassword = await argon2.verify(user.password, body.password);
      // Correctness of the password
      if(correctPassword){
        delete user.password;
        return {response: "Successful login",
                user: user,
                token: generateJWT(user)};
      }
      else
        return {response: "Password is wrong"};
    });
}

/**
 *
 * returns User
 **/
exports.userMe = function(email) {
  return sqlDatabase("users").where("email",email).select().then(
    data => {
      return data.map( e => {
        delete e.password;
        return e;
      });
    }).then( data => {return data[0];});
}


/**
 *
 * body User
 * no response value expected for this operation
 **/
exports.userRegistration = async function(body) {
  return sqlDatabase("users").where("email",body.email).select().then(async function(data) {
    // Checking if the user exists
    if(data.length != 0)
      return {response: "You are already register"};

    const passwordHashed = await argon2.hash(body.password);
    body.password = passwordHashed;
    body.verify = false;

    var userPromise = new Promise(function(resolve, reject) {
      return sqlDatabase("users").insert(body).then(
        data => {
          return sqlDatabase("users").where("email",body.email).select().then(
            data => {
              return data.map( e => {
                delete e.password;
                return e;
              });
            }).then( data => {return data[0];});
        });
    });

    var smsPromise = new Promise(function(resolve, reject) {
      var code = ("0000" + (Math.floor(Math.random() * 1000))).slice(-4);
      var date = new Date();
      return sqlDatabase("users").insert({
        email: body.email,
        code: code,
        timestamp: date.toISOString()
      });
    });

    await smsPromise;
    let result = await userPromise;

    return result;
  });
}


/**
 *
 * email String
 * image File
 * no response value expected for this operation
 **/
exports.userRegistrationPicture = async function(email,image,req) {
  // Checking if the user is in the database
  var promise = new Promise(function(resolve, reject){
    return sqlDatabase("users").where("email",email).select().then(
      data => {
        if(data.length > 0)
          resolve(true);
        else
          resolve(false);
      });
  });

  var registered = await promise;

  if(!registered)
    return { response: 'error' };

  var name = email.trim().replace('.','').replace('@','');
  const file = req.files.image;
  const path = __dirname + '/server-public/users-pic/' + name;


  file.mv(path, (error) => {
    if (error) {j
      console.error(error);
      return { response: 'error' };
    }

    return { response: 'OK' };
  });
}


/**
 *
 * body User New user informations. If password is empty the server know that you do not want to change your password
 * returns User
 **/
exports.userUpdate = async function(body) {
  // Checking if the password must be changhed or not
  if(body.password != ""){
    const passwordHashed = await argon2.hash(body.password);
    body.password = passwordHashed;
    return sqlDatabase("users").where("email",body.email).update(body).then(
       data => {
         return sqlDatabase("users").where("email",body.email).select().then(
            data => {
              return data.map( e => {
                 delete e.password;
                 return e;
              });
            }).then( data => {return data[0];});
      });
  } else {
    return sqlDatabase("users").where("email",body.email).select().then( myUser => {
      body.password = myUser[0].password;
      return sqlDatabase("users").where("email",body.email).update(body).then(
         data => {
           return sqlDatabase("users").where("email",body.email).select().then(
              data => {
                return data.map( e => {
                   delete e.password;
                   return e;
                });
              }).then( data => {return data[0];});
        });
    });
  }
}

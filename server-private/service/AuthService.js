'use strict';
// Imports
const jwt = require('jsonwebtoken');
var fs = require('fs');

// This is my important secret
const signature = "g3zgsujBliMsjpnFOkKAwteSQ72VEwrF";

// Function to create the token
exports.generateJWT = function(user){
  const dataString = JSON.stringify(user);
  const expiration = '48h';
  return jwt.sign({data: dataString}, signature, { expiresIn: expiration });
}

// Function to get the token from the header
const getTokenFromHeader = (req) => {
  try {
      let r = req.headers.authorization.split(' ')[1];
      return r;
  } catch (e) {
    console.log(e);
  }
}

// Function to decode the token
exports.decodeJWT = (req) => {
  try{
    var decoded = jwt.verify(getTokenFromHeader(req), signature,
      function(err,verifiedJwt){
        if(err){
          console.log(err); // Token has expired, has been tampered with, etc
          return 'TokenExpiredError';
        } else {
          console.log(verifiedJwt); // Will contain the header and body
          return {
            user: JSON.parse(verifiedJwt.data),
            token: getTokenFromHeader(req)
          };
        }
      });
  }catch(e){
    console.log(e);
  }
}

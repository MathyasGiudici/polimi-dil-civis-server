// Importing knex
const sqlDbFactory = require('knex');

// DEBUG:
// const sqlDbFactory = require('knex')({
//   client: 'pg',
//   version: '12.3',
//   connection: {
//     host : '127.0.0.1',
//     user : 'postgres',
//     password : 'postgres',
//     database : 'postgres'
//   }
// });
// Importing tables init functions
var {articleInit} = require("./ArticleService");
var {commentInit} = require("./CommentService");
var {smsInit} = require("./SmsService");
var {userInit} = require("./UserService");

// Creating the db
var database;

// Function to Initialize the db in knex
exports.databaseInit = async function(){
  console.log("[CIVIS]: Creating the DB");
  database = sqlDbFactory({
    debug: true,
    client: "pg",
    connection: process.env.DATABASE_URL ,
    ssl: true
  });


  console.log("[CIVIS]: Creating the tables");
  var tablePromise = Promise.all([articleInit(database),commentInit(database),
    smsInit(database),userInit(database)]);

  await tablePromise;
}

// Importing knex
const sqlDbFactory = require('knex');

// Importing tables init functions
var {articleInit} = require("./ArticleService");
var {commentInit} = require("./CommentService");
var {smsInit} = require("./SmsService");
var {userInit} = require("./UserService");

// Creating the db
var database;

// // DEBUG: check the variable
console.log(__dirname);

const parametersDebug = {
  debug: false,
  client: 'pg',
  version: '12.3',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgres',
    database : 'postgres'
  }
};

const parametersServer = {
  debug: false,
  client: "pg",
  connection: process.env.DATABASE_URL ,
  ssl: true
};

// Function to Initialize the db in knex
exports.databaseInit = async function(){
  console.log("[CIVIS]: Creating the DB");
  var isDebug = (process.env.DATABASE_URL === undefined);

  database = sqlDbFactory(isDebug ? parametersDebug : parametersServer);

  console.log("[CIVIS]: Creating the tables");
  var tablePromise = Promise.all([articleInit(database),commentInit(database),
    smsInit(database),userInit(database)]);

  await tablePromise;
}

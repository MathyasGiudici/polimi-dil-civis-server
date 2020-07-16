'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = process.env.PORT || 8080;

// serveStatic to change the public folder of the server
var serveStatic = require('serve-static');

// Importing initialization of the database
var {databaseInit} = require("./server-private/service/DataService");

// response utils
var utils = require('./server-private/utils/writer.js');
const {decodeJWT} = require('./server-private/service/AuthService');

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './server-private/controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'server-private/api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  app.use(function(req, res, next) {
    if (req.url.split('/')[1] === 'statistics'){
      //Extract session
      var session = decodeJWT(req);
      console.log(session);
      // Checking if it is the correct one
      if((!session) || session.name == 'TokenExpiredError' || !session.user.premium)
        return utils.unauthorizeAction(res);
    }
    next();
  });

  // Serve-Static folder
  app.use(serveStatic(__dirname + "/server-public"));
  // Database initialization
  databaseInit();

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});

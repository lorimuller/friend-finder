// Pull in required dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Configure the Express application
var app = express();
var PORT = process.env.PORT || 8000;


app.use(express.static(path.join(__dirname, './app/public')));

// Add middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// routes
require(path.join(__dirname, './app/routing/apiRoute'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);

// Start listening on PORT
app.listen(PORT, function() {
  console.log('Listening on PORT: ' + PORT);
});
 
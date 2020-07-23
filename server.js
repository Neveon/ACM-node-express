const express = require('express');
const app = express();
const path = require('path');

// in order to read HTTP POST data , we have to use "body-parser" node module.
// body-parser is a piece of express middleware that reads a form's input and stores
// it as a javascript object accessible through req.body
const bodyParser = require('body-parser');

// Logger middleware
app.use(function(req, res, next){
  console.log(req.method + ' ' + req.path + ' ' + req.ip);
  next();
});

// Serve static assets (styles.css)
// Must include link tag in index.html
app.use(express.static('public'));

// Serving an HTML File
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.get('/hello', (req, res) => {
  res.json({Hello: 'World'});
});

// Chaining middleware - Time Server
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next(); // Next callback function

  console.log('am i reached?');

}, function(req, res) {

  console.log('am i next?');
  res.json({time: req.time});
});


// Setting up port and listening on said port
app.listen(process.env.PORT || 1337);

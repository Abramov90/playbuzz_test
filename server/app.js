
var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request');
var config = require('./config');
var bodyParser = require('body-parser');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(config.get('port'), function () {
    console.log('Server has been started on port ' + config.get('port'));
});

app.get('/check', function(req, res) {
	request(req.query.url, function(error, response, body) {
		if (error) {
			res.send({
				status: error.code
			});
		} else {
			response.writeHeader(200, {"Content-Type": "text/html"});
			response.write(body);
			response.end();

		}
	});
});

module.exports = app;

"use strict";
var http = require("http");

module.exports = function collect(application_name, function_name, usage, callback) {
  var options = {
    host: process.env.HOST_API,
    port: 80,
    path: '/',
    method: 'POST'
  };

  var metrics = {
    "application_name": application_name,
    "function_name": function_name,
    "usage": randint(0, usage)
  }
  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  // write data to request body
  req.write(JSON.stringify(metrics));
req.end();

}
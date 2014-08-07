process.title = 'silicon-store-server';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var redis = require("redis");
var port = process.env.PORT || 5000;

// Redis URL from Heroku
var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL);

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 12);
});

server.listen(port);

// simple logger
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

io.sockets.on('connection', function (socket) {

  // subscribe to redis
  var subscribe = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
  subscribe.auth(redisURL.auth.split(":")[1]);
  subscribe.subscribe('products.update');

  // relay redis messages to connected socket
  subscribe.on("message", function(channel, message) {
    socket.emit('message', message);
  });

  // unsubscribe from redis if session disconnects
  socket.on('disconnect', function () {
    subscribe.quit();
  });

});
process.title = 'silicon-store-server';

var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var redis = require("redis");

// Redis URL from Heroku
var url = require('url');
var redisURL = url.parse("redis://rediscloud:021oGegbXNw8Dkqc@pub-redis-19375.us-east-1-4.1.ec2.garantiadata.com:19375");

server.listen(3001);

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
    console.log("from rails to subscriber:", channel, message);
    socket.emit('message', message)
  });

  // unsubscribe from redis if session disconnects
  socket.on('disconnect', function () {
    console.log("user disconnected");

    subscribe.quit();
  });

});
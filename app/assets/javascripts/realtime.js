storeApp.realtime = {
  connect: function() {
    storeApp.socket = io.connect('http://0.0.0.0:5001');
    return storeApp.socket.on('rt-change', function(message) {
      console.log(message);
      return storeApp.trigger('categories', message);
    });
  }
};
console.log("storeApp.realtime");
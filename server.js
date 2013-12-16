var connect = require('connect');
var SocketIO = require('socket.io');

var server = connect()
  .use(connect.static(__dirname))
  .listen(9009);

var io = SocketIO.listen(server);

var viewsync = io.of('/viewsync');

viewsync.on('connection', function(socket) {
  socket.on('pov', function(pov) {
    socket.broadcast.emit('pov', pov);
  });
});

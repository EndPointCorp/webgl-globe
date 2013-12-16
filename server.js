var connect = require('connect');
var SocketIO = require('socket.io');

var server = connect()
  .use(connect.static(__dirname))
  .listen(9009);

var io = SocketIO.listen(server);

var viewsync = io.of('/viewsync');

var povState = null;

viewsync.on('connection', function(socket) {
  socket.on('pov', function(pov) {
    povState = pov;
    socket.broadcast.emit('pov', pov);
  });

  socket.on('refresh', function() {
    if (povState !== null) socket.emit('pov', povState);
  });
});

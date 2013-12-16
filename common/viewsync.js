var VIEWSYNC = VIEWSYNC || {};

VIEWSYNC.Connection = function(globe) {
  var globe = globe;

  var viewsync = io.connect('/viewsync');

  viewsync.on('connect', function() {
    console.debug('viewsync connected');
    viewsync.emit('refresh');
  });

  viewsync.on('pov', function(pov) {
    console.debug('viewsync recv pov:', pov);
    globe.setPov(pov);
  });

  function sendPov(pov) {
    console.debug('viewsync send pov:', pov);
    viewsync.emit('pov', pov);
  }
}

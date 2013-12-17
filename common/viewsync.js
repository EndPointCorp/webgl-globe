var VIEWSYNC = VIEWSYNC || {};

VIEWSYNC.Connection = function(globe, master) {
  var globe = globe;
  var master = master;

  var viewsync = io.connect('/viewsync');

  viewsync.on('connect', function() {
    console.debug('viewsync connected');
    viewsync.emit('refresh');
  });

  viewsync.on('sync pov', function(pov) {
    console.debug('viewsync recv pov:', pov);
    globe.setTarget(pov);
  });

  function sendPov(pov) {
    console.debug('viewsync send pov:', pov);
    viewsync.emit('pov', pov);
  }

  if (master) {
    globe.setPreRenderCB(function() {
      sendPov(globe.getTarget());
    });
  }
}

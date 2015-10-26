var menubar = require('menubar')
require('electron-debug')();
var ipc = require('ipc');

var mb = menubar({
  preloadWindow: true,
  height: 600,
  transparent: true
});

mb.on('ready', function() {

});

ipc.on('close-window', function(event, arg) {
  console.log('closing window');
  event.returnValue = 'window closing';
  mb.hideWindow();
});
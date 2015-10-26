window.jQuery = window.$ = require('jquery');
var clipboard = require('clipboard');
var ipc = require('ipc');

var notify = function(snippetVal) {
  var notice = {
    title: 'Copied to Clipboard',
    body: '"' + snippetVal + '" was copied to your clipboard.'
  }
  new Notification(notice['title'], notice);
};

var selectInputContents = function(evt) {
  // Select the contents of the cheat and copy to clipboard
  var $input = $(this);
  $input.select();
  clipboard.writeText($input.val());
  
  // Show a notification of the clipboard copy
  notify($input.val());

  // After a short delay, unfocus the input and close the menubar window
  setTimeout(function() {
    $input[0].selectionStart = $input[0].selectionEnd = -1;
    $input.blur();
    ipc.sendSync('close-window');
  }, 800);
};

$('input').on('click', selectInputContents);

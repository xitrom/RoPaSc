var winLimit;
document.getElementById('limit').addEventListener('click', limitPrompt);

function limitPrompt() {
  var title = 'Win limit';
  var message = 'Set the win limit';
  var buttonLabels = ['OK'];
  var defaultText = winLimit;
  navigator.notification.prompt(message, promptCallback, title, buttonLabels, defaultText);

  function promptCallback(result) {
     winLimit = result.input1;
  }
}

function getWinLimit() {
  return winLimit;
}
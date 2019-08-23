let userScore = 0;
let computerScore = 0;
let winLimit = 10;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_div = document.querySelector('.result');
const rock_div = document.getElementById('rock');
const paper_div = document.getElementById('paper');
const scissors_div = document.getElementById('scissors');

main();

function main() {
  rock_div.addEventListener('click', () => game('rock'));
  paper_div.addEventListener('click', () => game('paper'));
  scissors_div.addEventListener('click', () => game('scissors')); 
  document.getElementById('reset').addEventListener('click', resetConfirm);
}

function game(userChoice) {
  const computerChoice = getComputerChoice();

  switch (userChoice + computerChoice) {
    case 'paperrock':
    case 'rockscissors':
    case 'scissorspaper':
      win(userChoice, computerChoice);
      break;
    case 'rockpaper':
    case 'scissorsrock':
    case 'paperscissors':
      loses(userChoice, computerChoice);
      break;
    case 'rockrock':
    case 'scissorsscissors':
    case 'paperpaper':
      draw(userChoice, computerChoice);
      break;
  }
}

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function win(user, computer) {
  userScore++;
  userScore_span.innerHTML = userScore;
  result_div.innerHTML = `<p>${convertCase(user)} beats ${convertCase(computer)}. <br>You win!</p>`;
  const roundStatus = document.getElementById(user);
  roundStatus.classList.add('winningStyles');
  setTimeout(() => roundStatus.classList.remove('winningStyles'), 300);
  checkWinLimit();
}

function loses(user, computer) {
  computerScore++;
  computerScore_span.innerHTML = computerScore;
  result_div.innerHTML = `<p>${convertCase(computer)} beats ${convertCase(user)}. <br>You lose!</p>`;
  const roundStatus = document.getElementById(user);
  roundStatus.classList.add('losingStyles');
  setTimeout(() => roundStatus.classList.remove('losingStyles'), 300);
  checkWinLimit();
}

function draw(user, computer) {
  result_div.innerHTML = `<p>It is a draw!<br>You both chose ${convertCase(user)}.</p>`;
  const roundStatus = document.getElementById(user);
  roundStatus.classList.add('drawStyles');
  setTimeout(() => roundStatus.classList.remove('drawStyles'), 300);
}

function checkWinLimit() {
  if (userScore === winLimit) {
    var title = 'You won!';
    var message = 'Do you want to play again?';
    var buttonLabels = 'YES,NO';
    navigator.notification.confirm(message, confirmCallback, title, buttonLabels);

    function confirmCallback(buttonIndex) {
      if (buttonIndex == 1) window.location.href = 'game.html';
      else window.location.href = 'menu.html';
    }
  }

  else if (computerScore === winLimit) {
    var title = 'You lost!';
    var message = 'Do you want to play again?';
    var buttonLabels = 'YES,NO';
    navigator.notification.confirm(message, confirmCallback, title, buttonLabels);

    function confirmCallback(buttonIndex) {
      if (buttonIndex == 1) window.location.href = 'game.html';
      else window.location.href = 'menu.html';
    }
  }
}

function convertCase(anythingIwant) {
  if (anythingIwant === 'paper') return 'Paper';
  if (anythingIwant === 'scissors') return 'Scissors';
  return 'Rock';
}

function resetConfirm() {
  var message = 'Are you sure you want to reset?';
  var title = 'Reset game';
  var buttonLabels = 'YES,NO';
  navigator.notification.confirm(message, confirmCallback, title, buttonLabels);

  function confirmCallback(buttonIndex) {
    if (buttonIndex == 1) window.location.href = 'game.html';
  }
}
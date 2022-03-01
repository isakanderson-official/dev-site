'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const curren0El = document.getElementById('current--0');
const curren1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//Starting Conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  curren0El.textContent = 0;
  curren1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
init();
//Rolling
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Random Roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to main score. If score is 100 or more they win
    scores[activePlayer] += currentScore;
    // scores[1]
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

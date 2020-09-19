/** @format */

'use strict';

const inputWord = document.querySelector('.word');
const displayWord = document.querySelector('.display-word');
const scoreBox = document.querySelector('.score');
const timer = document.querySelector('.timer');
const btn = document.querySelector('.btn');

const GAME_TIME = 3;
const GAME_SCORE = 0;

let time = GAME_TIME;
let score = GAME_SCORE;
let isPlaying = false;
let timeInterval = 0;
let checkInterval = 0;
let words = [];

init();

function init() {
  getWord();
  inputWord.addEventListener('input', checkWord);
  inputWord.disabled = true;
  isPlaying = true;
}

function run() {
  if (!isPlaying) {
    return;
  } else {
    time = GAME_TIME;
    isPlaying = true;
    inputWord.disabled = false;
    inputWord.focus();
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkState, 50);
  }
}

function checkWord() {
  if (inputWord.value.toLowerCase() === displayWord.innerHTML.toLowerCase()) {
    inputWord.value = '';
    if (!isPlaying) {
      return;
    }
    score++;
    scoreBox.innerHTML = score;
    time = GAME_TIME;
    const ramdomIndex = Math.floor(Math.random() * words.length);
    displayWord.innerHTML = words[ramdomIndex];
  } else {
  }
}

function getWord() {
  words = ['위코드', '14기', '10월19일', '시작합니다'];
  buttonChange('게임 시작');
}

function buttonChange(text) {
  console.log(text);
  btn.innerHTML = text;
  text === '게임 시작' ? btn.classList.remove('btn-loading') : btn.classList.add('btn-loading');
}

function checkState() {
  console.log(`${time}, ${isPlaying}`);
  if (!isPlaying && time === 0) {
    buttonChange('게임 종료');
    clearInterval(checkInterval);
    inputWord.disabled = true;
  }
}

function countDown() {
  timer.innerHTML = time;
  time > 0 ? time-- : (isPlaying = false);
  if (!isPlaying) {
    time = 0;
    clearInterval(timeInterval);
  }
}

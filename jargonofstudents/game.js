/** @format */

'use strict';

// 유저 입력 객체
const inputWord = document.querySelector('.word');
const screen = document.querySelector('.game-screen');
const correctBoard = document.querySelector('.correct');
const wrongBoard = document.querySelector('.wrong');
const accuracyBoard = document.querySelector('.acc');
const scoreBoard = document.querySelector('.scoreboard');
const timer = document.querySelector('.about-time');

// 상수
const TIME_COUNT_DOWN = 1000;
const TIME_ZERO = 0;
const LV_ONE_WORDS = 30;
const WORD_SCORE = 10;

// 변수
let time = 3;
let score = 0;
let correctNum = 0;
let wrongNum = 0;
let accuracy = 0;

let isPlaying = false;
let timeInterval = 0;
let moveInterval = 0;
let words = [];
let word_div = [];
let speed = [];
let positionChangeValue = 2;
let enterPressed = 0;

//초기화
init();

//게임 세팅
function init() {
  getWords();
  arrangeWords(LV_ONE_WORDS);
  run();
}

// 게임 시작
function run() {
  isPlaying = changeStatus(isPlaying);
  inputWord.focus();
  timeInterval = setInterval(countDown, TIME_COUNT_DOWN);
  moveDiv();

  // inputWord.addEventListener('keydown', (event) => {
  //   wordCheckListner(event);
  // });

  inputWord.addEventListener('keypress', (event) => {
    let keyCode = event.keyCode || event.which;
    if (keyCode === 13) {
      if (enterPressed === 0) {
        enterPressed++;
        let input = inputWord.value.trim();
        if ('' === input) {
          console.log('no input');
        } else {
          inputWord.value = '';
          for (let i = 0; i < word_div.length; i++) {
            if (word_div[i].style.display !== 'none') {
              if (input === word_div[i].innerText) {
                word_div[i].style.display = 'none';
                correctNum++;
                correctBoard.innerHTML = correctNum;
                score += WORD_SCORE;
                scoreBoard.innerHTML = score;
                break;
              } else {
                // wrongNum++;
                // wrongBoard.innerHTML = wrongNum;
                // break;
              }
            }
          }
        }

        //엔터키가 두번 눌려졌을 때
      } else if (enterPressed === 1) {
        event.preventDefault();
      }
      enterPressed--;
    }
  });
}

function moveDiv() {
  let div = document.querySelectorAll('.dynamic-word-div');
  let pos = 0;

  for (let i = 0; i < div.length; i++) {
    speed[i] = Math.floor(Math.random() * 2) + 1;
  }

  let id = setInterval(frame, 100);
  function frame() {
    if (pos == 700) {
      clearInterval(id);
    } else {
      for (let i = 0; i < div.length; i++) {
        pos = div[i].style.top;
        let temp = pos.replace('px', '');
        div[i].style.top = temp++ + speed[i] + 'px';
      }
    }
  }
}

function arrangeWords(LV_ONE_WORDS) {
  for (let i = 0; i < LV_ONE_WORDS; i++) {
    let randomIndex = Math.floor(Math.random() * words.length);
    word_div[i] = document.createElement('div');
    word_div[i].innerText = words[randomIndex];
    screen.appendChild(word_div[i]);
    word_div[i].className = 'dynamic-word-div';
    word_div[i].style.fontSize = Math.floor(Math.random() * 20) + 12 + 'px';
    word_div[i].style.top = Math.floor(Math.random() * screen.clientHeight) + 'px';
    word_div[i].style.left = Math.floor(Math.random() * (screen.clientWidth - word_div[i].clientWidth)) + 'px';
  }
}

function changeStatus() {
  return isPlaying === true ? false : true;
}

function countDown() {
  timer.innerHTML = time;
  time > TIME_ZERO ? time-- : (isPlaying = false);
  if (!isPlaying) {
    time = TIME_ZERO;
    clearInterval(timeInterval);
  }
}

function getWords() {
  words = [
    '추억의',
    '베네치아',
    '게임',
    '시작합니다',
    '달콤하다',
    '쓰다',
    '맵다',
    '이름',
    '에이치티엠엘',
    '씨에스에스',
    '자바스크립트',
    '이에스식스플러스',
    '어렵다',
    '프론트엔드',
    '백엔드',
    '디장고',
    '파이썬',
    '자바',
    '스프링',
    '프레임워크',
    '데이터베이스',
    '포스트그리',
    '오라클',
    '리엑트',
    '모바일',
    '웹',
    '10월19일',
    '온라인수업은 안돼',
    '영어',
    '공부하자',
    '공부할래',
    '맥킨토시',
    '윈도우',
    '우분투',
    '터미널',
    '노션',
    '슬랙',
    '파인더',
    '크롬브라우저',
    '파이어복스브라우저',
    '사파리',
    '애플스토어',
    '안드로이드',
    '아이오에스',
    '스프링부트',
    '나이',
    '이력서',
    '면접',
    '인턴',
    '정규직',
    '솔루션',
    '대기업',
    '스타트업',
    '중소기업',
    '마음',
    '아름다운',
    '물의도시',
    '베니스',
    '이탈리아',
    '화려했던',
    '뽀글뽀글',
    '블랙커피',
    '끝까지',
    '버그',
    '해결사'
  ];
}

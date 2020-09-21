/** @format */

'use strict';

const main = document.querySelector('.main');
const gameDisplay = document.querySelector('.game-display');
const inputWord = document.querySelector('.word');
const screen = document.querySelector('.game-screen');
const correctBoard = document.querySelector('.correct');
const wrongBoard = document.querySelector('.wrong');
const accuracyBoard = document.querySelector('.acc');
const scoreBoard = document.querySelector('.scoreboard');
const typingArea = document.querySelector('.typing-area');
const timer = document.querySelector('.about-time');
const gameover = document.querySelector('.game-over');
const gameover_content = document.querySelector('.game-over-content');
const lifeT = document.querySelectorAll('.livecount');
const sub_info = document.querySelector('.sub-info');
const btn_yes = document.querySelector('.gameover-yes');
const btn_no = document.querySelector('.gameover-no');

const bg = document.querySelector('.bg');
const ok = document.querySelector('.ok');
const end = document.querySelector('.end');

// 상수
const TIME_COUNT_DOWN = 1000;
const TIME_ZERO = 0;
const LV_ONE_WORDS = 50;
const WORD_SCORE = 10;
const CHECK_IS_PLAY_TIME = 10;

// 변수
let time;
let score;
let correctNum;
let wrongNum;
let accuracy;

let isPlaying = false;
let timeInterval = 0;
let moveInterval = 0;
let checkPlayInterval = 0;
let words = [];
let word_div = [];
let speed = [];
let enterPressed = 0;
let countWord = 0;
let life = 5;

//게임 세팅
function init() {
  bg.src = '';
  ok.src = '';
  end.scr = '';
  time = 20;
  score = 0;
  correctNum = 0;
  wrongNum = 0;
  accuracy = 0;

  words = [];
  word_div = [];
  main.style.display = 'none';
  gameDisplay.style.display = 'flex';
  getWords();
  initDisplay();
  arrangeWords(LV_ONE_WORDS);
  always();
  run();
}

// 게임 시작
function run() {
  bg.src = 'bg.mp3';
  bg.volume = 0.1;
  ok.volumn = 0.1;
  end.volumn = 0.1;
  isPlaying = changeStatus(isPlaying);
  console.log('run: ' + isPlaying);
  if (!isPlaying) {
    return;
  } else {
    inputWord.focus();
    timeInterval = setInterval(countDown, TIME_COUNT_DOWN);
    checkPlayInterval = setInterval(checkIsPlaying, CHECK_IS_PLAY_TIME);
    moveDiv(isPlaying);
    inputWord.addEventListener('keypress', (event) => {
      let keyCode = event.keyCode || event.which;
      if (keyCode === 13) {
        if (enterPressed === 0) {
          enterPressed++;
          let input = inputWord.value.trim();
          if ('' === input) {
            // console.log('no input');
          } else {
            inputWord.value = '';
            let compareCorrect = correctNum;
            for (let i = 0; i < word_div.length; i++) {
              if (word_div[i].offsetTop > 0 && input === word_div[i].innerText) {
                ok.src = 'ok.mp3';
                word_div[i].remove();
                correctNum++;
                correctBoard.innerText = correctNum;
                score += WORD_SCORE;
                scoreBoard.innerText = score;
                break;
              } else {
              }
            }
            if (compareCorrect === correctNum) {
              wrongNum++;
              wrongBoard.innerText = wrongNum;
            }
            accuracyBoard.innerText = ((correctNum / (correctNum + wrongNum)) * 100).toFixed(2);
          }

          //엔터키가 두번 눌려졌을 때
        } else if (enterPressed === 1) {
          event.preventDefault();
        }
        enterPressed--;
      }
    });
  }
}

function arrangeWords(LV_ONE_WORDS) {
  let tempArray = [];
  while (tempArray.length < LV_ONE_WORDS) {
    let randomIndex = Math.floor(Math.random() * words.length);
    if (tempArray.includes(words[randomIndex])) {
      continue;
    } else {
      tempArray.push(words[randomIndex]);
    }
  }
  words = tempArray;
  for (let i = 0; i < LV_ONE_WORDS; i++) {
    word_div[i] = document.createElement('div');
    word_div[i].innerText = words[i];
    screen.appendChild(word_div[i]);
    word_div[i].className = 'dynamic-word-div';
    word_div[i].style.fontSize = Math.floor(Math.random() * 20) + 14 + 'px';
    word_div[i].style.top = Math.floor(Math.random() * screen.clientHeight) - screen.clientHeight + 'px';
    if (Math.floor(word_div[i].offsetTop) > 500) {
      word_div[i].style.top = 300 + 'px';
    }
    word_div[i].style.left = Math.floor(Math.random() * (screen.clientWidth - word_div[i].clientWidth)) + 'px';
  }
}

function initDisplay() {
  correctBoard.innerText = correctNum;
  wrongBoard.innerText = wrongNum;
  accuracyBoard.innerText = accuracy;
  scoreBoard.innerText = score;
  timer.innerText = time;

  let removeDiv = document.querySelectorAll('.dynamic-word-div');
  if (0 < removeDiv.length) {
    for (let i = 0; i < removeDiv.length; i++) {
      screen.removeChild(removeDiv[i]);
    }
    word_div = [];
  }
  gameover.classList.remove('game-over-active');
  gameover_content.classList.remove('quit-game-active');
}

btn_yes.addEventListener('click', () => {
  gameover.classList.remove('game-over-active');
  gameover_content.classList.remove('quit-game-active');
  init();
});

btn_no.addEventListener('click', () => {
  gameover.classList.remove('game-over-active');
  gameover_content.classList.remove('quit-game-active');
  gameDisplay.style.display = 'none';
  main.style.display = 'flex';
  isPlaying = false;
});

function moveDiv() {
  // FIX ME::
  let word_div = document.querySelectorAll('.dynamic-word-div');
  let divLength = word_div.length;

  // 각 디브 랜덤 속도 세팅
  for (let i = 0; i < word_div.length; i++) {
    speed[i] = Math.floor(Math.random() * 8) + 2;
  }

  let checkMoveDiv = setInterval(frame, 200);
  function frame() {
    if (divLength === 0 || !isPlaying) {
      clearInterval(checkMoveDiv);
      isPlaying = false;
    } else {
      for (let i = 0; i < word_div.length; i++) {
        let divTop = word_div[i].style.top;
        let temp = divTop.replace('px', '');
        word_div[i].style.top = temp++ + speed[i] + 'px';
        if (typingArea.offsetTop + 10 <= word_div[i].offsetTop) {
          word_div[i].style.color = 'red';
          word_div[i].remove();
          life > 1 ? life-- : (isPlaying = false);
          lifeT[life].textContent = '';
          divLength--;
        }
      }
    }
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
    gameOver();
  }
}

function checkIsPlaying() {
  if (!isPlaying || life < 1) {
    // 버그 수정 코드
    bg.src = '';
    lifeT[0].textContent = '';
    gameOver();
  }
}

let pauseEnd = 0;
function gameOver() {
  pauseEnd = 0;
  if (!pauseEnd) {
    end.src = 'end.mp3';
  }
  pauseEnd = 1;
  bg.src = '';

  clearInterval(timeInterval);
  clearInterval(checkPlayInterval);
  gameover.classList.add('game-over-active');
  gameover_content.classList.add('quit-game-active');
}

function always() {
  sub_info.style.color = 'red';
  sub_info.innerHTML = '게임 시간이 다 되어, 게임 종료 후 다시 하기 기능을 수정하였습니다.';
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
    '짜다',
    '자기소개',
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
    '파이어폭스브라우저',
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
    '뽀글뽀글',
    '블랙커피',
    '끝까지',
    '버그',
    '해결사',
    '카카오톡',
    '라인',
    '네이버',
    '다음',
    '배달의 민족',
    '딜리버리히어로',
    '디스플레이',
    '플랙스',
    '그리드',
    '포지션',
    '앱솔루트',
    '패딩제로',
    '마진제로',
    '콜백함수',
    '비동기처리',
    '동기처리',
    '콜백지옥',
    '프로미스',
    '어씽크',
    '어웨이트',
    '클로져',
    '프로토타입',
    '문과출신',
    '개발자',
    '프리랜서',
    '밤샘',
    '주말출근',
    '여행',
    '자전거',
    '싹쓰리',
    '1일1깡'
  ];
}

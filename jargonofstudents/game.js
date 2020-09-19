/** @format */

'use strict';

// 유저 입력 객체
const inputWord = document.querySelector('.word');
const screen = document.querySelector('.game-screen');
const scoreboard = document.querySelector('.score');
const correctNum = document.querySelector('.num-correct');
const wrongNum = document.querySelector('.num-wrong');
const accuracy = document.querySelector('.accuracy');
const timer = document.querySelector('.about-time');

// 상수
const TIME_COUNT_DOWN = 1000;
const TIME_ZERO = 0;
const LV_ONE_WORDS = 30;

let time = 3;
let score = 0;
let isPlaying = false;
let timeInterval = 0;
let moveInterval = 0;
let words = [];
let word_div = [];
let speed = [];
let positionChangeValue = 2;

init();

function init() {
  getWords();
  arrangeWords(LV_ONE_WORDS);
  run();
}

function run() {
  isPlaying = changeStatus(isPlaying);
  inputWord.focus();
  timeInterval = setInterval(countDown, TIME_COUNT_DOWN);
  // moveInterval = setInterval(moveDiv, 10);
  moveDiv();
  inputWord.addEventListener('keydown', (event) => {
    wordCheckListner(event);
  });
}

function moveDiv() {
  let div = document.querySelectorAll('.dynamic-word-div');
  let pos = 0;

  // 각 디브가 고정 스피드를 갖을 수 있도록 하기 위한 로직.
  // 디브 배열 인덱스와 속도 배열 인덱스를 맞춰서, 속도 값을 랜덤으로 얻음.
  for (let i = 0; i < div.length; i++) {
    speed[i] = Math.floor(Math.random() * 5) + 1;
  }

  let id = setInterval(frame, 100);
  function frame() {
    if (pos == 650) {
      clearInterval(id);
    } else {
      for (let i = 0; i < div.length; i++) {
        pos = div[i].style.top;

        // 포지션 위치를 가속하려 할 때, 포지션 값의 리턴값은 스트링 (px 가 딸려옴). px 를 제거해줘야 했다.
        let temp = pos.replace('px', '');

        // 중요한 변수 - 일단 각 디브가 1px 씩 움직이는 상태에서 다시 움직여야 함.
        // temp++;

        // 첫번째 했던 방법.. 뭔가 이상함
        // let test = Math.floor(Math.random() * 1) + Math.floor(Math.random() * 14);
        // div[i].style.top = temp++ + test + 'px';

        // 두번째 했던 방법(단 frame 위에 let speed 배열 변수 만들어야 함): 하나의 디브가 내려갈 때 속도가 랜덤임
        // 각 디브가 고정 스피드를 가지되, 다른 스피드를 가지도록 하고 싶었다.
        // speed[i] = Math.floor(Math.random() * 5) + 1;
        // div[i].style.top = temp++ + speed[i] + 'px';

        div[i].style.top = temp++ + speed[i] + 'px';
      }
      // let temp1 = div[0].style.top;
      // temp1++;
      // div[0].style.top = temp1 + 'px';
    }
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

function wordCheckListner(event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  if (event.key === 'Enter') {
    let input = inputWord.value;
    if ('' === inputWord.value) {
      console.log('no input');
    } else {
      for (let i = 0; i < word_div.length; i++) {
        if (input.trim() === word_div[i].innerText.trim()) {
          if (word_div[i].style.display !== 'none') {
            word_div[i].style.display = 'none';
            break;
          }
        }
      }
      inputWord.value = '';
    }
  }
}

function checkWord(input) {}

// inputWord.addEventListener('keydown', (event) => {
//   if (event.defaultPrevented) {
//     return; // Do nothing if the event was already processed
//   }

//   if (event.key === 'Enter') {
//     if ('' != inputWord.value) {
//       let word = inputWord.value;
//     }
//   }
// });

function countDown() {
  timer.innerHTML = time;
  time > TIME_ZERO ? time-- : (isPlaying = false);
  if (!isPlaying) {
    time = TIME_ZERO;
    clearInterval(timeInterval);
  }
}

// for (let i = 0; i < lv_wordNum; i++) {
//   let div = document.createElement('div');
//   div.style.position = 'absolute';
//   div.style.border = 'solid 1px black';
//   div.innerHTML = jar1.word;
//   mainview.appendChild(div);
// }

// let allDiv = mainview.querySelectorAll('div');
// for (let i = 0; i < allDiv.length; i++) {
//   allDiv[i].className = 'word';
//   allDiv[i].style.top = setRandomPos();
//   allDiv[i].style.left = setRandomPos();
// }

// function setRandomPos() {
//   let top = Math.floor(Math.random(100) * 700);
//   return top + 'px';
// }

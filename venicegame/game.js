/** @format */

'use strict';

//============================================================================================
//============================================================================================
// HTML ELEMENT
const main = document.querySelector('.main');
const gameDisplay = document.querySelector('.game-display');
const inputWord = document.querySelector('.word');
const screen = document.querySelector('.game-screen');
const correctBoard = document.querySelector('.correct');
const wrongBoard = document.querySelector('.wrong');
const accuracyBoard = document.querySelector('.acc');
const scoreBoard = document.querySelector('.scoreboard');
const lifeBoard = document.querySelector('.livecount');
const typingArea = document.querySelector('.typing-area');
const timer = document.querySelector('.about-time');
const gameover_screen = document.querySelector('.game-over-screen');
const gameover_content = document.querySelector('.game-over-content');
const gameover_desc = document.querySelector('.gameover-desc');
const sub_info = document.querySelector('.sub-info');
const btn_yes = document.querySelector('.gameover-yes');
const btn_no = document.querySelector('.gameover-no');
const bg = document.querySelector('.bg');
const ok = document.querySelector('.ok');
const end = document.querySelector('.end');
const complete = document.querySelector('.complete');

//============================================================================================
//============================================================================================
// 상수
const TIME_COUNT_DOWN = 1000;
const CHECK_ISPLAY_TIME = 10;
const CHECK_DIV_MOVE_TIME = 200;
const GAME_TIME = 30;
const TIME_ZERO = 0;
const LV_ONE_WORDS = 50;
const WORD_SCORE = 10;
const INIT_NUM = 0;
const LIFE_COUNT = 5;
const LIFE_ZERO = 0;
const DEFAULT_DIV_SPEED = 8;
const INCREASE_DIV_SPEED = 2;
const COLOR_GREEN = 'green';
const COLOR_YELLOW = 'yellow';
const COLOR_RED = 'red';
const COLOR_BLUE = 'blue';

const POS_GREEN_LINE = '550';
const POS_YELLOW_LINE = '400';
const POS_RED_LINE = '200';
const POS_DEAD_LINE = '20';

const CHAR_PIXEL = 'px';
const CHAR_NONE = 'none';
const CHAR_FLEX = 'flex';
const LIFE_ICON = '●';
const GAMEOVER_DESC_RETRY = '게임이 종료되었습니다. 다시 하시겠습니까?';
const GAMEOVER_DESC_SUCCESS = '축하합니다..! 다음 레벨에 도전 하시겠습니까?';
const NOTICE = '게임UI가 개선되었습니다. 목숨이 다 되어 게임 종료 후 있었던 버그가 수정되었습니다.';
const TEXT_BLANK = '';
const VOL = '0.1';
const AUDIO_BG = 'bg.mp3';
const AUDIO_OK = 'ok.mp3';
const AUDIO_END = 'end.mp3';
const AUDIO_COMPLETE = 'complete.mp3';
const AUDIO_NOSOUND = '';

//============================================================================================
//============================================================================================
// 변수
let time;
let score;
let correctNum;
let wrongNum;
let accuracy;
let isPlaying = false;
let isNextLv = false;
let timeInterval = INIT_NUM;
let checkPlayInterval = INIT_NUM;
let checkMoveDiv = INIT_NUM;
let words = [];
let word_div = [];
let speed = [];
let div_speed = DEFAULT_DIV_SPEED;
let enterPressed = INIT_NUM;
let countWord = INIT_NUM;
let life = LIFE_COUNT;

//============================================================================================
//============================================================================================
// 게임 로직

// 초기화
function init() {
  // init audio
  bg.src = AUDIO_NOSOUND;
  ok.src = AUDIO_NOSOUND;
  end.scr = AUDIO_NOSOUND;
  time = GAME_TIME;
  if (!isNextLv) {
    score = INIT_NUM;
    correctNum = INIT_NUM;
    wrongNum = INIT_NUM;
    accuracy = INIT_NUM;
    life = LIFE_COUNT;
    div_speed = DEFAULT_DIV_SPEED;
  } else {
    div_speed = div_speed + INCREASE_DIV_SPEED;
  }
  inputWord.value = TEXT_BLANK;
  bg.src = AUDIO_BG;
  bg.volume = VOL;
  ok.volumn = VOL;
  end.volumn = VOL;
  complete.volumn = VOL;
  words = [];
  word_div = [];
  main.style.display = CHAR_NONE;
  gameDisplay.style.display = CHAR_FLEX;
  getWords();
  initDisplay();
  arrangeWords(LV_ONE_WORDS);
  always();
  run();
}

// 게임 시작
function run() {
  inputWord.removeAttribute('disabled', true);
  isPlaying = true;
  if (!isPlaying) {
    return;
  } else {
    inputWord.focus();
    timeInterval = setInterval(countDown, TIME_COUNT_DOWN);
    checkPlayInterval = setInterval(checkIsPlaying, CHECK_ISPLAY_TIME);
    moveDiv();
    inputWord.addEventListener('keypress', (event) => {
      let keyCode = event.keyCode || event.which;
      if (keyCode === 13) {
        if (enterPressed === 0) {
          enterPressed++;
          let input = inputWord.value.trim();
          if (TEXT_BLANK === input) {
          } else {
            inputWord.value = TEXT_BLANK;
            let compareCorrect = correctNum;
            for (let i = 0; i < word_div.length; i++) {
              if (word_div[i].offsetTop > 0 && input === word_div[i].innerText) {
                ok.src = AUDIO_OK;
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
            accuracy = ((correctNum / (correctNum + wrongNum)) * 100).toFixed(2);
            accuracyBoard.innerText = accuracy;
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
    word_div[i].style.fontSize = Math.floor(Math.random() * 20) + 14 + CHAR_PIXEL;
    word_div[i].style.top = Math.floor(Math.random() * screen.clientHeight) - screen.clientHeight + CHAR_PIXEL;
    if (Math.floor(word_div[i].offsetTop) > 500) {
      word_div[i].style.top = 300 + CHAR_PIXEL;
    }
    word_div[i].style.left = Math.floor(Math.random() * (screen.clientWidth - word_div[i].clientWidth)) + CHAR_PIXEL;
  }
}

function initDisplay() {
  correctBoard.innerText = correctNum;
  wrongBoard.innerText = wrongNum;
  accuracyBoard.innerText = accuracy;
  scoreBoard.innerText = score;
  timer.innerText = time;
  displayLife(life);
  let removeDiv = document.querySelectorAll('.dynamic-word-div');
  if (0 < removeDiv.length) {
    for (let i = 0; i < removeDiv.length; i++) {
      screen.removeChild(removeDiv[i]);
    }
    word_div = [];
  }
  gameover_screen.classList.remove('game-over-active');
  gameover_content.classList.remove('quit-game-active');
}

// lifeBoard 표시
function displayLife(lifeconut) {
  // LIFE 아이콘 표시
  lifeBoard.innerText = TEXT_BLANK;
  if (lifeconut > 0) {
    for (let i = 0; i < life; i++) {
      lifeBoard.innerText += LIFE_ICON;
    }
  }
}

// 선택 버튼 - yes
btn_yes.addEventListener('click', () => {
  if (gameover_desc.innerText === GAMEOVER_DESC_SUCCESS) {
    isNextLv = true;
  } else {
    isNextLv = false;
  }
  gameover_screen.classList.remove('game-over-active');
  gameover_content.classList.remove('quit-game-active');
  init();
});

// 선택 버튼 - no
btn_no.addEventListener('click', () => {
  gameover_screen.classList.remove('game-over-active');
  gameover_content.classList.remove('quit-game-active');
  gameDisplay.style.display = CHAR_NONE;
  main.style.display = CHAR_FLEX;
  isNextLv = false;
  isPlaying = false;
});

// word_div 움직이기
function moveDiv() {
  let word_div = document.querySelectorAll('.dynamic-word-div');

  // 각 디브 랜덤 속도 세팅
  for (let i = 0; i < word_div.length; i++) {
    speed[i] = Math.floor(Math.random() * div_speed) + 2;
  }

  checkMoveDiv = setInterval(frame, CHECK_DIV_MOVE_TIME);
  function frame() {
    if (!isPlaying) {
      // isPlaying = false;
      gameover();
    } else {
      for (let i = 0; i < word_div.length; i++) {
        let divTop = word_div[i].style.top;
        let temp = divTop.replace(CHAR_PIXEL, TEXT_BLANK);
        word_div[i].style.top = temp++ + speed[i] + CHAR_PIXEL;

        if (typingArea.offsetTop - POS_GREEN_LINE <= word_div[i].offsetTop) {
          word_div[i].style.color = COLOR_GREEN;
        }

        if (typingArea.offsetTop - POS_YELLOW_LINE <= word_div[i].offsetTop) {
          word_div[i].style.color = COLOR_YELLOW;
        }

        if (typingArea.offsetTop - POS_RED_LINE <= word_div[i].offsetTop) {
          word_div[i].style.color = COLOR_RED;
        }

        if (typingArea.offsetTop - POS_DEAD_LINE <= word_div[i].offsetTop) {
          life--;
          displayLife(life);
          if (LIFE_ZERO === life) {
            isPlaying = false;
          }
          word_div[i].remove();
        }
      }
    }
  }
}

// 게임 실행 상태 변경
function changeStatus() {
  return isPlaying === true ? false : true;
}

// 카운트다운
function countDown() {
  timer.innerHTML = time;
  time > TIME_ZERO ? time-- : (isPlaying = false);
  if (!isPlaying) {
    time = TIME_ZERO;
    gameOver();
  }
}

// 게임 실행 상태 체크
function checkIsPlaying() {
  if (!isPlaying || life < 1) {
    // 버그 수정 코드
    bg.src = AUDIO_NOSOUND;
    lifeBoard.innerText = TEXT_BLANK;
    gameOver();
  }
}

let pauseEnd = 0;
function gameOver() {
  pauseEnd = 0;
  if (!pauseEnd) {
    life > LIFE_ZERO ? (complete.src = AUDIO_COMPLETE) : (end.src = AUDIO_END);
  }
  pauseEnd = 1;
  bg.src = AUDIO_NOSOUND;
  inputWord.setAttribute('disabled', true);

  clearInterval(timeInterval);
  clearInterval(checkPlayInterval);
  clearInterval(checkMoveDiv);

  if (life > LIFE_ZERO) {
    gameover_desc.innerText = GAMEOVER_DESC_SUCCESS;
    gameover_screen.classList.add('game-over-active');
    gameover_content.classList.add('quit-game-active');
  } else {
    gameover_desc.innerText = GAMEOVER_DESC_RETRY;
    gameover_screen.classList.add('game-over-active');
    gameover_content.classList.add('quit-game-active');
  }
}

function always() {
  sub_info.style.color = COLOR_BLUE;
  sub_info.innerText = NOTICE;
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
    '크롬',
    '파이어폭스',
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

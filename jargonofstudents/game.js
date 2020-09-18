/** @format */

'use strict';

const mainview = document.querySelector('.mainView');
let count = document.querySelector('#timeout');
const lv_wordNum = 10;
let countDown = 20;
let score = 0;

class Jargon {
  constructor(word, mean, score, top, left) {
    this.word = word;
    this.mean = mean;
    this.score = score;
    this.top = top;
    this.left = left;
  }
}

let jar1 = new Jargon('세젤귀', '세상에서 제일 귀여운', '10', 0, 0);
let jar1 = new Jargon('ㅂㅂㅂㄱ', '반박불가', '10', 0, 0);
let jar1 = new Jargon('ㄱㅇㄷ', '개이득', '10', 0, 0);
let jar1 = new Jargon('ㅃㅂㅋㅌ', '빼박캔트', '10', 0, 0);
let jar1 = new Jargon('댕댕이', '멍멍이', '10', 0, 0);
let jar1 = new Jargon('할말하않', '할 말이 많지만 하지 않겠다', '10', 0, 0);
let jar1 = new Jargon('갑분싸', '갑자기 분위기 싸해짐', '10', 0, 0);
let jar1 = new Jargon('JMT', '존맛탱', '10', 0, 0);
let jar1 = new Jargon('별다줄', '별걸 다 줄인다', '10', 0, 0);
let jar1 = new Jargon('혼코노', '혼자 코인 노래방', '10', 0, 0);
let jar1 = new Jargon('커엽다', '귀엽다', '10', 0, 0);
let jar1 = new Jargon('복세편살', '복잡한 세상 편하게 살자', '10', 0, 0);
let jar1 = new Jargon('영고', '영원한 고통', '10', 0, 0);
let jar1 = new Jargon('머쓱타드', '머슥하다', '10', 0, 0);
let jar1 = new Jargon('고답', '고구마 먹은 것 처럼 답답하다', '10', 0, 0);
let jar1 = new Jargon('믿거', '믿고 거른다', '10', 0, 0);
let jar1 = new Jargon('존버', '존나 버티다', '10', 0, 0);
let jar1 = new Jargon('졌잘싸', '졌지만 잘 싸웠다', '10', 0, 0);
let jar1 = new Jargon('얼죽아', '얼어죽어도 아이스 아메리카노', '10', 0, 0);
let jar1 = new Jargon('삼귀다', '사귀다의 전 단계', '10', 0, 0);
let jar1 = new Jargon('소확행', '소소하지만 확실한 행복', '10', 0, 0);
let jar1 = new Jargon('막내온탑', '막내지만 윗사람보다 강한 면모를 보여줌', '10', 0, 0);
let jar1 = new Jargon('우유남', '우월한 유전자를 가진 남자 차은우', '10', 0, 0);
let jar1 = new Jargon('누물보', '누구 물어본 사람?', '10', 0, 0);
let jar1 = new Jargon('오저치고', '오늘 저녁 치킨 고?', '10', 0, 0);
let jar1 = new Jargon('꾸안꾸', '꾸민듯 안 꾸민듯', '10', 0, 0);
let jar1 = new Jargon('만반잘부', '만나서 반가워 잘 부탁해', '10', 0, 0);
let jar1 = new Jargon('빠태', '빠른 태새 전환', '10', 0, 0);
let jar1 = new Jargon('혼모노', '진짜가 나타났다', '10', 0, 0);
let jar1 = new Jargon('자만추', '자연스러운 만남을 추구', '10', 0, 0);
let jar1 = new Jargon('인만추', '인위적인 만남을 추구', '10', 0, 0);
let jar1 = new Jargon('최애', '최고로 애정하는', '10', 0, 0);
let jar1 = new Jargon('애빼시', '애교 빼면 시체', '10', 0, 0);
let jar1 = new Jargon('갑통알', '갑자기 통장을 보니 알바해야 할 듯', '10', 0, 0);
let jar1 = new Jargon('갑분싸', '갑자기 분위기 싸해짐', '10', 0, 0);
let jar1 = new Jargon('사바사', '사람바이사람', '10', 0, 0);
let jar1 = new Jargon('0개국어', '모국어 조차 잘 못하는 사람', '10', 0, 0);
let jar1 = new Jargon('롬곡옾높', '폭풍눈물', '10', 0, 0);

for (let i = 0; i < lv_wordNum; i++) {
  let div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.border = 'solid 1px black';
  div.innerHTML = jar1.word;
  mainview.appendChild(div);
}

let allDiv = mainview.querySelectorAll('div');
for (let i = 0; i < allDiv.length; i++) {
  allDiv[i].className = 'word';
  allDiv[i].style.top = setRandomPos();
  allDiv[i].style.left = setRandomPos();
}

function setRandomPos() {
  let top = Math.floor(Math.random(100) * 700);
  return top + 'px';
}

document.querySelector('.input-word').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    let input = this.value;
    this.value = '';
    Array.from(document.querySelectorAll('.word')).forEach(function (div) {
      if (input === div.textContent) {
        div.style.display = 'none';
      }
    });
  }
});

var x = setInterval(function () {
  if (countDown === 0) {
    clearInterval(x);
    count.innerHTML = 'GAME OVER';
  } else {
    countDown = countDown - 1;
    count.innerHTML = countDown;
  }
}, 1000);

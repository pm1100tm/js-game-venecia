/** @format */

'use strict';

const mainview = document.querySelector('.mainView');

const lv_wordNum = 10;
let countDown = 20;
let score = 0;

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

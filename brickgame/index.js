/** @format */

// 캔버스 엘리먼트 참조 변수
const canvas = document.getElementById('canvas');

// 실질적으로 캔버스를 그리기 위한 2d rendering context 를 ctx 변수에 저장
const ctx = canvas.getContext('2d');

// 원의 초기 위치 x, y 값
let x = canvas.clientWidth / 2;
let y = canvas.clientHeight - 30;

// 원의 이동할 값 dx, dy
let dx = 2;
let dy = -2;

// 공 그리기 메서드
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  // 캔버스의 내용을 지워는 메서드 clearPath() 4개의 파라미터.
  // 직사각형 캔버스의 좌상단 모서리 (x, y), 우하단 모서리 (canvas width, height)
  // 지정한 영역 안에 있는 것들은 전부 지워지게 됨.
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  drawBall();
  x += dx;
  y += dy;
}

// JavaScript 타이밍 함수인
// setInterval()나 requestAnimationFrame()를 이용하면
// 함수를 몇번이고 계속 반복해서 실행할 수 있습니다..
setInterval(draw, 10);

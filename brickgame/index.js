/** @format */

// 캔버스 엘리먼트 참조 변수
const canvas = document.getElementById('canvas');

// 실질적으로 캔버스를 그리기 위한 2d rendering context 를 ctx 변수에 저장
const ctx = canvas.getContext('2d');

// 캔버스 상단 left, top 초기값
const canvasLT = 0;

// ============================================================================================================
// ============================================================================================================
// 공의 반지름
const radius = 10;

// 공 초기 위치 x, y 값
let x = canvas.clientWidth / 2;
let y = canvas.clientHeight - 30;

// 공 이동할 값 dx, dy
let dx = 3;
let dy = -3;

// 공 그리기 메서드
function drawBall() {
  ctx.beginPath();
  // 원의 중심 (x=0, y=0), 반지름 (radius=10), 시작 각도 - 끝 각도 (원을 그릴 때 시작과 끝이 되는 각도, 라디안 값)
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

// ============================================================================================================
// ============================================================================================================
// 상단 블럭 변수 설정
// 줄 3, 칸 5
let blockRow = 4;
let blockCol = 7;

// 각 블럭의 width, height
let blockWidth = 80;
let blockHeight = 20;

// 블럭 배치 간격
let blockPadding = 10;

// 블럭 오브젝트의 top, left
let blockOffsetTop = 30;
let blockOffsetLeft = 30;

// 블럭 배열 변수
let block = null;

// 블럭 그리기
function drawBlock() {
  block = Array.from(Array(blockRow), () => new Array(blockCol));
  for (let i = 0; i < blockRow; i++) {
    for (let j = 0; j < blockCol; j++) {
      let blockX = j * (blockWidth + blockPadding) + blockOffsetLeft;
      let blockY = i * (blockHeight + blockPadding) + blockOffsetTop;
      block[i][j] = { x: blockX, y: blockY };
      ctx.beginPath();
      ctx.rect(blockX, blockY, blockWidth, blockHeight);
      ctx.fillStyle = '#0095DD';
      ctx.fill();
      ctx.closePath();
    }
  }
}

// ============================================================================================================
// ============================================================================================================
// 하단 블럭 width, height
let barWidth = 100;
let barHeight = 14;

// 하단 블럭 초기 위치 값 rx, ry
let barX = canvas.clientWidth / 2 - barWidth / 2;
let barY = canvas.clientHeight - barHeight * 2;

// 하단 블럭 이동 속도
let dBarX = 2;

// 하단 블럭 그리기 메서드
function drawBar() {
  ctx.beginPath();
  ctx.rect(barX, barY, barWidth, barHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

// 하단 블럭 이동하기 위한 리스터 이벤트, 변수
let leftPressed = false;
let rightPressed = false;
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(event) {
  if (event.keyCode === 37) {
    leftPressed = true;
  } else if (event.keyCode === 39) {
    rightPressed = true;
  } else {
  }
}

function keyUpHandler(event) {
  if (event.keyCode === 37) {
    leftPressed = false;
  } else if (event.keyCode === 39) {
    rightPressed = false;
  } else {
    // do nothing
  }
}

// 하단 블럭 이동 메서드
const barMoveMin = canvasLT + 10;
const barMoveMax = canvas.clientWidth - (barWidth + 10);
function moveBar() {
  if (leftPressed && barX >= barMoveMin) {
    barX -= dBarX * 2;
  } else {
    //do nothing
  }
  if (rightPressed && barX <= barMoveMax) {
    barX += dBarX * 2;
  } else {
    // do nothing
  }
}

// ============================================================================================================
// ============================================================================================================
// 충돌 기준 값
let wallLeft = 0 + radius;
let wallRight = canvas.clientWidth - radius;
let wallTop = 0 + radius;
let wallBottom = canvas.clientHeight - radius;

function detectWall(x, y) {
  // 공이 캔버스 양옆에 에 충돌되었을 때
  if (x <= wallLeft || x >= wallRight) {
    dx = dx * -1;
  }
  // 공이 캔버스 위에 충돌했을 때
  if (y <= wallTop) {
    dy = dy * -1;
  } else {
    if (y >= barY) {
      if (x >= barX && x <= barX + barWidth) {
        dy = dy * -1;
      }
      if (y >= wallBottom) {
        alert('asdf');
      }
    }
  }
}

// ============================================================================================================
// ============================================================================================================
// 다음 프레임 전에 캔버스 지우기
function draw() {
  // 캔버스의 내용을 지우는 메서드 clearPath() 4개의 파라미터.
  // 직사각형 캔버스의 좌상단 모서리 (x, y), 우하단 모서리 (canvas width, height)
  // 지정한 영역 안에 있는 것들은 전부 지워지게 됨.
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  drawBall();
  drawBar();
  drawBlock();

  x += dx;
  y += dy;

  moveBar();
  detectWall(x, y);
}

// JavaScript 타이밍 함수인
// setInterval()나 requestAnimationFrame()를 이용하면
// 함수를 몇번이고 계속 반복해서 실행할 수 있습니다..
setInterval(draw, 10);

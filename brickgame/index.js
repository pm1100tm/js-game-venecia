/** @format */

// 캔버스 엘리먼트 참조 변수
const canvas = document.getElementById('canvas');

// 실질적으로 캔버스를 그리기 위한 2d rendering context 를 ctx 변수에 저장
const ctx = canvas.getContext('2d');

// 캔버스에 빨간색 사각형 그리기
// beginPath() 와 closePath() 사이에 모든 명령어가 들어간다.
// rect : 인자 left, top, width, height
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = '#FF0000';
ctx.fill();
ctx.closePath();

// 캔버스에 사각형 그리기
ctx.beginPath();
// arc - 인자 : 원의 중심 x, y, 원읜 반지름, 시작 각도와 끝, 그리는 방향(true: 반시계)
ctx.arc(240, 160, 20, Math.PI * 2, false);
ctx.fillStyle = 'green';
ctx.fill();
ctx.closePath();

// 캔버스에 테두리만 있는 사각형 그리기
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
ctx.stroke();
ctx.closePath();


let startBtn = document.getElementById('startBtn');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

const balls = [];

for (let i = 1; i <= 3; i++) {
    balls.push(createBall())
}

function createBall() {
    return {
        ballRadius: 20,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        isClicked: false
    }
}

canvas.addEventListener('click', function (event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    const distance = Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2);
console.log(distance <= ball.ballRadius)

        if (distance <= ball.ballRadius) {
            ball.isClicked = true;
            break;
        }
    }
})

startBtn.addEventListener('click',function(){
    balls.forEach((ball)=>{
        ball.isClicked = false;
    })
})

function drawBall(ball) {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.ballRadius, 0, Math.PI * 2);
    context.fillStyle = ball.color;
    context.fill();
    context.closePath();
}


function moveBall(ball) {
    if (!ball.isClicked) {
        if (ball.x + ball.dx > canvas.width - ball.ballRadius || ball.x + ball.dx < ball.ballRadius) {
            ball.dx = -ball.dx
        }
        if (ball.y + ball.dy > canvas.height - ball.ballRadius || ball.y + ball.dy < ball.ballRadius) {
            ball.dy = -ball.dy
        }

        ball.x += ball.dx;
        ball.y += ball.dy;
    }
}

let animationId;
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
        drawBall(balls[i]);
        moveBall(balls[i])
    }
    animationId = requestAnimationFrame(animate)
}

animate();
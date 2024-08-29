document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gamecanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 400;

    const paddleWidth = 10;
    const paddleHeight = 100;
    let leftPaddleY = (canvas.height - paddleHeight) / 2;
    let rightPaddleY = (canvas.height - paddleHeight) / 2;
    
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballRadius = 8.5;
    let ballSpeedX = 10;
    let ballSpeedY = 10;
    
    let paddleSpeed = 10;
    let leftPaddleDirection = 0;

    // Add score variables
    let leftScore = 0;
    let rightScore = 0;
    
    function drawPaddles() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
        ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
    }
    
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
    }
    
    function moveBall() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;


        // AI behavior for the ball
        if (Math.random() < 0.05) { // 5% chance to change direction
            ballSpeedY = (Math.random() - 0.2) * 15; // Random Y speed between -7.5 and 7.5
        }

        // Avoid getting stuck in a horizontal pattern
        if (Math.abs(ballSpeedY) < 2) {
            ballSpeedY += (Math.random() - 0.5) * 3;
        }

        // Increase speed slightly over time
        const speedIncrease = 0.001;
        ballSpeedX += ballSpeedX > 0 ? speedIncrease : -speedIncrease;
        ballSpeedY += ballSpeedY > 0 ? speedIncrease : -speedIncrease;

        // Existing collision detection logic
        if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
            ballSpeedY = -ballSpeedY;
        }


        if (ballX + ballRadius > canvas.width - paddleWidth) {
            if (ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
                ballSpeedX = -ballSpeedX;
                ballSpeedY += (Math.random() - 0.5) * 5; // Add some randomness after paddle hit
            } else {

                leftScore++;
                resetBall();
            }
        }


        if (ballX - ballRadius < paddleWidth) {
            if (ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
                ballSpeedX = -ballSpeedX;
                ballSpeedY += (Math.random() - 0.5) * 5; // Add some randomness after paddle hit
            } else {

                rightScore++;
                resetBall();
            }
        }
    }
    
    function resetBall() {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }

    function movePaddle() {
        leftPaddleY += leftPaddleDirection * 1 * paddleSpeed;
        
        if (leftPaddleY < 0) {
            leftPaddleY = 0;
        }
        if (leftPaddleY + paddleHeight > canvas.height) {
            leftPaddleY = canvas.height - paddleHeight;
        }
    }

    function moveAIPaddle() {
        const paddleCenter = rightPaddleY + paddleHeight / 2;
        
        // Predict the ball's future position by estimating where it will be when it reaches the AI paddle
        let predictedBallY = ballY + (ballSpeedY / ballSpeedX) * (canvas.width - paddleWidth - ballX);
    
        // Add slight randomness to avoid making the AI too perfect
        const randomOffset = Math.random() * 20 - 10; // Random value between -10 and 10
        const adjustedTargetY = predictedBallY + randomOffset;
    
        // Adjust AI speed based on distance to the ball
        const distanceToTarget = Math.abs(adjustedTargetY - paddleCenter);
        let aiSpeed = Math.min(paddleSpeed, distanceToTarget * 0.9); // AI moves faster if the ball is far away
    
        if (paddleCenter < adjustedTargetY - 20) {
            rightPaddleY += aiSpeed;
        } else if (paddleCenter > adjustedTargetY + 20) {
            rightPaddleY -= aiSpeed;
        }
    
        // Ensure the AI paddle stays within the canvas boundaries
        if (rightPaddleY < 0) {
            rightPaddleY = 0;
        }
        if (rightPaddleY + paddleHeight > canvas.height) {
            rightPaddleY = canvas.height - paddleHeight;
        }
    }
    

    // Add function to draw scores
    function drawScores() {
        ctx.fillStyle = 'yellow';
        ctx.font = '35px Bold';
        ctx.textAlign = 'center';
        ctx.fillText(leftScore, canvas.width / 4, 30);
        ctx.fillText(rightScore, 3 * canvas.width / 4, 30);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            leftPaddleDirection = -1;
        } else if (e.key === 'ArrowDown') {
            leftPaddleDirection = 1;
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            leftPaddleDirection = 0;
        }
    });

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        movePaddle();
        moveAIPaddle();
        drawPaddles();
        drawBall();
        moveBall();
        drawScores(); // Add this line to draw scores
        requestAnimationFrame(update);
    }

    update();
});
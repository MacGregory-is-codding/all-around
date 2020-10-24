'use strict'

let canvas = document.getElementById('canvas-id');
let ctx = canvas.getContext('2d');

let gameBG = new Image();
gameBG.src = 'assets/img/bg__game.jpg';

let circle = new Image();
circle.src = 'assets/img/circle.png';
let circleX = 100;
let circleY = 180;
let position = 'middle';
let status = "on";

let audio = new Audio();
audio.src = "assets/music/foster.mp3";
audio.play();

let bullets = [];

let bullet = new Image();
bullet.src = 'assets/img/bullet.png';

let polygonalEnemy = new Image();
polygonalEnemy.src = 'assets/img/polygonal.png';
let squareEnemy = new Image();
squareEnemy.src = 'assets/img/square.png';
let rectangleEnemy = new Image();
rectangleEnemy.src = 'assets/img/rectangle.png';

let enemyTypesArray = [
    polygonalEnemy,
    squareEnemy,
    rectangleEnemy,
];

let enemies = [];

let deadCounter = 45;

const startButton = document.getElementById('start-button'),
      startImage  = document.getElementById('start-image');
      
startButton.onclick = () => {
    startButton.style.display = 'none';
    startImage.parentNode.removeChild(startImage);
    canvas.style.display = 'inherit';

    //showIntro();
    startGame();
}

async function startGame() {
    await showIntro(); 
    document.addEventListener('keydown', move);
    draw();
}

function draw() {
    if (deadCounter >= 50) {
        showEnding();
    } else if (status == 'dead')
        {
            showBadEnding();
        } else {
        ctx.drawImage(gameBG, 0, 0, 1000, 500);
        ctx.drawImage(circle, circleX, circleY);

        ctx.fillStyle = "#00F";
        ctx.strokeStyle = "#F00";
        ctx.font = "italic 24pt Arial";
        ctx.fillText(`Убито: ${deadCounter}`, 10, 40);

        bullets.forEach(b => {
            if (b.status !== 'off') {
                ctx.drawImage(bullet, b.xpos, b.ypos);
                b.xpos += 3;
                if (b.xpos > 1000) b.status = 'off';
            }
        });

        enemies.forEach(e => {
            if (e.status !== 'off') {
                ctx.drawImage(e.type, e.xpos, e.ypos);
                e.xpos -= 7;
            }
            if (e.xpos < 300) {
                status = 'dead';
            }
        });

        if (getRandomInt(1000) > 988) {
            enemies.push({type: enemyTypesArray[getRandomInt(3)], ypos: [20, 180, 340][getRandomInt(3)] + 20, xpos: 1100, status: 'on'});
        } 

        enemies.forEach(e => {
            bullets.forEach(b => {
                if (b.xpos >= e.xpos && b.status != 'off' && e.status != 'off') {
                    if ((b.pos == 'up'    && e.ypos == 40)  ||
                        (b.pos == 'middle' && e.ypos == 200) ||
                        (b.pos == 'bottom' && e.ypos == 360)) {
                            b.status = 'off';
                            e.status = 'off';
                            deadCounter++;
                            let dead = new Audio();
                            dead.src = 'assets/music/dead.mp3';
                        }
                }
            })
        })
           
        requestAnimationFrame(draw);
    }
}

function move(e) {
    switch (e.keyCode) {
        case 17: 
            shoot();
            break;
        case 38:
            moveUp();
            break;
        case 40:
            moveDown();
            break;
    }
}

function moveUp() {
    switch (position) {
        case 'up':
            break;
        case 'middle':
            position = 'up';
            circleY = 20;
            break;
        case 'bottom':
            position = 'middle'
            circleY = 180;
            break;
    }
}

function moveDown() {
    switch (position) {
        case 'up':
            position = 'middle';
            circleY = 180;
            break;
        case 'middle':
            position = 'bottom';
            circleY = 340;
            break;
        case 'bottom':
            break;
    }
}

function shoot() {
    bullets.push({ypos: circleY + 60, xpos: circleX + 220, pos: position, status: 'on'});
    let shoot = new Audio();
    shoot.src = 'assets/music/shoot.mp3';
    shoot.play();
}

async function showIntro() {
    let image = new Image();

    enableMusic('main');

    await sleep(1500);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/phrase1.jpg";

    await sleep(5000);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/phrase2.jpg";

    await sleep(5000);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/phrase3.jpg";

    await sleep(4000);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/phrase4.jpg";
    
    await sleep(4000);
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/phrase5.jpg";
    
    await sleep(5000);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
} 

function showBadEnding() {
    let image = new Image();
    image.onload = () => {
    ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/gameover.jpg";
}

async function showEnding() {

    document.removeEventListener('keydown', move);

    let image = new Image();
    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/end1.jpg";

    await sleep(3000);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/end2.jpg";

    await sleep(3000);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/end3.jpg";

    await sleep(7000);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/end4.jpg";

    document.addEventListener('keydown', chooseEnding);
}

async function showBelieveEnding() {
    let image = new Image();
    
    enableMusic('sos');

    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/b1.jpg";

    await sleep(3000);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/b2.jpg";

    await sleep(3000);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/b3.jpg";

    await sleep(3000);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/b4.jpg";

    await sleep(3000);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/b5.jpg";

    await sleep(3000);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/b6.jpg";

    await sleep(3000);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/b7.jpg";

    await sleep(3000);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/b8.jpg";

    await sleep(3000);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/b9.jpg";

    await sleep(3000);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/b10.jpg";

    enableMusic('com');

    await sleep(3000);
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/titles1.jpg";

    await sleep(3000);
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/titles2.jpg";
}

async function showUnbelieveEnding() {
    
    enableMusic('un');

    let image = new Image();
    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/un1.jpg";

    await sleep(3000);    
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/un2.jpg";

    await sleep(3000);
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/titles1.jpg";

    await sleep(3000);
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/img/titles2.jpg";
}

function chooseEnding(e) {
    switch(e.keyCode) {
        case 38: 
            showBelieveEnding();
            break;
        case 40: 
            showUnbelieveEnding();
            break;
    }
    document.removeEventListener('keydown', chooseEnding);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function enableMusic(name) {
    audio.pause();
    audio.src = `assets/music/${name}.mp3`;
    audio.play(); 
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
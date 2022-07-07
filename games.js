const canvas = document.getElementById('myCanvas1')
const context = canvas.getContext('2d')
canvas.width = 600;
canvas.height = 600;

const canvas2 = document.getElementById('myCanvas2')
const context2 = canvas2.getContext('2d')
canvas2.width = 600;
canvas2.height = 600;

const canvas3 = document.getElementById('myCanvas3')
const context3 = canvas3.getContext('2d')
canvas3.width = 600;
canvas3.height = 600;

const canvas4 = document.getElementById('myCanvas4')
const context4 = canvas4.getContext('2d')
canvas4.width = 600;
canvas4.height = 600;

const canvas5 = document.getElementById('myCanvas5')
const context5 = canvas4.getContext('2d')
canvas5.width = 600;
canvas5.height = 600;

// global variables
const grid = 80;
let keys = [];
let score = 0;
let collisionsCount = 0;
let frame = 0;
let gameSpeed = 1;
let safe = false;

const particlesArray = [];
const maxParticles = 300;
const ripplesArray = [];
const carsArray = [];
const logsArray = [];

//image
const background_lv2 = new Image();
background_lv2.src = 'foto/background_lvl2.png';

const grass = new Image();
grass.src = "foto/grass.png";

const collisions = new Image()
collisions.src = 'foto/collisions.png';

const turtles = new Image();
turtles.src = 'foto/turtles.png';

const log = new Image();
log.src = 'foto/log.png';

const car = new Image();
car.src = 'foto/cars.png';
let numerOfCars = 3;

const froggerSprite = new Image();
froggerSprite.src = 'foto/frog_spritesheet.png';


const gameOver = new Image();
gameOver.src = 'foto/gameover.png';

class Character {
    constructor() {
        this.spriteWidth = 220;
        this.spriteHeight = 250;
        this.width = this.spriteWidth / 5;
        this.height = this.spriteHeight / 5;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 40;
        this.moving = false;
        this.frameX = 0;
        this.frameY = 0;
    }

    update() {
        // console.log('update');
        if (Object.keys[38]) {//up
            if (this.moving === false) {//this.y > this.height &&
                this.y -= grid;
                this.moving = true;
                this.frameX = 1;
                this.frameY = 0;
            }
        }
        if (Object.keys[40]) {//down
            if (this.y < canvas.height - this.height * 2 && this.moving === false) {
                this.y += grid;
                this.moving = true;
                this.frameY = 3;
            }
        }
        if (Object.keys[37]) {//left
            if (this.moving === false && this.x > this.width) {
                this.x -= grid;
                this.moving = true;
                this.frameY = 2;
            }
        }
        if (Object.keys[39]) {//right
            if (this.moving === false && this.x < canvas.width - this.width * 2) {
                this.x += grid;
                this.moving = true;
                this.frameY = 1;
            }
        }
        if (this.y < 0) scored()
    }

    draw() {
        context3.drawImage(froggerSprite, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - 25, this.y - 25, this.width, this.height * 2);
    }

    jump() {
        if (this.moving === false) {
            this.frameX = 1;
        } else if (this.frameX === 1) {
            this.frameX = 0;
        }
    }
}

const
    character = new Character();


function

animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context2.clearRect(0, 0, canvas.width, canvas.height);
    context3.clearRect(0, 0, canvas.width, canvas.height);
    context4.clearRect(0, 0, canvas.width, canvas.height);
    handleRipples();
    context2.drawImage(background_lv2, 0, 0, canvas.width, canvas.height);
    handleParticles();
    character.draw();
    character.update();
    handleObstacles();
    handleScoreBoard();
    context4.drawImage(grass, 0, 0, canvas.width, canvas.height);
    frame++;
    requestAnimationFrame(animate);
}

animate()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// event listeners
window.addEventListener('keydown', function (e) {
        keys = [];
        Object.keys[e.keyCode] = true;
        if (Object.keys[37] || Object.keys[38] || Object.keys[39] || Object.keys[40]) {
            character.jump();
        }
        if (Object.keys[32]) {//reset game
            collisionsCount--;
            resetGame()


        }

    }
)
;

window.addEventListener(
    'keyup', function (e) {
        delete Object.keys[e.keyCode];
        character.moving = false;
        character.frameX = 0;
    }
);

async function scored() {
    score++;
    gameSpeed += 0.05;
    character.x = canvas.width / 2 - character.width / 2;
    character.y = canvas.height - character.height - 40;
    document.querySelector("#displayText").style.display = "flex";
    document.querySelector("#displayText").innerHTML = "You win!Score is " + score;
    await sleep(1200)
    document.querySelector("#displayText").innerHTML = "  ";


}

function handleScoreBoard() {
    context4.fillStyle = 'black';
    context4.stokeStyle = 'black';
    context4.font = '15px Verdana';
    context4.strokeText('Score', 265, 15);
    context4.font = '60px Verdana';
    context4.fillText(score, 270, 65);
    context4.font = '15px Verdana';
    context4.strokeText('Game Speed: ' + gameSpeed.toFixed(1), 10, 195);
}

function collision(first, second) {
    return !(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y);

}

function resetGame() {
    character.x = canvas.width / 2 - character.width / 2;
    character.y = canvas.height - character.height - 40;
    score = 0;
    gameSpeed = 1;
}


class Obstacle {
    constructor(x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
        this.frameX = 0;
        this.frameY = 0;
        this.randomise = Math.floor(Math.random() * 30 + 30);
        this.carType = (Math.floor(Math.random() * numerOfCars));
    }

    draw() {
        if (this.type === 'turtle') {
            if (frame % this.randomise === 0) {
                if (this.frameX >= 1) this.frameX = 0;
                else this.frameX++;

            }
            context.drawImage(turtles, this.frameX * 70, this.frameY * 70, 70, 70, this.x, this.y, this.width, this.height)
            ;
        } else if (this.type === 'log') {
            context.drawImage(log, this.x, this.y, this.width, this.height)
        } else {
            context2.drawImage(car, this.frameX * this.width, this.carType * this.height, grid * 2, grid, this.x, this.y, this.width, this.height);
        }
    }

    update() {
        this.x += this.speed * gameSpeed;
        if (this.speed > 0) {
            if (this.x > canvas.width + this.width) {
                this.x = 0 - this.width
                this.carType = (Math.floor(Math.random() * numerOfCars));
            }
        } else {
            this.frameX = 1;

            if (this.x < 0 - this.width) {
                this.x = canvas.width + this.width;
                this.carType = (Math.floor(Math.random() * numerOfCars));
            }
        }
    }
}

function initObstacles() {
    for (let i = 0; i < 2; i++) {
        let x = i * 350;
        carsArray.push(new Obstacle(x, canvas.height - grid * 2 - 20, grid * 2, grid, 1, 'car'));
    }
    for (let i = 0; i < 2; i++) {
        let x = i * 300;
        carsArray.push(new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2, grid, -2, 'car'));
    }
    for (let i = 0; i < 2; i++) {
        let x = i * 400;
        carsArray.push(new Obstacle(x, canvas.height - grid * 4 - 20, grid * 2, grid, 2, 'car'));
    }
    for (let i = 0; i < 2; i++) {
        let x = i * 400;
        logsArray.push(new Obstacle(x, canvas.height - grid * 5 - 20, grid * 2, grid, -2, 'log'));
    }
    for (let i = 0; i < 3; i++) {
        let x = i * 200;
        logsArray.push(new Obstacle(x, canvas.height - grid * 6 - 20, grid, grid, 1, 'turtle'));
    }
}

initObstacles();

async function handleObstacles() {
    for (let i = 0; i < carsArray.length; i++) {
        carsArray[i].update();
        carsArray[i].draw();


    }
    for (let i = 0; i < logsArray.length; i++) {
        logsArray[i].update();
        logsArray[i].draw();
    }
    //collision with car
    for (let i = 0; i < logsArray.length; i++) {
        if (collision(character, carsArray[i])) {
            context4.drawImage(collisions, 0, 100, 100, 100, character.x, character.y, 50, 50);
            document.querySelector("#displayText").style.display = "flex";
            document.querySelector("#displayText").innerHTML = "You Lose!Reset in 5 seconds";
            await sleep(2000)
            document.querySelector("#displayText").innerHTML = "  ";
            resetGame()

        }
    }
}


handleObstacles()


class Particle {
    constructor(x, y) {
        this.x = x + 25;
        this.y = y + 25;
        this.radius = Math.random() * 20 + 1;
        this.opacity = 1;
        this.directionX = Math.random() - 0.5;
        this.directionY = Math.random() - 0.5;
    }

    draw() {
        context3.fillStyle = 'rgba(150,150,150,' + this.opacity + ')';
        context3.beginPath();
        context3.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context3.fill();
        context3.closePath();
    }

    update() {
        this.x += this.directionX;
        this.y += this.directionY;
        if (this.opacity > 0.1) {
            this.opacity -= 0.9;
        }
        if (this.radius > 0.15) {
            this.radius -= 0.14;
        }
    }

    ripple() {
        if (this.radius < 50) {
            this.radius += 0.7;
            this.x -= 0.03;
            this.y -= 0.03;
        }
        if (this.opacity > 0) {
            this.opacity -= 0.02;
        }
    }

    drawRipple() {
        context.strokeStyle = 'rgba(255,255,255,' + this.opacity + ')';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.stroke();
        context.closePath();
    }

}

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

    }
    if (particlesArray.length > maxParticles) {
        for (let i = 0; i < 30; i++) {
            particlesArray.pop();
        }
    }
    if ((Object.keys[37] || Object.keys[38] || Object.keys[39] || Object.keys[40]) && character.y > 250 && particlesArray.length < maxParticles + 10) {
        for (let i = 0; i < 10; i++) {
            particlesArray.unshift(new Particle(character.x, character.y));
        }
    }
}

async function handleRipples() {
    for (let i = 0; i < ripplesArray.length; i++) {
        ripplesArray[i].ripple();
        ripplesArray[i].drawRipple();

    }
    if (ripplesArray.length > 20) {
        for (let i = 0; i < 2; i++) {
            ripplesArray.pop();
        }
    }
    if ((Object.keys[37] || Object.keys[38] || Object.keys[39] || Object.keys[40]) && character.y > 250 && character.y > 100) {
        for (let i = 0; i < 20; i++) {
            ripplesArray.unshift(new Particle(character.x, character.y));
        }
    }
    if (character.y < 250 && character.y > 100) {
        safe = false;
        for (let i = 0; i < logsArray.length; i++) {
            if (collision(character, logsArray[i])) {
                character.x += logsArray[i].speed;
                safe = true;
            }
        }
        if (!safe) {
            for (let i = 0; i < 30; i++) {
                ripplesArray.unshift(new Particle(character.x, character.y))
            }
            document.querySelector("#displayText").innerHTML = "You Lose!Reset in 5 seconds";
            await sleep(5000)
            document.querySelector("#displayText").innerHTML = "  ";
            resetGame();
        }

    }
}

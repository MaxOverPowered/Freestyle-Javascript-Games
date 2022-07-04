const canvas = document.getElementById('myCanvas1')
const context = canvas.getContext('2d')
canvas.width = 600;
canvas.height = 500;

const canvas2 = document.getElementById('myCanvas2')
const context2 = canvas.getContext('2d')
canvas2.width = 600;
canvas2.height = 500;

const canvas3 = document.getElementById('myCanvas3')
const context3 = canvas.getContext('2d')
canvas3.width = 600;
canvas3.height = 500;

// global variables
const grid = 80;
let keys = [];
let score = 0;
let collisionsCount = 0;
let frame = 0;
let gameSpeed = 1;

const particlesArray = [];
const maxParticles = 300;
const ripplesArray = [];
const carsArray = [];
const logsArray = [];

class Character {
    constructor() {
        this.spriteWidth = 220;
        this.spriteHeight = 250;
        this.width = this.spriteWidth / 5;
        this.height = this.spriteHeight / 5;
        this.x = canvas.width / 2 - this.width / 2
        this.y = canvas.height - this.height - 40;
        this.moving = false
        this.frameX = 0;
        this.frameY = 0;
    }

    update() {
        // console.log('update');
        if (Object.keys[38]) {//up
            if (this.y > this.height && this.moving === false) {
                this.y -= grid;
                this.moving = true;
            }
        }
        if (Object.keys[40]) {//down
            if (this.y < canvas.height - this.height * 2 && this.moving === false) {
                this.y += grid;
                this.moving = true;
            }
        }
        if (Object.keys[37]) {//left
            if (this.moving === false && this.x > this.width) {
                this.x -= grid;
                this.moving = true;
            }
        }
        if (Object.keys[39]) {//right
            if (this.moving === false && this.x < canvas.width - this.width * 2) {
                this.x += grid;
                this.moving = true;
            }
        }
    }

    draw() {
        context3.fillStyle = 'yellow';
        context3.fillRect(this.x, this.y, this.width, this.height);
    }

    jump() {
        console.log('jump')
    }
}

const
    character = new Character();


function

animate() {
    context3.clearRect(0, 0, canvas.width, canvas.height);
    character.draw();
    character.update();
    requestAnimationFrame(animate);
}

animate()


// event listeners
window.addEventListener('keydown', function (e) {
            keys = [];
            Object.keys[e.keyCode] = true;
            if (Object.keys[37] || Object.keys[38] || Object.keys[39] || Object.keys[40]) {
                character.jump();
            }
        }
    )
;

window.addEventListener(
        'keyup', function (e) {
            delete Object.keys[e.keyCode];
            character.moving = false;
        }
    )

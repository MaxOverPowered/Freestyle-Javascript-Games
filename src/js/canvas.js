import platform from "../img/platform.png";
import hills from "../img/hills.png";
const canvas = document.querySelector("canvas");
import background from "../img/background.png";
import platformSmallTall from "../img/platformSmallTall.png";
import spriteStandRight from "../img/spriteStandRight.png";
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
const gravity = 1.5;
const regeneratorRuntime = require("regenerator-runtime");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class Player {
  constructor() {
    this.speed = 20;
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 66;
    this.height = 150;
    this.image = createImage(spriteStandRight);
  }
  draw() {
    c.drawImage(
      this.image,
      0,
      -125,
      250,
      500,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

let platformImage = createImage(platform);
let platformSmallTallImage = createImage(platformSmallTall);

let player = new Player();
let platforms = [];
let genericObjects = [];

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

function init() {
  platformImage = createImage(platform);

  player = new Player();
  platforms = [
    new Platform({
      x:
        platformImage.width * 4 +
        300 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: platformSmallTallImage,
    }),
    new Platform({
      x:
        platformImage.width * 7 +
        330 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: platformSmallTallImage,
    }),
    new Platform({
      x:
        platformImage.width * 8 +
        330 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: platformSmallTallImage,
    }),
    new Platform({
      x:
        platformImage.width * 9 +
        330 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: platformSmallTallImage,
    }),
    new Platform({
      x:
        platformImage.width * 10 +
        400 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: platformSmallTallImage,
    }),
    new Platform({
      x: platformImage.width * 11 + 420,
      y: platformSmallTallImage.width + 80,
      image: platformImage,
    }),
    new Platform({
      x:
        platformImage.width * 12 +
        500 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: platformSmallTallImage,
    }),
    new Platform({
      x: platformImage.width * 14 + 420,
      y: platformSmallTallImage.width + 80,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 15 + 420 - 2,
      y: platformSmallTallImage.height + 80,
      image: platformImage,
    }),
    new Platform({
      x:
        platformImage.width * 16 +
        580 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: platformSmallTallImage,
    }),
    new Platform({
      x:
        platformImage.width * 13 +
        500 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: platformSmallTallImage,
    }),
    new Platform({
      x: -1,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width - 3,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 3 + 300,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 4 + 300 - 2,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 5 + 620 - 2,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 6 + 620 - 4,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 18 + 300 - 2,
      y: platformSmallTallImage.height,
      image: platformImage,
    }),
  ];

  genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(background),
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(hills),
    }),
  ];

  scrollOffset = 0;
}
window.onload = function () {
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }
};
async function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((genericObject) => {
    genericObject.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      scrollOffset += player.speed;
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= player.speed * 0.66;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x += player.speed * 0.66;
      });
    }
  }
  //platform collision detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  if (scrollOffset > platformImage.width * 18 + 100 - 2) {
    console.log("You win");
    document.querySelector("#displayText").style.display = "flex";
    document.querySelector("#displayText").innerHTML = "You win!";
    await sleep(3000);
    document.querySelector("#displayText").innerHTML = " ";
    init();
  }
  if (player.position.y > canvas.height) {
    init();
  }
}

// let timer = 3;
// let timerId;
// function decreaseTimer() {
//   if (timer > 0) {
//     timerId = setTimeout(decreaseTimer, 1000);
//     timer--;
//     document.querySelector("#timer").innerHTML = timer;
//   }
// }

init();
animate();

addEventListener("keydown", ({ keyCode }) => {
  //console.log(keyCode)
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = true;
      break;
    case 87:
      console.log("up");
      player.velocity.y -= 25;
      break;
  }
  console.log(keys.right.pressed);
});

addEventListener("keyup", ({ keyCode }) => {
  //console.log(keyCode)
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = false;
      break;
    case 87:
      console.log("up");
      break;
  }
});

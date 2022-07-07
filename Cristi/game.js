const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.8

const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc: './img/background2.png'
})

const flame = new Sprite({
    position: {
        x:740,
        y:150
    },
    imageSrc: './img/flames.png',
    scale : 2.5,
    framesMax : 17
})

const flame2 = new Sprite({
    position: {
        x:40,
        y:150
    },
    imageSrc: './img/flames.png',
    scale : 2.5,
    framesMax : 17
})

const player = new Fighter({
position: {
    x:0,
    y:0
},
velocity:{
    x:0,
    y:0
},
    offset:{
    x: 0,
    y: 0
    },
    imageSrc: './img/BladeKeeper/idle.png',
    scale : 3.5,
    framesMax : 8,
    offset:{
    x: 340,
    y:330
    },
    sprites : {
    idle : {
        imageSrc : './img/BladeKeeper/idle.png',
        framesMax : 8,
    },
        run : {
        imageSrc : './img/BladeKeeper/run.png',
        framesMax : 8,
        },
        jump : {
        imageSrc : './img/BladeKeeper/jump_up.png',
        framesMax : 3,
        },
        fall : {
        imageSrc : './img/BladeKeeper/jump_down.png',
        framesMax :3,
        },
        attack : {
        imageSrc : './img/BladeKeeper/attack.png',
        framesMax :8,
        },
        takeHit: {
        imageSrc: './img/BladeKeeper/take_hit.png',
        framesMax: 6
    },
        death: {
        imageSrc: './img/BladeKeeper/death.png',
        framesMax: 12
    }
    },
    attackBox:{
    offset:{
        x: 230,
        y: 0
    },
        width: 100,
        height: 50
    }
})

const enemy = new Fighter({
position: {
    x:1050,
    y:100
},
velocity:{
    x:0,
    y:0
},
    color: 'blue',
    offset:{
    x: -50,
    y: 0
    },
    imageSrc: './img/MartialHero/idle.png',
    scale : 3.5,
    framesMax : 10,
    offset:{
    x: 450,
    y:180
    },
    sprites : {
    idle : {
        imageSrc : './img/MartialHero/idle.png',
        framesMax : 10,
    },
        run : {
        imageSrc : './img/MartialHero/run.png',
        framesMax : 8,
        },
        jump : {
        imageSrc : './img/MartialHero/jump_up.png',
        framesMax : 3,
        },
        fall : {
        imageSrc : './img/MartialHero/jump_down.png',
        framesMax :3,
        },
        attack : {
        imageSrc : './img/MartialHero/attack.png',
        framesMax :7,
        },
        takeHit: {
        imageSrc: './img/MartialHero/take_hit.png',
        framesMax: 3
    },
    death: {
        imageSrc: './img/MartialHero/death.png',
        framesMax: 11
    }
    },
    attackBox:{
    offset:{
        x: -420,
        y: 0
    },
        width: 100,
        height: 50
    }
})

console.log(player)

const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    }
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    flame.update()
    flame2.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0


    if (keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
        player.switchSprite('run')
    }else{
        player.switchSprite('idle')
    }

    if (player.velocity.y < 0){
        player.switchSprite('jump')
    }else if (player.velocity.y > 0){
        player.switchSprite('fall')
    }

    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }

    if (enemy.velocity.y < 0){
        enemy.switchSprite('jump')
    }else if (enemy.velocity.y > 0){
        enemy.switchSprite('fall')
    }

    if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit()
    player.isAttacking = false

    gsap.to('#enemyHealth', {
      width: enemy.health + '%'
    })
  }

    if (player.isAttacking && player.framesCurrent === 4){
        player.isAttacking = false
    }

    if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit()
    enemy.isAttacking = false

    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

  // if player misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
  }
}

animate()

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
        player.velocity.y = -15
        break
      case ' ':
        player.attack()
        break
    }
  }
  if (!enemy.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
      case 'ArrowUp':
        enemy.velocity.y = -20
        break
      case 'ArrowDown':
        enemy.attack()

        break
    }
  }
})


window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }

  // enemy keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})
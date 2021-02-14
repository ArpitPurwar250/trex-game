var trex, trex_running, trex_collided;
var ground, ground2, groundImage;
const END = 1
const PLAY = 2
var gs = PLAY
var cactusGroup, cloudsGroup
var score = 0
var checkpoint
var gameover
var jump
var restart
var res 


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
obstacle6=loadImage("obstacle6.png")
  checkpoint=loadSound("checkpoint.mp3")
  gameover=loadSound("game over.mp3")
  jump=loadSound("jump.mp3")
  restart=loadImage("restart.png")
}



function setup() {
  cactusGroup = createGroup()
  cloudsGroup = createGroup()
  console.log(random(100, 48))
  createCanvas(600, 500);

  //create a trex sprite
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("stop", trex_collided);
  trex.scale = 0.5;
  trex.debug = true;
  trex.setCollider("circle", 0, 0, 50)

  //create a ground sprite
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground2 = createSprite(200, 190, 400, 20)
  ground2.visible = false
  
  res=createSprite(300,250,100,100)
  res.addImage(restart)
  res.visible=false
}


function draw() {
  background("white");

  //jump when the space button is pressed

  // console.log(frameCount)


  trex.collide(ground2);
  text("Score: " + score, 500, 10)















  if (gs === PLAY) {
    clouds()
    cactus()
    ground.velocityX = -4;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && trex.y > 154) {
      trex.velocityY = -10
      jump.play()

    }
    console.log(trex.y)
    
    if(frameCount%10===0){
       score=score+1
    }
       
    if(score%100===0&&score>0){
      checkpoint.play();
    }

    if (trex.isTouching(cactusGroup)) {
      gs = END
      gameover.play();
    }

    trex.velocityY = trex.velocityY + 0.8
  } else if (gs === END) {
    ground.velocityX = 0;
    trex.velocityY = 0
    trex.changeAnimation("stop", trex_collided)
    cloudsGroup.setVelocityXEach(0)
    cactusGroup.setVelocityXEach(0)
    cloudsGroup.setLifetimeEach(-200)
    cactusGroup.setLifetimeEach(-200)
    res.visible=true
    if(mousePressedOver(res)||keyDown("space")){
      reset()
    }
  }
  
  drawSprites();
}

function clouds() {
  if (frameCount % 100 === 0) {
    var cloud = createSprite(580, 20, 20, 10)
    cloud.velocityX = -3
    cloud.lifetime = 200
    cloud.y = random(30, 100)
    var cloudImage = loadImage("cloud.png")
    cloud.addImage(cloudImage)
    cloud.scale = 0.1
    cloudsGroup.add(cloud)
  }
}

function cactus() {
  if (frameCount % 100 === 0) {
    var cactus1 = createSprite(580, 165, 20, 20)
    cactusGroup.add(cactus1)
    cactus1.velocityX = -2
    cactus1.scale = 0.1
    cactus1.lifetime = 300
    var band = Math.round(random(1, 6))
    switch (band) {
      case 1:
        cactus1.addImage(obstacle1)
        break;
      case 2:
        cactus1.addImage(obstacle2)
        break;

      default:
        cactus1.addImage(obstacle3)
        break

    }
  }
}
  
  function reset(){
    res.visible=false
    cactusGroup.destroyEach()
    cloudsGroup.destroyEach()
    score=0
    gs=PLAY
    
    trex.changeAnimation("running",trex_running)
  }
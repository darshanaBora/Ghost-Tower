var PLAY = 1;
var END = 2;
gamestate = PLAY;

var towerImage, tower;
var doorImage, door, doorsGroup;
var climberImage, climber, climbersGroup;
var ghost, ghostImage;
var invisibleBlockGroup, invisibleBlock;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImage);
}

function draw(){
  background("black");
  
  if(gamestate === PLAY) {
    
    if(keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }    
    
    if(keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")) {
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400) {
      tower.y = 300
    }
    
    spawnDoors();

    if(climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) { 
      ghost.destroy();
      gamestate = END;
    }
    
    drawSprites();
  }
  
  if (gamestate === END){
    fill("red");
    textSize(30);
    text("Game Over", 200,250)
  }

}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImage);
    climber.addImage(climberImage);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
  
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}


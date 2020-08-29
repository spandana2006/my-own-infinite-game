var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var jumpSound, collidedSound;

var gameOver, restart;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0;


function preload(){
  
  
  monkey_running =loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  monkey1=loadAnimation("monkey_7.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  background1=loadImage("background1.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

}



function setup() {
  // createCanvas(600, 600);
  


  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1

   background=createSprite(200,200,600,600);
   background.addImage("moving", background1);
   background.scale=3;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);

  monkey.setCollider('circle',0,0,400)
 

  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;

  

  

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  
  
    
  

      
    if (gameState===PLAY){
      score = score + Math.round(getFrameRate()/60);
      ground.velocityX = -(6 + 3*score/100);
      
      if(keyDown("space") ) {
        monkey.velocityY = -10;
         touches = [];
      }
    
      monkey.velocityY = monkey.velocityY + 0.8;

      if(ground.x<0) {
        ground.x=ground.width/2;
      }
      if (FoodGroup.isTouching(monkey)) {
        FoodGroup.destroyEach();
    
        }
    
    
    
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
    
     
    
      if(obstaclesGroup.isTouching(monkey)){
          gameState = END;
      }
    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      
      //set velcity of each game object to 0
      ground.velocityX = 0;
      monkey.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);

      
      //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1); monkey.setCollider('circle',0,0,350)

      monkey.changeAnimation("collided",monkey1);
      
      if(touches.length>0 || keyDown("SPACE")) {      
        touches = []
      }
    }
    if(touches.length>0 ||mousePressedOver(restart)) {
        reset();
      touches = []
      }
      
  
   
    
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,30,50);
  
  
    
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Score: "+ score,30,50);
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.setCollider('circle',0,0,45)
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();

  score = 0;
  
}


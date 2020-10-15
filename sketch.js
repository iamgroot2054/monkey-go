var monkey , monkey_running,monkeyImage
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score;
 

var ground
var PLAY=1;
var END=0;
var gameState=PLAY;
var survivaltime=0;

function preload(){
  
  
 monkey_running= loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided = loadImage("sprite_0.png");
  bananaImage   = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
   
}



function setup() {
 createCanvas(600,400); 
 fill("green")
 ground=createSprite(200,340,1500,5);
  
 
  
  
  
 monkey=createSprite(130,330,10,10);
 monkey.addAnimation("Monkey",monkey_running);  
 monkey.scale =   0.1;
 
 bananaGroup=createGroup(); 
 obstacleGroup=createGroup(); 
  
  score=0;
  
  
}


function draw() {
 
 
  
 background("orange");  
 monkey.collide(ground); 
 monkey.isTouching(obstacleGroup);
  
 text("Score: "+ score, 500,50)
 text("Survival Time :"+survivaltime,200,50);
  
 if(gameState===PLAY){  
ground.velocityX=-3  
 
ground.velocityX = -(6 + 3*score/100);   
   
 if(ground.x<0){
  ground.x=ground.width/2;
 }
    
if(keyDown("UP")&& monkey.y >= 300) {
   monkey.velocityY = -13;
    } 
   
if(monkey.isTouching(bananaGroup)){
  bananaGroup.destroyEach(); 
  score = score + 2
 } 
 
 if(score===50){
   fill("red")
  textSize(22);
  text("YOU WIN!",200,100)
   
  fill("red")
  textSize(15);
 text("Press'R'to Restart",200,130); 
 obstacleGroup.setVelocityXEach(0); 
 bananaGroup.setVelocityXEach(0); 
  
 obstacleGroup.setLifetimeEach(-1); 
 bananaGroup.setLifetimeEach(-1);
   
  if(keyDown("r")){ 
  reset();
  
 } 
   
  
 }  
 
 if(obstacleGroup.isTouching(monkey)){  
   gameState=END;
 }
   
   
  monkey.velocityY = monkey.velocityY + 0.8
   
 survivaltime = survivaltime + Math.round(getFrameRate()/60);
 ground.velocityX = -(6 + 3*score/100);
 } 
 
else if(gameState === END ){  
 
  fill("red")
  textSize(20);
 text("YOU HAVE BEEN CAUGHT!",150,100);
  fill("red")
  textSize(15);
 text("Press Space to Restart",200,130);
  
 ground.velocityX=0;
 monkey.velocityY=0; 
  
 obstacleGroup.setVelocityXEach(0); 
 bananaGroup.setVelocityXEach(0); 
  
 obstacleGroup.setLifetimeEach(-1); 
 bananaGroup.setLifetimeEach(-1); 

  
 if(keyDown("Space")){ 
  reset();
  
 }
 
} 
  spawnObstacles(); 
  spawnBanana();                            
  
  
 drawSprites();
   
}
 
function spawnObstacles(){
if (frameCount % 100 === 0){
obstacle=createSprite(700,318,10,10);
 obstacle.addImage(obstacleImage); 
 obstacle.scale=0.08 

obstacle.velocityX=-5
obstacle.velocityX = -(6 + 3*score/100);

obstacleGroup.add(obstacle);

}
}


function spawnBanana(){
if (frameCount % 200 === 0){

banana=createSprite(2000,220,10,10);
 banana.addImage(bananaImage); 
 banana.scale=0.10

banana.velocityX=-7


bananaGroup.add(banana);
}

}

function reset(){

gameState=PLAY;

 obstacleGroup.destroyEach();
 bananaGroup.destroyEach();

score=0;
survivaltime=10;


}














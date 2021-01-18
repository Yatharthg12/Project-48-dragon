var player1, player2;
var edges,fireG;
var BGimg;
var BlueDragon, RedDragon, fireimg, fire;
var score = 0;
var player5;
var BDragon;
var enemyG,gameOver, gameOverImg;
var gameState = "Start";
var start;
var Rules, rulesImg;

function preload()
{
   Bgimg = loadImage("background.jpg");
  rulesImg = loadImage("Slide1.jpg")
     gameOverImg = loadImage("Game-Over.jpg") 
 startimg = loadImage("start.png")
   RedDragon = loadAnimation("d1.jpg","d2.jpg","d3.jpg");
  BlueDragon = loadAnimation("dragon1.png","dragon2.png","dragon3.png");
   // fireimg = loadImage("firesprite1.png");
  updragon = loadAnimation("dragonimg1.png","dragonimg2.png","dragonimg3.png");
 fireimg = loadAnimation("Fireball.png");
downdragon = loadAnimation("Dragonsprite1.png","Dragonsprite2.png","Dragonsprite3.png")
BDragon = loadAnimation("DragonP1.png","DragonP2.png","DragonP3.png","DragonP4.png","DragonP5.png")
}

function setup() {
createCanvas(windowWidth,windowHeight);
 
background = createSprite(width/2,height/2,width,height);
start = createSprite(width/2,height/2 + 250,50,50);
player1 = createSprite(100,height/2,10,10);
player1.addAnimation("Dragon",RedDragon);
Rules = createSprite(width/2 - 200,250);
player1.visible = false;

enemyG = new Group();
console.log(windowWidth,windowHeight);
fireG = new Group();
edges = createEdgeSprites();
}

function draw() {

 if(gameState === "Start"){
 background.shapeColor = "white";
 start.addImage(startimg)
 Rules.addImage(rulesImg);

}
if(mousePressedOver(start)){
  start.visible = false;
  Rules.visible = false;
  gameState = "play";
     console.log(gameState);
     console.log(start)
    
   }
 
if(gameState === "play"){

  background.addImage(Bgimg);
  background.scale = 2;
  background.velocityX = -10 
 
  if (background.x < 650){
    background.x = background.width/2
  }
  player1.visible = true;
  

  if(keyDown(RIGHT_ARROW)){
    player1.velocityX = 5;
    //player1.x = player1.x + 5
  }
  else{
   player1.velocityX = 0;
  }

  if(keyDown(LEFT_ARROW)){
   player1.velocityX = -5;
  //player1.x = player1.x - 5
  }
  
  if(keyDown(UP_ARROW)){
   player1.velocityY = -5;
    //player1.y = player1.y - 5
  }
  else{
    player1.velocityY = 0;

  }
  
  if(keyDown(DOWN_ARROW)){
  player1.velocityY = 5;
  //player1.y = player1.y + 5
  }
  
  player1.bounceOff(edges);
 if (keyDown("space"))
{
  dragonfire(); 
}

enemies();
for(var i = 0;i<enemyG.length;i ++){
  if(enemyG.get(i).isTouching(fireG)){
    enemyG.get(i).destroy();
    score = score + 1;
  }
}
for(var i = 0;i<enemyG.length;i ++){
  if(enemyG.get(i).isTouching(player1)){
    player1.destroy();
    gameState = "end";
       }
}  
}
 

if(gameState === "end"){
 
 
  enemyG.destroyEach();
  fireG.destroyEach();
  background = createSprite(width/2,height/2,width,height);
  background.addImage(gameOverImg);
  background.velocityX = 0;
  background.scale = 1;
 
  
}


  drawSprites();
  textSize(35)
  strokeWeight(5);
  stroke("white");
  fill ("green");
   text("Points: "+score,width/2-80,30)
  // text("Press Enter to Start the game",width/2 - 100, height/2 + 50)
}

function dragonfire(){
  fire = createSprite(100,100);
  fire.addAnimation("fires",fireimg);
  fire.x = player1.x +100;
  fire.y = player1.y;
  fire.velocityX = 7;
  fire.lifetime = 300;
  fireG.add(fire);

  fire.scale = 0.2;
}

function enemies(){
  if(frameCount % 50 === 0){

  enemy = createSprite(Math.round(random(200,width)),Math.round(random(0,height)),20,20);
  enemy.velocityX = score * 2 + random(-3,3);
  var rand = Math.round(random(1,4));
  switch(rand){
    case 1: enemy.addAnimation("Dragon1",BlueDragon);
    break;
    case 2: enemy.addAnimation("UpDragon1",updragon);
    break;
    case 3: enemy.addAnimation("DownDragon1",downdragon);
    break;
    case 4: enemy.addAnimation("BlueDragon",BDragon);
    break;
    default:break;
    }
    enemyG.add(enemy);
    enemy.bounceOff(edges);
  }
  
}

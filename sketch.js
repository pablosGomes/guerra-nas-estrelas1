var espaco, espacoImg;
var luke, lukeImg;
var imperio, imperioImg;
var imperioGroup;
var gameOver,gameOverImg;
var restart,restartImg;
var bullets = 70;
var PLAY = 1;
var END = 0;
var gameState = 1;


function preload(){
  lukeImg = loadImage("nave1.png");
  espacoImg = loadImage("space.jpg");
  imperioImg = loadImage("inimigo1.png");
  gameOverImg = loadImage("game_Over.1.png");
  resetImg = loadImage("reset.png");

}
function setup() {
  createCanvas(800,900);
  espaco = createSprite(width/2,height/2, 50, 50);
  espaco.addImage(espacoImg);
  espaco.scale = 0.6;
  espaco.velocityY = 5;

  luke = createSprite(100, 600, 50, 50);
  luke.addImage(lukeImg);
  luke.scale = 0.1;

  gameOver = createSprite(400,300,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2

  reset = createSprite(600,350,10,10);
  reset.addImage(resetImg);
  reset.scale = 0.1; 
  
  
  
  bulletGroup = new Group()
  imperioGroup = new Group();
}

function draw() {
  background("black");

  if(gameState === PLAY){
    gameOver.visible = false;
    reset.visible = false;

    if (keyDown("RIGHT_ARROW")){
      luke.x = luke.x +10
    }

    if (keyDown("LEFT_ARROW")){
      luke.x = luke.x -10
      
    }

    if (espaco.y > 400 ){
      espaco.y = height/2;
  
    }

    enemy();
    
    if(imperioGroup.isTouching(luke)){
      luke.destroy();
      gameState = END;
  
        
    }
   }else if (gameState === END) {
     gameOver.visible = true;
     reset.visible = true;
     espaco.velocityY = 0;
  
     if(mousePressedOver(reset)) {
      restart();
    
    }  
   }
   if(keyWentDown("space")){
    bullet = createSprite(displayWidth-1150,luke.x +30,20,10)
    bullet.velocityX = 20
    
    bulletGroup.add(bullet)
  }else if(imperioGroup[i].isTouching(bulletGroup)){
    imperioGroup[i].destroy();
  }

    
    drawSprites();
  }
  

  


function enemy(){
  if(frameCount%60===0){

    //atribuir posições x e y aleatórias para o zumbi aparecer
    imperio = createSprite(random(0,900),random(-100,500),40,40)

    imperio.addImage(imperioImg)
    imperio.scale = 0.30
    imperio.velocityY = +6
    imperio.debug= true
    imperio.setCollider("rectangle",0,0,400,400)
   
    imperio.lifetime = 400
   imperioGroup.add(imperio)
  }

}

function restart(){
  gameState = PLAY; 
  gameOver.visible = false;
  reset.visible = false;

  imperioGroup.destroyEach();
  luke.changeImage(lukeImg);
  espaco.velocityY = 6;

  luke = createSprite(200,600,20,20);
  luke.addImage(lukeImg);
  luke.scale = 0.1;


 

}









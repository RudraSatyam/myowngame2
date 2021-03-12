const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg,platform;
var bird, slingshot;
var board;
var pig;
var level = levelA

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    if(level === levelA){
        levelA();
        
    }
   
   
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("red")
        text("Score  " + score, width-300, 50)
    
      

    Engine.update(engine);

    if(score === 180){
     console.log("test")        
     }

    //strokeWeight(4);
    ground.display();
    board.display();
    bird.display();
    platform.display();
    pig.display();
    pig.score();
    slingshot.display();
       
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed < 1){
       bird.trajectory = [];
       Matter.Body.setPosition(bird.body,{x:200, y:95});
       slingshot.attach(bird.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}


function levelA(){


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 330, 300, 140);

    board = new Ground(600,300,15,300);

    pig = new Pig(365,370)

    bird = new Bird(200,95);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:95});

}

function levelB(){

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 330, 300, 140);
    bird = new Bird(200,95);
    slingshot = new SlingShot(bird.body,{x:200, y:95});


}
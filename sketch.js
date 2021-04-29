//Create variables here
var dogNormal,dog,happyDog,database,foodS,foodStock,Food;
var database,position;

function preload()
{
	//load images here
  dogNormal = loadImage("images/dogImg.png"); 
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,10,10);
  dog.addImage(dogNormal);
  dog.scale = 0.2; 
  var locofChild = database.ref("ball/positions");
  locofChild.on("value",readOp, showerr);
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown( UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here

  textSize(20);
  fill(255, 204, 100);
  strokeWeight(4);
  stroke(51);
  text("Press UP_Arrow to feed TheDude milk",100,170);
  text("Food Remaining:" + foodS, 250,480);

}
function readStock(data){
  foodS=data.val();
}

function readOp(data,x){
  position = data.val();
 // dog.x = position.x;
}
function showerr(){
  console.log("error");
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x - 1;
  }

  database.ref('/').update({
    Food:x
  })

}





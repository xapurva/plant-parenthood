let bg;
let cursor;
let waterPail;
var affirmationArray = [];
var flowersArray = [];

function preload() {
  pink = loadImage("assets/pinkflorpix.png");
  yellow = loadImage("assets/growplantpix.png");
  bg = loadImage("assets/pinkfield.jpg");
  cursor = loadImage("assets/cursor.png");
  waterPail = loadImage("assets/canpix.png");
}

function setup() {
  createCanvas(600, 400);
  affirmationArray[0] = "you're doing amazing, sweetie";
  affirmationArray[1] = "you're a baddie";
  affirmationArray[2] = "keep going boo";
  affirmationArray[3] = "u look cute today";
  affirmationArray[4] = "ur going to have an amazing day";
  affirmationArray[5] = "ur hot";
  affirmationArray[6] = "ur slaying today and forever"
  textSize(30);
  textFont("hey-eloise");
  randomText = int(random(affirmationArray.length));
  
  for(var i = 0; i < 4; i++){
    if (i == 0 || i == 2){
    flowersArray[i] = new Flower(i*80+120,260,pink);
    } else {
      flowersArray[i] = new Flower(i*80+120,260,yellow);
    }
  }
  
}

function draw() {
  background(bg);
  noCursor();
  fill("#709176")
  text(affirmationArray[randomText], width / 2, height - 250);
  
  for(var i = 0; i < 4; i++){
    flowersArray[i].display();
  }
  image(waterPail,mouseX,mouseY,60,60);
}

  class Flower {
    constructor(x,y,img) {
      this.h = 80;
      this.w =80;
      this.x = x;
      this.y =  y; 
      this.img = img;
    }
  display(){
    image(this.img, this.x, this.y, this.w, this.h)
  }
}
function mouseClicked() {
  randomText = int(random(affirmationArray.length));
  for (var i = 0; i < 4; i++) {
    if (
      pointIsInRectangle(
        mouseX,
        mouseY,
        flowersArray[i].x,
        flowersArray[i].y,
        flowersArray[i].w,
        flowersArray[i].h
      )
    ) {
      flowersArray[i].w+= 20;
      flowersArray[i].h+= 20;
      flowersArray[i].x-= 10;
      flowersArray[i].y-= 10;
    }
  }
}

function pointIsInRectangle(pX, pY, rX, rY, rW, rH) {
  if (pX > rX && pX < rX + rW && pY > rY && pY < rY + rH) {
    return true;
  } else {
    return false;
  }
}


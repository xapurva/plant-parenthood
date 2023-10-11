let cutePlant = [];
// let plantCount = 0;
let bg;
let evilPlant = [];
let cursor;
var Plants = [];
var numPlants = 10;
var addBox;
var score = 0;

function preload() {
  bg = loadImage("assets/fieldgarden.jpg");
  cutePlant = loadImage("assets/cuter.png");
  evilPlant = loadImage("assets/devil.png");
  cursor = loadImage("assets/cursor.png");
}
function setup() {
  createCanvas(600, 400);
  for (var i = 0; i < numPlants; i++) {
    Plants[i] = new Box();
  }
  fill("#709176");
  textFont("hey-eloise");
}

addBox = setInterval(drawNewBox, 1000);

function draw() {
  background(bg);
  noCursor();

  var areThereStillEvilPlantsOnTheScreen = false;

  for (var i = 0; i < Plants.length; i++) {
    Plants[i].display();
    textSize(24);
    text("Score: " + score, 10, 20,);
    image(cursor, mouseX, mouseY, 50, 50);

    //checking if theres still an evil plant on screen
    if (Plants[i].evil == true) {
      if (Plants[i].visible == true) {
        areThereStillEvilPlantsOnTheScreen = true;
      }
    }
  }

  //if there are not evil plants left (aka you win)
  if (!areThereStillEvilPlantsOnTheScreen) {
    clearInterval(addBox);
    text("YOU WIN!", width / 2, height / 5);
  }
}

class Box {
  constructor() {
    this.size = 70;
    this.x = random(width - this.size);
    this.y = random(height / 2, height - this.size);
    this.visible = true;

    let r = random();
    if (r > 0.5) {
      this.evil = true;
    } else {
      this.evil = false;
    }
  }
  display() {
    if (this.visible) {
      if (this.evil) {
        image(evilPlant, this.x, this.y, this.size, this.size);
      } else {
        image(cutePlant, this.x, this.y, this.size, this.size);
      }
    }
  }
}

function mouseClicked() {
  for (var i = 0; i < Plants.length; i++) {
    if (
      pointIsInRectangle(
        mouseX,
        mouseY,
        Plants[i].x,
        Plants[i].y,
        Plants[i].size,
        Plants[i].size
      )
    ) {
      Plants[i].visible = false;
      if (Plants[i].evil) {
        score += 1;
      } else {
        score -= 1;
      }
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

function drawNewBox() {
  Plants.push(new Box());
}

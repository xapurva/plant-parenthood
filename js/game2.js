var player = { x: 100, y: 200, size: 75 };
var gameStarted = false;
var gameOver = false;
var obstacles = [];
let me;
let vine;
let cursor;
var score = 0;

function preload() {
  me= loadImage("assets/mepixalated.png");
  vine = loadImage("assets/column.png");
  cursor = loadImage("assets/cursor.png");
  
}
function setup() {
  createCanvas(600, 400);
  textSize(30);
  fill("#709176");
  textFont("hey-eloise");
  player.y = height / 2 - player.size / 2;
  
  //create all the top obstacles 
  for (var i = 0; i < 6; i++) {
    obstacles[i] = new obstacle(i * (width / 5), false, vine);
  }
  //create all the bottom obstacles
  for (var i = 6; i < 12; i++) {
  obstacles[i] = new obstacle((i - 6) * (width / 5), true, vine );
  }
}

function draw() {
  background("#E3DAC9");
  noStroke();
  noCursor();
  image(cursor,mouseX,mouseY,50,50);
  // draw the player square
  drawPlayer();
  text("score: " + score, width/4*3, height/2,)
  //draw the obstacles
  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].display();
  }
  
  //if the game has begun (a key has been pressed) and the game is not yet over (you haven't collided)
  if (gameStarted && !gameOver) {
    
    //raise the player square if the key is pressed
    if (keyIsPressed) {
      raisePlayer();
    //drop the player if its released
    } else {
      dropPlayer();
    }
    
    //move all the obstacles
    for (var i = 0; i < obstacles.length; i++) {
      obstacles[i].move();
      
      //check if the obstacles have collided with the player
      if (obstacles[i].collided(player)) {
        gameOver = true;
      }
    }
  }
}

//function to draw the player square
function drawPlayer() {
  image(me, player.x, player.y, player.size, player.size);
}

//function to make the player move down
function dropPlayer() {
  player.y += 2.5;
}

//function to make the player move up
function raisePlayer() {
  player.y -= 2.5;
}

//pressing any key starts the game
function keyPressed() {
  gameStarted = true;
}

//defines the obstacle class
class obstacle {
  //takes an X location, and a boolean variable called isBottom. Because the placement and collision detection of the obstacles depends on whether or not its a bottom obstacle or a top one, we need to keep track of that.
  constructor(x, isBottom, img) {
    this.h = random(height / 6, height / 2.75);
    this.x = x;
    this.w = width / 5;
    this.speed = -4;
    this.col = random(360);
    this.isBottom = isBottom;
    this.img = img;
  }

  //displays the obstacles
  display() {

    //if its on the bottom, use height - obstacle height for y position
    if (this.isBottom) {
      image(this.img, this.x, height - this.h, this.w, this.h);
    //if its a bottom obstacle, place it at 0 for the y position
    } else {
      image(this.img,this.x, 0, this.w, this.h);
    }
  }

  //move method moves the obstacles, and if they move off the left edge of the screen, it places them back at the right side, with a newly randomized height and color
  move() {
    this.x += this.speed;

    if (this.x + this.w <= 0) {
      score += 1/2;
      this.x = width;
      this.h = random(height / 7, height / 3);
      this.col = random(360);
    }
  }

  //this method takes the player object as an argument, and uses the player position to detect if the top or bottom edges of the player have collided with this obstacle. If it has collided, it returns true. If it has not collided, it returns false
  collided(player) {
    if (
      !this.isBottom &&
      player.y < this.h &&
      player.x > this.x &&
      player.x < this.x + this.w
    ) {
      return true;
    } else if (
      this.isBottom &&
      player.y + player.size > height - this.h &&
      player.x > this.x &&
      player.x < this.x + this.w
    ) {
      return true;
    } else {
      return false;
    }
  }
}

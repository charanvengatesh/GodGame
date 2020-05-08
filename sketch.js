var player;
var gravity;
var blocks;

// function preload() {
//   data = loadStrings("data.txt");
// }

function setup() {
  blocks = [];
  createCanvas(1000, 500);
  player = new Player();

  gravity = createVector(0, 0.7);

  var xblock = 0;
  var yblock = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] == 1) {
        blocks.push(new Block(xblock, yblock));
      }
      if (data[i][j] == 2) {
        blocks.push(new Ice(xblock, yblock));
      }
      if (data[i][j] == 3) {
        blocks.push(new Water(xblock, yblock));
      }
      if (data[i][j] == 4) {
        blocks.push(new Spike(xblock, yblock));
      }
      xblock++;
    }
    xblock = 0;
    yblock++;
  }
}
function draw() {
  // frameRate(60);
  rectMode(CENTER);
  background(80);
  // translate(player.pos.x * -1 + 400, 0);
  // translate(0 , player.pos.y * -1 + 375);

  document.getElementById("xval").innerHTML = Math.round(player.health);
  document.getElementById("yval").innerHTML = Math.round(mouseY);

  player.move();
  player.update();
  player.applyForce(gravity);
  // player.edges();

  blocks.forEach(block => {
    if (block.state != "liquid") block.show();
    block.collision();
  });

  player.show();
  blocks.forEach(block => {
    if (block.state == "liquid") block.show();
    block.collision();
  });
  if (player.pos.y > 1000) {
    player.pos.set(375, -100);
  }
}
function keyPressed() {
  if (key == "d") {
    console.table(player);
  }
  if (key == "p") {
    player.punch();
  }
}

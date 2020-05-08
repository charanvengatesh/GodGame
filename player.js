class Player {
  constructor() {
    this.pos = createVector(375, 100);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.jumpForce = 16;
    this.maxSpeed = 5;
    this.head = 1;
    this.onGround = false;
    this.onIce = false;
    this.onLiquid = false;
    this.edge = false;
    this.jumpCount = 0;
    this.maxHealth = 100;
    this.health = this.maxHealth;
  }

  show() {
    noStroke();
    fill(255, 200, 150);
    rect(this.pos.x, this.pos.y, 50, 50);
    fill(145, 200, 200);
    if (this.head == 1) {
      rect(this.pos.x + 20, this.pos.y, 10, 50);
    }
    if (this.head == -1) {
      rect(this.pos.x - 20, this.pos.y, 10, 50);
    }
  }
  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.head = -1;
      this.vel.x -= 0.7;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.head = 1;
      this.vel.x += 0.7;
    }

    if (keyIsDown(UP_ARROW)) {
      if (
        this.onGround
        // || (this.edge && this.vel.y > -3 && this.vel.y < 2)
      ) {
        player.jumper();
      }
      // if (
      //   !this.onGround &&
      //   // !this.edge&&
      //   this.jumpCount < 1 &&
      //   this.vel.y < 3 &&
      //   this.vel.y > -3
      // ) {
      //   this.jumpForce *= 3 / 4;
      //   player.jumper();
      //   this.jumpForce /= 3 / 4;
      //   this.jumpCount++;
      // }
      // if (this.onGround) {
      //   this.jumpCount = 0;
      // }
      if (this.onLiquid) {
        this.vel.y = (-1 * this.maxSpeed) / 2;
      }
    }
  }
  update() {
    if (this.vel.x > this.maxSpeed) {
      this.vel.x = this.maxSpeed;
    }
    if (this.vel.x < this.maxSpeed * -1) {
      this.vel.x = this.maxSpeed * -1;
    }

    if (!this.onIce && this.vel.x > 0 && !keyIsPressed) {
      this.vel.x = 0;
    }
    if (!this.onIce && this.vel.x < 0 && !keyIsPressed) {
      this.vel.x = 0;
    }
    if (this.onIce && this.vel.x > 0 && !keyIsPressed) {
      this.vel.x -= 0.07;
    }
    if (this.onIce && this.vel.x < 0 && !keyIsPressed) {
      this.vel.x += 0.07;
    }

    if (this.vel.x < 0.07 && this.vel.x > -0.07) {
      this.vel.x = 0;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.onIce = false;
    this.onGround = false;
    this.edge = false;
    this.onLiquid = false;

    if (this.health <= 0) {
      player.pos.set(375, -100);
      this.health = 100;
    }
  }

  jumper() {
    this.applyForce(createVector(0, this.jumpForce * -1));
  }

  edges() {
    // if (this.pos.y > height - 25) {
    //   this.vel.y *= 0;
    //   this.pos.y = height - 25;
    // }
    if (this.pos.y < 25) {
      this.vel.y *= 0;
      this.pos.y = 25;
    }
    // if (this.pos.x < 25) {
    //   this.pos.x = 25;
    // }
    // if (this.pos.x > width-25) {
    //   this.pos.x = width-25;
    // }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  punch() {
    for (let i = 0; i < blocks.length; i++) {
      if (
        this.head == 1 &&
        this.edge == true &&
        this.pos.dist(blocks[i].pos) == 50 &&
        this.pos.y == blocks[i].pos.y &&
        this.pos.x < blocks[i].pos.x
      ) {
        blocks[i].health -= 5;
      }
      if (
        this.head == -1 &&
        this.edge == true &&
        this.pos.dist(blocks[i].pos) == 50 &&
        this.pos.y == blocks[i].pos.y &&
        this.pos.x > blocks[i].pos.x
      ) {
        blocks[i].health -= 5;
      }
      if (blocks[i].state == "solid") {
        blocks[i].checkDeath();
      }
    }
  }
}

class Block {
  constructor(x, y) {
    this.pos = createVector(x * 50 + 25, y * 50 + 25);
    this.maxHealth = 25;
    this.health = 25;
    this.type = 1;
    this.state = "solid";
  }
  show() {
    fill(75, 50, 25, map(this.health, 0, this.maxHealth, 0, 255));
    rect(this.pos.x, this.pos.y, 50, 50);
  }
  collision() {
    if (
      this.pos.x - 50 <= player.pos.x &&
      this.pos.x - 35 > player.pos.x &&
      this.pos.y - 45 < player.pos.y &&
      this.pos.y + 15 > player.pos.y
    ) {
      player.pos.x = this.pos.x - 50;
      if (player.head == 1) {
        player.edge = true;
      }
    }
    if (
      this.pos.x + 50 >= player.pos.x &&
      this.pos.x + 35 < player.pos.x &&
      this.pos.y - 45 < player.pos.y &&
      this.pos.y + 15 > player.pos.y
    ) {
      player.pos.x = this.pos.x + 50;
      if (player.head == -1) {
        player.edge = true;
      }
    }

    if (
      this.pos.y - 50 < player.pos.y &&
      this.pos.y > player.pos.y &&
      this.pos.x + 40 > player.pos.x &&
      this.pos.x - 40 < player.pos.x &&
      player.vel.y > 0
    ) {
      player.vel.y = 0;
      player.pos.y = this.pos.y - 50;
      player.onGround = true;
    }

    if (
      this.pos.y + 50 > player.pos.y &&
      this.pos.y < player.pos.y &&
      this.pos.x + 40 > player.pos.x &&
      this.pos.x - 40 < player.pos.x &&
      player.vel.y < 0
    ) {
      player.vel.y = 0;
      player.pos.y = this.pos.y + 50;
    }
  }
  checkDeath() {
    if (this.health <= 0) {
      let num = blocks.indexOf(this);
      blocks.splice(num, 1);
      num = null;
    }
  }
}

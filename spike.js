class Spike {
  constructor(x, y) {
    this.pos = createVector(x * 50 + 25, y * 50 + 25);
    this.maxHealth = 15;
    this.type = 4;
    this.health = 15;
    this.state = "solid";
    this.damage = 0.5;
  }
  show() {
    fill(255, 100, 100, map(this.health, 0, this.maxHealth, 0, 255));
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
      player.health -= this.damage;
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
      player.health -= this.damage;
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
      player.health -= this.damage;
      player.onGround = true;
      player.pos.y = this.pos.y - 50;
    }

    if (
      this.pos.y + 50 > player.pos.y &&
      this.pos.y < player.pos.y &&
      this.pos.x + 40 > player.pos.x &&
      this.pos.x - 40 < player.pos.x
      // player.vel.y < 0
    ) {
      player.vel.y = 0;
      player.health -= this.damage;
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

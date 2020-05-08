class Water {
  constructor(x, y) {
    this.pos = createVector(x * 50 + 25, y * 50 + 25);
    this.maxHealth = 15;
    this.health = 15;
    this.type = 3
    this.state = "liquid"
  }
  show() {
    fill(50,50,255, 175);
    rect(this.pos.x, this.pos.y, 50, 50);
  }
  collision() {
    if (
      this.pos.x - 50 <= player.pos.x &&
      this.pos.x - 35 > player.pos.x &&
      this.pos.y - 45 < player.pos.y &&
      this.pos.y + 15 > player.pos.y
    ) {
      player.vel.x /= 2;
      player.vel.y /= 2;
      player.onLiquid = true;
    }
    if (
      this.pos.x + 50 >= player.pos.x &&
      this.pos.x + 35 < player.pos.x &&
      this.pos.y - 45 < player.pos.y &&
      this.pos.y + 15 > player.pos.y
    ) {
      player.vel.x /= 2;
      player.vel.y /= 2
      player.onLiquid = true;
    }

    if (
      this.pos.y - 50 < player.pos.y &&
      this.pos.y > player.pos.y &&
      this.pos.x + 40 > player.pos.x &&
      this.pos.x - 40 < player.pos.x &&
      player.vel.y > 0
    ) {
      player.vel.x /= 2;
      player.vel.y /= 2;
      player.onLiquid = true;
    }
    

    if (
      this.pos.y + 50 > player.pos.y &&
      this.pos.y < player.pos.y &&
      this.pos.x + 40 > player.pos.x &&
      this.pos.x - 40 < player.pos.x
      // player.vel.y < 0
    ) {
      player.vel.x /= 2;
      player.vel.y /= 2;
      player.onLiquid = true;
    }
  }
  
}

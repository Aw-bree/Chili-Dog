class Puppy {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width / 3;
    this.y = this.dimensions.height / 1.5;
    this.scrX;
    this.scrY;
    this.sheetWidth = 266;
    this.sheetHeight = 200;
    this.frameCount = 2;
    this.width = this.sheetWidth / this.frameCount;
    this.height = this.sheetHeight / this.frameCount;
    this.currentFrame = 0;

    this.puppyImg = new Image();
    this.puppyImg.src = "./assets/run-corgi-2.png";
  }

  movePuppy(deltaX, deltaY) {
    this.x += deltaX;
    this.y += deltaY;
  }

  animate(ctx) {
    this.puppyID = setInterval(() => { this.drawPuppy(ctx); }, 300);
  }
 
  updateFrame() {
    this.currentFrame = ++this.currentFrame % this.frameCount;
    this.srcX = this.currentFrame * this.width;
    this.srcY = 0;
  }

  drawPuppy(ctx) {
    this.updateFrame();
    ctx.clearRect(0, 0, 480, 640);
    ctx.drawImage(
      this.puppyImg,
      this.srcX,
      this.srcY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  bounds() {
    return {
      left: this.x + 20,
      right: this.x + 100,
      bottom: this.y + 82,
      top: this.y + 20,
    }
  }

  outOfBounds() {
    const aboveTop = this.y < 0;
    const belowBottom = this.y + 82 > this.dimensions.height;
    return aboveTop || belowBottom;
  }

}

export default Puppy;
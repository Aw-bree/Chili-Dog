const CONSTANTS = {
  OBSTACLE_SPEED: 4,
  SIDEWALK_SPEED: 4,
  GAP_HEIGHT: 150,
  OBSTACLE_WIDTH: 150,
  OBSTACLE_HEIGHT: 150,
  EDGE_BUFFER: 50,
  OBSTACLE_SPACING: 350,
  SIDEWALK_SPACING: 150,
  WARM_UP_SECONDS: 1,
  HOTDOG_STAND_WIDTH: 300,
  HOTDOG_STAND_HEIGHT: 350
};

class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;

    const hotdogStandImg = new Image();
    hotdogStandImg.src = "./assets/hot-dog-stand.png";
    const firstSidewalkLineDistance = (80);
    const firstObstacleDistance = this.dimensions.width +
      (CONSTANTS.WARM_UP_SECONDS * 60 * CONSTANTS.OBSTACLE_SPEED);

    this.sidewalkLines = [
      this.sidewalkLine(firstSidewalkLineDistance),
      this.sidewalkLine(firstSidewalkLineDistance + CONSTANTS.SIDEWALK_SPACING),
      this.sidewalkLine(firstSidewalkLineDistance + (CONSTANTS.SIDEWALK_SPACING * 2))
    ]

    this.hotdogStand = {
      left: 300,
      top: 40,
      img: hotdogStandImg
    }

    this.obstacleImg = new Image();
    this.obstacleImg.src = "./assets/bush.png";

    this.obstacles = [
      this.randomObstacle(firstObstacleDistance),
      this.randomObstacle(firstObstacleDistance + CONSTANTS.OBSTACLE_SPACING),
      this.randomObstacle(firstObstacleDistance + (CONSTANTS.OBSTACLE_SPACING * 2))
    ]
    
  }

  animate(ctx) {
    this.drawBackground(ctx);
    this.moveSidewalkLines();
    this.drawSidewalkLines(ctx);
    this.moveHotdogStand();
    this.drawHotdogStand(ctx);
    this.moveObstacles();
    this.drawObstacles(ctx);
  }

  // ------------------------------ Background ----------------------------//
  drawBackground(ctx) {
    ctx.fillStyle = '#DDDDDD';
    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height)

    for(let i =1; i < 4; i+=1.3) {
      ctx.fillStyle = "black",
      ctx.lineWidth = 2.0,
      ctx.beginPath();
      ctx.moveTo(0, CONSTANTS.EDGE_BUFFER * 3.8 * i);
      ctx.lineTo(480, CONSTANTS.EDGE_BUFFER * 3.8 * i);
      ctx.stroke();
    }
  }

  sidewalkLine(x) {
    return {
      left: x
    }
  }

  moveSidewalkLines() {
    this.eachSidewalkLine(line => {
      line.left -= CONSTANTS.SIDEWALK_SPEED;
    })

    if (this.sidewalkLines[0].left <= 0) {
      this.sidewalkLines.shift();
      const newX = this.sidewalkLines[1].left + CONSTANTS.SIDEWALK_SPACING;
      this.sidewalkLines.push(this.sidewalkLine(newX));
    }
  }

  drawSidewalkLines(ctx) {
    this.eachSidewalkLine(line => {
      ctx.fillStyle = "Black";

      ctx.lineWidth = 2.0,
        ctx.beginPath();
      ctx.moveTo(line.left, 0);
      ctx.lineTo(line.left, 640);
      ctx.stroke();
    });
  }

  eachSidewalkLine(cb) {
    this.sidewalkLines.forEach(cb.bind(this));
  }

  // ---------------------------- Start Screen ----------------------------//
  
  moveHotdogStand() {
    this.hotdogStand.left -= CONSTANTS.SIDEWALK_SPEED;
  }

  drawHotdogStand(ctx) {
    ctx.drawImage(
      this.hotdogStand.img,
      this.hotdogStand.left,
      this.hotdogStand.top,
      CONSTANTS.HOTDOG_STAND_WIDTH,
      CONSTANTS.HOTDOG_STAND_HEIGHT
    );
  }

  // ------------------------------ Level ---------------------------------//

  randomObstacle(x) {
    const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.GAP_HEIGHT;
    const gapTop = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;
    const obstacle = {
      img: this.obstacleImg,

      topObstacle: {
        left: x,
        right: CONSTANTS.OBSTACLE_WIDTH + x,
        top: gapTop - CONSTANTS.OBSTACLE_HEIGHT,
        bottom: gapTop
      },
      bottomObstacle: {
        left: x,
        right: CONSTANTS.OBSTACLE_WIDTH + x,
        top: gapTop + CONSTANTS.GAP_HEIGHT,
        bottom: gapTop + CONSTANTS.GAP_HEIGHT + CONSTANTS.OBSTACLE_HEIGHT
      }
    }

    return obstacle;
  }

  moveObstacles() {
    this.eachObstacle( obstacle => {
      obstacle.topObstacle.left -= CONSTANTS.OBSTACLE_SPEED;
      obstacle.topObstacle.right -= CONSTANTS.OBSTACLE_SPEED;
      obstacle.bottomObstacle.left -= CONSTANTS.OBSTACLE_SPEED;
      obstacle.bottomObstacle.right -= CONSTANTS.OBSTACLE_SPEED;
    })
    
    if (this.obstacles[0].topObstacle.right <= 0) {
      this.obstacles.shift();
      const newX = this.obstacles[1].topObstacle.left + CONSTANTS.OBSTACLE_SPACING;
      this.obstacles.push(this.randomObstacle(newX));
    }
  }

  drawObstacles(ctx) {
    this.eachObstacle(obstacle => {
      ctx.fillStyle = "green";

      // (x, y, w, h)
      ctx.drawImage(
        obstacle.img,
        obstacle.topObstacle.left,
        obstacle.topObstacle.top,
        CONSTANTS.OBSTACLE_WIDTH,
        obstacle.topObstacle.bottom - obstacle.topObstacle.top
      );

      ctx.drawImage(
        obstacle.img,
        obstacle.bottomObstacle.left,
        obstacle.bottomObstacle.top,
        CONSTANTS.OBSTACLE_WIDTH,
        obstacle.bottomObstacle.bottom - obstacle.bottomObstacle.top
      );
    });
  }

  eachObstacle(cb) {
    this.obstacles.forEach(cb.bind(this));
  }

 //-----------------------COLLISION---------------------------//
  collidesWith(puppy) {
    let collision = false 

    
    const _overlap = (obstacle, puppy) => {

      // check circle obstacle to puppy

      // For circle obstacles find the middle point of the obstacle
      let centerX = ((obstacle.left + obstacle.right) / 2);
      let centerY = ((obstacle.top + obstacle.bottom) / 2);
      let circleRadius = obstacle.right - centerX;

      // find closest point in the rectangle to the circle
      let closestX;
      let closestY;
      // check if the center of the circle is to the left of the rectangle etc.
      if (puppy.left > centerX) {
        closestX = puppy.left;
      } else if (puppy.right < centerX) {
        closestX = puppy.right;
      } else {
        closestX = centerX;
      }
      // check if the center of the circle is to the top of the rectangle etc.
      if (puppy.top > centerY) {
        closestY = puppy.top;
      } else if (puppy.bottom < centerY) {
        closestY = puppy.bottom;
      } else {
        closestY = centerY;
      }

      // check if the closest point on the obstacle is inside the circle  
      let dist = Math.hypot(closestX - centerX, closestY - centerY);
      
      if ( dist < circleRadius) {
        return true;
      }

      return false;
      // check rectangle obstacle to puppy
      // if ((obstacle.left + 10) > puppy.right || (obstacle.right - 10) < puppy.left ||
      //     (obstacle.top + 10) > puppy.bottom || (obstacle.bottom - 10) < puppy.top)
      // {
      //   return false;
      // }

      // return true;
    };


    this.eachObstacle(obstacle => {
      if (
        _overlap(obstacle.topObstacle, puppy) || 
        _overlap(obstacle.bottomObstacle, puppy)
      ) { collision = true; }
    });

    return collision;
  }
}

export default Level;
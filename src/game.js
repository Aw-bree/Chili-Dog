import Level from './level';
import Puppy from './puppy';

const CONSTANTS = {
  PUPPY_VELOCITY: -25,
};

class Game {
  constructor(canvas, playerCanvas) {
    this.ctx = canvas.getContext("2d");
    this.playerCtx = playerCanvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    
    this.lose = false;  
    this.running = false;
    
    this.playButton = document.getElementById('audio-button');
    this.audioContext = new AudioContext();
    this.audioElement = document.getElementById('audio-background');
    this.track = this.audioContext.createMediaElementSource(this.audioElement);
    
    this.score = 0;

    this.registerEvents();
    this.restart();
  }

  play() {
    this.running = true;
    this.animate();
  }

  restart() {
    document.getElementsByClassName("start-msg")[0].style.display = "flex";
    this.lose = false;
    this.puppy = new Puppy(this.dimensions);
    this.level = new Level(this.dimensions);
    this.animate();
    this.puppy.animate(this.playerCtx);
  }

  updateScore() {
    if (this.lose === false) {
      this.score += 1;
    } 

    let rawScore = Number(this.score);
    let m = Math.floor(rawScore % 3600 / 60);
    let s = Math.floor(rawScore % 3600 % 60);
    let formattedScore = ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);

    document.getElementsByClassName("timer")[0].innerHTML = formattedScore;
  }

  registerEvents() {
    this.boundKeyPressedHandler = this.keyPressed.bind(this);
    document.addEventListener("keydown", this.boundKeyPressedHandler);
    
    this.boundPlayButtonPressedHandler = this.playButtonPressed.bind(this);
    this.playButton.addEventListener("click", this.boundPlayButtonPressedHandler);
  }

  keyPressed(e) {

    if (!this.running) {
      document.getElementsByClassName("start-msg")[0].style.display = "none";
      this.scoreID = setInterval(this.updateScore.bind(this), 500);
      this.running = true;
      this.play();

      // let e = this.playButton.click();
      // this.playButtonPressed(e);
    }

    let key = e.key || e.keycode;

    if (key != 'Escape' || key != 'Esc' || key != 27) {
      if (key === 38 || key == "ArrowUp") {
        this.puppy.movePuppy(0, CONSTANTS.PUPPY_VELOCITY);
      } else if (key === 40 || key == "ArrowDown") {
        this.puppy.movePuppy(0, Math.abs(CONSTANTS.PUPPY_VELOCITY));
      } else if (key === 37 || key == "ArrowLeft") {
        this.puppy.movePuppy(CONSTANTS.PUPPY_VELOCITY, 0);
      } else if (key === 39 || key == "ArrowRight") {
        this.puppy.movePuppy(Math.abs(CONSTANTS.PUPPY_VELOCITY), 0);
      }
    }
  }

  playButtonPressed(e) {
    this.track.connect(this.audioContext.destination);
    this.audioElement.crossOrigin = "anonymous";
    
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    if (e.currentTarget.dataset.playing === 'false') {
      this.audioElement.play();
      e.currentTarget.dataset.playing = 'true';
    } else if (e.currentTarget.dataset.playing === 'true') {
      this.audioElement.pause();
      e.currentTarget.dataset.playing = 'false';
    }
  }

  // setup highscores in localstoreage
  // credit: https://www.developerdrive.com/2013/09/html5-javascript-gem-game-with-saved-scoreboard/
  highScores() {
    let high_scores = document.getElementById("leaderboard");
    if (typeof (Storage) !== "undefined") {
      let scores = false;
      if (localStorage["high-scores"]) {
        high_scores.style.display = "block";
        high_scores.innerHTML = '';
        scores = JSON.parse(localStorage["high-scores"]);
        scores = scores.sort((a, b) => { return parseInt(b) - parseInt(a) });

        for (var i = 0; i < 10; i++) {
          let s = scores[i];
          let fragment = document.createElement('li');
          fragment.setAttribute('class', 'leader');
          fragment.innerHTML = (typeof (s) != "undefined" ? s : "");
          high_scores.appendChild(fragment);
        }
      }
    } else {
      high_scores.style.display = "none";
    }
  }

  updateScores() {
    if (typeof (Storage) !== "undefined") {
      let current = parseInt(this.score);
      let scores = false;
      if (localStorage["high-scores"]) {
        scores = JSON.parse(localStorage["high-scores"]);
        scores = scores.sort(function (a, b) { return parseInt(b) - parseInt(a) });

        for (let i = 0; i < 10; i++) {
          let s = parseInt(scores[i]);

          let val = (!isNaN(s) ? s : 0);
          if (current > val) {
            val = current;
            scores.splice(i, 0, parseInt(current));
            break;
          }
        }

        scores.length = 10;
        localStorage["high-scores"] = JSON.stringify(scores);

      } else {
        let scores = new Array();
        scores[0] = current;
        localStorage["high-scores"] = JSON.stringify(scores);
      }

      this.highScores();
    }
  }


  gameOver() {
    return (
      this.level.collidesWith(this.puppy.bounds()) || this.puppy.outOfBounds(this.height)
    );
  }

  animate() {
    this.level.animate(this.ctx);

    if (this.gameOver()) {
      this.lose = true;
      this.running = false;
      alert(this.score);
      this.updateScores();
      this.score = 0;
      clearInterval(puppy.puppyID);
      clearInterval(this.scoreID);
      this.restart();
    }

    if (this.running) {
      this.requestId = requestAnimationFrame(this.animate.bind(this));
    }
  }
  
}

export default Game;
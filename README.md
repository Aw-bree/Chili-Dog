# Chili-Dog

## Background and Overview
  * Chili Dog is a simple game to play, the player can move up or down to dodge obstacles coming from the right of the screen.
  * The levels will increase speed and frequency of obstacles.
  * This game is inspired by the popular app Flappy Bird, but game play is more generally arcade inspired.
  * The game is simple, yet difficult and is centered around a classic pairing, our dogs and their passion for food. 
  * In honor of the chili dog I will style the game with classic baseball throwback jerseys in mind.
  * It will feature Chunky cursive fonts and large colorful boarders.
## Functionality and MVP Features
  * Users can press up and down arrow keys to move along a vertical axis.
  * Obstacles will be generated at the right of the frame and move towards the left.
  * The user loses when an obstacle is encountered.
  * Each level will have a speed and obstable frequencies, as well as durations.
## Architecture and Technologies
  * Vanilla JavaScript for game logic
  * HTML5 Canvas for rendering
  * Howler.js (or HTML audio player) for game background music
  * Web Audio API for sound generation, processing and control
  * Webpack to bundle various scripts into a single source
  * MongoDB & Express for handling leaderboard
## Wireframes
  - A play button will be available in the control panel, as well as a sound toggle.
  - After pressing play the game starts and text appears on the screen with instruction sliding out. 
  - A couple seconds later the first obstacles appear and slide to the left of the screen.
  - When a player loses the character will spin and a game over message will appear.
  - When a level is passed a hotdog stand will slide in from the left and the user will receive a chili dog.

![Wireframe]()

## MVPs
- [ ]  Basic visuals and an interactive interface.
- [ ]  Player can move avatar.
- [ ]  Obstacles generate and move left toward the edge of the screen.
- [ ]  Obstacles cause 'Game Over' upon collision.
- [ ]  Styling.

## Implementations timeline

##### Day 1:
- [ ]  Complete conception, reasearch, and project proposal.
- [ ]  Briefly review games using canvas from the instructional curriculum.
- [ ]  Finish basic project skeleton and essentials.

##### Day 2:
- [ ]  Complete basic page skeleton and functionality.
- [ ]  Complete board design and rendering.
- [ ]  Complete player avatar rendering and functionality.

##### Day 4:
- [ ]  Obstacle rendering and functionality.

##### Day 5:
- [ ]  Implement obstacle/player collision.
- [ ]  Finish game over condition.
- [ ]  Leaderboard updating.

##### Day 6:
- [ ]  Add game over and passed level visuals.
- [ ]  Finish CSS.

### Bonus features
* Control for selecting avatar
* Collisions play a sound

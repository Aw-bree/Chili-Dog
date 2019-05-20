# Chili-Dog

## Background and Overview
  * Chili Dog is a simple game to play, the player can move up or down to dodge obstacles coming from the right of the screen.
  * The levels will increase speed and frequency of obstacles.
  * This game is inspired by the popular app Flappy Bird, but game play is more generally arcade inspired.
  * The game is simple, yet difficult and is centered around a classic pairing, our dogs and their passion for food. 
  * In honor of the chili dog I will style the game with classic baseball throwback jerseys in mind.
  * It will feature Chunky cursive fonts and large colorful boarders.
## Architecture and Technologies
  * Vanilla JavaScript for game logic
  * HTML5 Canvas for rendering
  * Howler.js (or HTML audio player) for game background music
  * Web Audio API for sound generation, processing and control
  * Webpack to bundle various scripts into a single source
  * MongoDB & Express for handling leaderboard
## Functionality and MVP Features
  * Users can press up and down arrow keys to move along a vertical axis.
  * Obstacles will be generated at the right of the frame and move towards the left.
  * The user loses when an obstacle is encountered.
  * Each level will have a speed and obstable frequencies, as well as durations.
## MVPS
- [ ]  Basic visuals and an interactive interface.
- [ ]  Player can move avatar.
- [ ]  Obstacles generate and move left toward the edge of the screen.
- [ ]  Obstacles cause 'Game Over' upon collision.
- [ ]  Styling.

## Implementation timeline

##### Day 1:
- [ ]  Complete conception, reasearch, and project proposal.
- [ ]  Review games using canvas from the instructional curriculum.
- [ ]  Review adding game background music.
- [ ]  Finish basic project skeleton and essentials.

##### Day 2:
- [ ]  Complete basic page skeleton and functionality. (play button, start msg, music button, controlls)
- [ ]  Complete board design and rendering. 
- [ ]  Complete player avatar rendering and functionality.

##### Day 4:
- [ ]  Obstacle rendering and functionality.
- [ ]  Implement obstacle/player collision.

##### Day 5:
- [ ]  Finish game over condition.
- [ ]  Levels.
- [ ]  Level passed condition.

##### Day 6:
- [ ]  Add game over and passed level visuals.
- [ ]  Finish CSS.
- [ ]  Leaderboard updating.

### Bonus features
* Control for selecting avatar
* Collisions play a sound

## Wireframes
  - A play button will be available in the control panel, as well as a sound toggle.
  - After pressing play the game starts and text appears on the screen with instruction sliding out. 
  - A couple seconds later the first obstacles appear and slide to the left of the screen.
  - When a player loses the character will spin and a game over message will appear.
  - When a level is passed a hotdog stand will slide in from the left and the user will receive a chili dog.

Play Screen
![](https://66.media.tumblr.com/8ef1a45dd9a96f349d54d99e2371691e/tumblr_prksv5YLcW1wyb2l8o1_1280.png)

In Game Play
![](https://66.media.tumblr.com/46c63c490d38cb5625a5c2f22c12c894/tumblr_prkkksj3Id1wyb2l8o1_1280.png)

Passed Level
![](https://66.media.tumblr.com/f3e4acf312f58464e3c3d29ce423e825/tumblr_prklegJy7k1wyb2l8o1_1280.png)

Game Over
![](https://66.media.tumblr.com/878a449a1fceae8ae5e191b76ef9c982/tumblr_prknvntF8S1wyb2l8o1_1280.png)

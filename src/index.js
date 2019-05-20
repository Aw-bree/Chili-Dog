import ChiliDog from './game';
import { inherits } from 'util';

const backgroundCanvas = document.getElementById('chili-dog-game');
const playerCanvas = document.getElementById('player');

new ChiliDog(backgroundCanvas, playerCanvas);

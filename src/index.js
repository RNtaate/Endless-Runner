import Phaser from 'phaser';
import Preload from './preload';
import {Boot, gameState} from './boot';
import Menu from './Menu';
import Options from './Options';
import Credits from './Credits';
import Game from './game';

const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 520,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0},
      debug: false
    }
  },
  scene: [Boot, Preload, Menu, Options, Credits, Game]
}

const game = new Phaser.Game(config);
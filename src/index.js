import Phaser from 'phaser';
import Preload from './preload';
import {Boot, gameState} from './boot';
import Menu from './Menu';
import Options from './Options';
import Credits from './Credits';
import Game from './game';
import {GameOver} from './gameOver';
import LeaderBoard from './leaderBoard';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 960,
  height: 520,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0},
      debug: false
    }
  },
  dom: {
    createContainer: true
  },
  scene: [Boot, Preload, Menu, Options, Credits, Game, GameOver, LeaderBoard],
}

const game = new Phaser.Game(config);
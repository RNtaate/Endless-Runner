import Phaser from 'phaser';
import Preload from './preload';
import Boot from './boot';

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
  scene: [Boot, Preload]
}

const game = new Phaser.Game(config);
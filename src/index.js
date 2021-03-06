import Phaser from 'phaser';

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
  }
}

const game = new Phaser.Game(config);
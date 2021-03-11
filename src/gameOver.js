import Phaser from 'phaser';
import {gameState} from './boot';

class GameOver extends Phaser.Scene {
  constructor() {
    super({key: 'GameOver'});
  }

  preload() {

  }

  create() {
    this.add.image(gameState.sceneWidth / 2, gameState.sceneHeight / 2, 'sky').setScale(0.5);

    let heightDet = 100

    this.setText(gameState.sceneWidth / 2, gameState.sceneHeight / 2 - heightDet, 'GAME OVER', '60px', '#ffffff', '#ff0000', 0.5 );

    this.setText(gameState.sceneWidth / 2, gameState.sceneHeight / 2, 'Player 1', '60px', '#ffffff', '#0000ff', 0.5 );

    this.setText(gameState.sceneWidth / 2, gameState.sceneHeight / 2 +  heightDet, `Your Score: ${gameState.score}`, '60px', '#ffffff', '#0000ff', 0.5 );
  }

  setText(x, y, message, fontSize, strokeColor, fillColor, origin = 0){
    this.add.text(x, y, message, {
      fontSize: fontSize,
      fill: fillColor,
      fontFamily: '"Akaya Telivigala"',
      strokeThickness: 5,
      stroke: strokeColor
    }).setOrigin(origin);
  }
}

export default GameOver;
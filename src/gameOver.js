import Phaser from 'phaser';
import { gameState, playStopAudio } from './boot';
import CustomButton from './support_script/CustomButton';


const setText = (scene, x, y, message, fontSize, strokeColor,
  fillColor, originX = 0, originY = 0) => scene.add.text(x, y, message, {
  fontSize,
  fill: fillColor,
  fontFamily: '"Akaya Telivigala"',
  strokeThickness: 5,
  stroke: strokeColor,
}).setOrigin(originX, originY);


class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  create() {
    this.hoverSound = this.sound.add('hoverBtnSound', { loop: false });
    this.clickSound = this.sound.add('clickBtnSound', { loop: false });

    playStopAudio(gameState.music, gameState.theme1);

    this.add.image(gameState.sceneWidth / 2, gameState.sceneHeight / 2, 'sky').setScale(0.5);

    const heightDet = 100;

    setText(this, gameState.sceneWidth / 2, gameState.sceneHeight / 2 - heightDet, 'GAME OVER', '60px', '#ffffff', '#ff0000', 0.5, 0.5);

    setText(this, gameState.sceneWidth / 2, gameState.sceneHeight / 2, `${gameState.playerName}`, '60px', '#ffffff', '#0000ff', 0.5, 0.5);

    setText(this, gameState.sceneWidth / 2, gameState.sceneHeight / 2 + heightDet, `Your Score: ${gameState.score}`, '60px', '#ffffff', '#0000ff', 0.5, 0.5);

    // Scene Buttons
    const leaderBoardBtn = new CustomButton(this, (gameState.sceneWidth * 3) / 4, gameState.sceneHeight - 75, 'leaderBoard', 'leaderBoardHover');
    this.add.existing(leaderBoardBtn);

    leaderBoardBtn.setInteractive().on('pointerup', () => {
      playStopAudio(gameState.sound, this.clickSound);
      this.scene.stop();
      this.scene.start('Leader');
    }).on('pointerover', () => {
      playStopAudio(gameState.sound, this.hoverSound);
    });

    const playAgainBtn = new CustomButton(this, (gameState.sceneWidth) / 4, gameState.sceneHeight - 75, 'playAgain', 'playAgainHover');
    this.add.existing(playAgainBtn);

    playAgainBtn.setInteractive().on('pointerover', () => {
      playStopAudio(gameState.sound, this.hoverSound);
    }).on('pointerup', () => {
      playStopAudio(gameState.sound, this.clickSound);
      gameState.theme1.stop();
      this.scene.stop();
      this.scene.start('Game');
    });
  }
}

export { GameOver, setText };
import Phaser from 'phaser';
import CustomButton from './support_script/CustomButton';
import { gameState, playStopAudio } from './boot';

class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' });
  }

  create() {
    this.width = this.scale.width;
    this.height = this.scale.height;

    this.add.image(this.width / 2, this.height / 2, 'sky').setScale(0.5);
    this.add.image(this.width / 2, this.height / 2, 'logo2').setAlpha(0.2);

    this.hoverSound = this.sound.add('hoverBtnSound', { loop: false });
    this.clickSound = this.sound.add('clickBtnSound', { loop: false });

    gameState.theme1.volume = 0.1;

    playStopAudio(gameState.music, gameState.theme1);

    const startButton = new CustomButton(this, this.width / 2, this.height / 2, 'startGame', 'startGameHover');
    this.add.existing(startButton);

    startButton.setInteractive().on('pointerup', () => {
      playStopAudio(gameState.sound, this.clickSound);
      gameState.theme1.stop();
      this.startScene('Game');
    }).on('pointerover', () => {
      playStopAudio(gameState.sound, this.hoverSound);
    });

    const optionsButton = new CustomButton(this, this.width / 4, this.height / 4, 'options', 'optionsHover');
    this.add.existing(optionsButton);

    optionsButton.setInteractive().on('pointerup', () => {
      playStopAudio(gameState.sound, this.clickSound);
      this.startScene('Options');
    }).on('pointerover', () => {
      playStopAudio(gameState.sound, this.hoverSound);
    });

    const leaderBoardBtn = new CustomButton(this, (this.width * 3) / 4, this.height / 4, 'leaderBoard', 'leaderBoardHover');
    this.add.existing(leaderBoardBtn);

    leaderBoardBtn.setInteractive().on('pointerup', () => {
      playStopAudio(gameState.sound, this.clickSound);
      this.scene.start('Leader');
    }).on('pointerover', () => {
      playStopAudio(gameState.sound, this.hoverSound);
    });

    const instructionsBtn = new CustomButton(this, (this.width * 3) / 4, (this.height * 3) / 4, 'instructions', 'instructionsHover');
    this.add.existing(instructionsBtn);

    instructionsBtn.setInteractive().on('pointerup', () => {
      playStopAudio(gameState.sound, this.clickSound);
      this.scene.start('instructions');
    }).on('pointerover', () => {
      playStopAudio(gameState.sound, this.hoverSound);
    });

    const creditsBtn = new CustomButton(this, (this.width) / 4, (this.height * 3) / 4, 'credits', 'creditsHover');
    this.add.existing(creditsBtn);

    creditsBtn.setInteractive().on('pointerup', () => {
      playStopAudio(gameState.sound, this.clickSound);
      this.startScene('Credits');
    }).on('pointerover', () => {
      playStopAudio(gameState.sound, this.hoverSound);
    });
  }

  startScene(newScene) {
    this.scene.stop();
    this.scene.start(newScene);
  }
}

export default Menu;
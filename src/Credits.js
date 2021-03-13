import Phaser from 'phaser';
import CustomButton from './support_script/CustomButton';
import {gameState, playStopAudio} from './boot';

class Credits extends Phaser.Scene {
  constructor() {
    super({key: 'Credits'});
  }

  preload() {

  }

  create() {

    this.width = this.scale.width;
    this.height = this.scale.height;

    this.hoverSound = this.sound.add('hoverBtnSound', {loop: false});
    this.clickSound = this.sound.add('clickBtnSound', {loop: false});

    this.add.image(0, 0, 'sky').setOrigin(0).setScale(0.5);
    this.add.image(this.width/ 2, this.height/ 2, 'logo2').setAlpha(0.2);
    this.add.rectangle(this.width / 2, this.height / 2, (this.width * 3) / 4, (this.height * 3) / 4, 0x000000, 0.3);

    let positionWords = (x, y, message, fillColor, strokeColor) => {
      return this.add.text(x, y, message, {
        fontSize: '30px',
        fill: fillColor, 
        fontFamily: '"Akaya Telivigala"',
        strokeThickness: 5,
        stroke: strokeColor
      });
    }

    positionWords(this.width / 2, this.height/ 2 - 100, 'DEVELOPED BY:', '#ff0000', "#ffffff").setOrigin(1, 0.5);

    positionWords(this.width / 2 + 20, this.height / 2 - 100, 'Roy Ntaate', "#ffffff", "#0275d8").setOrigin(0, 0.5);

    positionWords(this.width / 2, this.height / 2, 'BUILT WITH: ', '#ff0000', "#ffffff").setOrigin(1, 0.5);

    positionWords(this.width / 2 + 20, this.height / 2, 'Phaser 3', "#ffffff", "#0275d8").setOrigin(0, 0.5);

    positionWords(this.width / 2, this.height / 2 + 100, 'ASSETS SOURCE: ', '#ff0000', "#ffffff").setOrigin(1, 0.5);

    let assetsList = positionWords(this.width / 2 + 20, this.height / 2 + 100, 'CoolText.com, Kenney.nl,', "#ffffff", "#0275d8").setOrigin(0, 0.5);

    positionWords(this.width / 2 + 20, assetsList.y + 30, 'marwamj.itch.io,', "#ffffff", "#0275d8").setOrigin(0, 0.5);

    positionWords(this.width / 2 + 20, assetsList.y + 60, 'OpenGameArt', "#ffffff", "#0275d8").setOrigin(0, 0.5);

    const backBtn = new CustomButton(this, 100, this.height - 30, 'mainMenu', 'mainMenuHover');
    this.add.existing(backBtn);

    backBtn.setInteractive().on('pointerup', () => {
      playStopAudio(gameState.sound, this.clickSound);
      this.scene.stop();
      this.scene.start('Menu');
    }).on('pointerover', () => {
      playStopAudio(gameState.sound, this.hoverSound);
    })
  }

}

export default Credits
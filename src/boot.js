import Phaser from 'phaser';
import WebFontFile from './support_script/webfontloader';
import 'regenerator-runtime/runtime';

const gameState = {
  sceneWidth: 0,
  sceneHeight: 0,
  score: 0,
  music: true,
  sound: true,
};

const playStopAudio = (status, audio) => {
  if (status) {
    if (!audio.isPlaying) {
      audio.play();
    }
  } else {
    audio.stop();
  }
};

class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    this.load.html('form', 'form.html');
    this.load.addFile(new WebFontFile(this.load, 'Akaya Telivigala'));
  }

  create() {
    gameState.sceneWidth = this.scale.width;
    gameState.sceneHeight = this.scale.height;

    this.add.text(gameState.sceneWidth / 2, gameState.sceneHeight / 2 - 100, 'Hullo There!', {
      fontSize: '40px',
      fill: '#ffffff',
      fontFamily: 'Akaya Telivigala',
    }).setOrigin(0.5);

    this.add.text(gameState.sceneWidth / 2, gameState.sceneHeight / 2, 'Please enter your username and press "ENTER" to continue', {
      fontSize: '30px',
      fill: '#ffffff',
      fontFamily: 'Akaya Telivigala',
    }).setOrigin(0.5);

    this.nameInput = this.add.dom(gameState.sceneWidth / 2, gameState.sceneHeight / 2 + 100).createFromCache('form');

    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.enterKey.on('down', () => {
      const name = this.nameInput.getChildByName('name');
      if (name.value.trim() !== '') {
        gameState.playerName = name.value.trim();
        this.scene.stop();
        this.scene.start('Preload');
      }
    });
  }
}

export { Boot, gameState, playStopAudio };
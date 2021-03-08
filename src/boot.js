import Phaser from 'phaser';
import WebFontFile from './support_script/webfontloader';

let gameState = {
  sceneWidth: 0,
  sceneHeight: 0,
}

class Boot extends Phaser.Scene {
  constructor() {
    super({key: 'Boot'});
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Akaya Telivigala'));
  }

  create() {

    gameState.sceneWidth = this.scale.width;
    gameState.sceneHeight = this.scale.height;

    this.scene.stop();
    this.scene.start('Preload');
  }
}

export {Boot, gameState};
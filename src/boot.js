import Phaser from 'phaser';
import WebFontFile from './support_script/webfontloader';

class Boot extends Phaser.Scene {
  constructor() {
    super({key: 'Boot'});
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Akaya Telivigala'));
  }

  create() {
    this.scene.stop();
    this.scene.start('Preload');
  }
}

export default Boot;
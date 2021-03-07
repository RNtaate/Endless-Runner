import Phaser from 'phaser';
import CustomButton from './support_script/CustomButton';

class Menu extends Phaser.Scene {
  constructor() {
    super({key: 'Menu'});
  }

  preload() {

  }

  create() {

    this.width = this.scale.width;
    this.height = this.scale.height;

    const button = new CustomButton(this, this.width / 2, this.height / 2, 'startGame', 'startGameHover');
    this.add.existing(button);

    button.setInteractive().on('pointerover', () => {
      console.log('Thunder over the container');
    })
  }
}

export default Menu
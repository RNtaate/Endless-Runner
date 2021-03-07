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

    this.add.image(this.width / 2, this.height / 2, 'sky').setScale(0.5);

    const startButton = new CustomButton(this, this.width / 2, this.height / 2, 'startGame', 'startGameHover');
    this.add.existing(startButton);

    startButton.setInteractive().on('pointerover', () => {
      console.log('Thunder over the container');
    })

    const optionsButton = new CustomButton(this, this.width / 4 , this.height / 4, "options", 'optionsHover');
    this.add.existing(optionsButton);

    optionsButton.setInteractive().on('pointerover', () => {
      console.log('Thunder over the container');
    })

    const leaderBoardBtn = new CustomButton(this, (this.width * 3) / 4 , this.height / 4, "leaderBoard", 'leaderBoardHover');
    this.add.existing(leaderBoardBtn);

    leaderBoardBtn.setInteractive().on('pointerover', () => {
      console.log('Thunder over the container');
    })

    const instructionsBtn = new CustomButton(this, (this.width * 3) / 4 , (this.height * 3) / 4, "instructions", 'instructionsHover');
    this.add.existing(instructionsBtn);

    instructionsBtn.setInteractive().on('pointerover', () => {
      console.log('Thunder over the container');
    })

    const creditsBtn = new CustomButton(this, (this.width) / 4 , (this.height * 3) / 4, "credits", 'creditsHover');
    this.add.existing(creditsBtn);

    creditsBtn.setInteractive().on('pointerover', () => {
      console.log('Thunder over the container');
    })




  }
}

export default Menu
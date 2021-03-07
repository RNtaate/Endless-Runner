import Phaser from 'phaser';
import CustomButton from './support_script/CustomButton';


let gameSound = {
  music: true,
  sound: true
}

class Options extends Phaser.Scene {
  constructor(){
    super({key: 'Options'});
  }

  preload() {

  }

  create() {

    this.width = this.scale.width;
    this.height = this.scale.height;

    this.add.image(this.width / 2, this.height / 2, 'sky').setScale(0.5);

    const firstCheckBox = this.add.image(this.width / 4, this.height / 2 - 100, 'checkbox').setScale(1.5);
    const firstTick = this.add.image(this.width / 4, this.height / 2 - 100, 'tick').setScale(1.5);

    this.add.text(this.width / 4 + 150, this.height / 2 - 100, 'Music', {
      fontSize: '60px',
      fill: "#ffffff",
      fontFamily: '"Akaya Telivigala"',
      stroke: "#0275d8",
      strokeThickness: 10,
    }).setOrigin(0, 0.5);

    this.add.text(this.width / 4 + 150, this.height / 2 + 100, 'Sound Effects', {
      fontSize: '60px',
      fill: "#ffffff",
      fontFamily: '"Akaya Telivigala"',
      stroke: "#0275d8",
      strokeThickness: 10,
    }).setOrigin(0, 0.5);
    
    firstTick.setVisible(true);

    const secondCheckBox = this.add.image(this.width / 4, this.height / 2 + 100, 'checkbox').setScale(1.5);
    const secondTick = this.add.image(this.width / 4, this.height / 2 + 100, 'tick').setScale(1.5);
    
    secondTick.setVisible(true);

    firstCheckBox.setInteractive().on('pointerup', () => {
      gameSound.music = this.updateSoundStatus(firstTick, gameSound.music);
    })

    secondCheckBox.setInteractive().on('pointerup', () => {
      gameSound.sound = this.updateSoundStatus(secondTick, gameSound.sound);
    })

    const backBtn = new CustomButton(this, this.width - 100, this.height - 50, 'mainMenu', 'mainMenuHover');
    this.add.existing(backBtn);

    backBtn.setInteractive().on('pointerup', () => {
      this.scene.stop();
      this.scene.start('Menu');
    })

  }

  updateSoundStatus(object, audioStatus) {
    let myStatus = audioStatus;
    if(audioStatus){
      object.setVisible(false);
      myStatus = false;
    }
    else {
      object.setVisible(true);
      myStatus = true;
    }
    return myStatus;
  }
}

export default Options;
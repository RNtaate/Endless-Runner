import Phaser from 'phaser';

class Preload extends Phaser.Scene {
  constructor() {
    super({key: 'Preload'});
    this.width;
    this.height;
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
    let progressBoxWidth = 320;
    let progressBoxHeight = 50;

    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect( (this.width / 2) - (progressBoxWidth / 2), (this.height / 2) - (progressBoxHeight / 2), progressBoxWidth, progressBoxHeight);

    let loadingText = this.add.text(this.width / 2, this.height / 2, 'Loading ...', {
      fontSize: "30px",
      fill: '#ffffff',
      fontFamily: '"Akaya Telivigala"'
    }).setOrigin(0.5);

    // The event listeners for loading assets

    let progressBarWidth = progressBoxWidth - 20;
    let progressBarHeight = progressBoxHeight - 20

    this.load.on('progress',(value) => {
      progressBar.clear();
      progressBar.fillStyle(0xf0ad4e, 1);
      progressBar.fillRect((this.width / 2) - (progressBarWidth / 2), (this.height / 2) - (progressBarHeight / 2), progressBarWidth * value, progressBarHeight);
    });

    this.load.on('complete', (e) => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    })


    // Loading of the assets
    this.load.image('logo', '../assets/gameLogo.png');

    for(let i = 0; i < 200; i ++) {
      this.load.image('logo' + i, '../assets/gameLogo.png');
    }

  }

  create(){
    this.add.image(this.width / 2, this.height/ 2, 'logo');

    this.message = this.add.text( this.scale.width / 2, 30, 'PRESS "ENTER" TO CONTINUE TO MAIN MENU', {
      fontSize: "25px",
      fill: "#ffffff",
      fontFamily: '"Akaya Telivigala"'
    }).setOrigin(0.5);

    this.message.setAlpha(0);

    this.tweens.add({
      targets: this.message,
      repeat: -1,
      duration: 1000,
      delay: 1000,
      ease: 'linear',
      alpha: 1,
      yoyo: true
    })
  }
}

export default Preload;
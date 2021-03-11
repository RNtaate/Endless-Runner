import Phaser from 'phaser';

class Preload extends Phaser.Scene {
  constructor() {
    super({key: 'Preload'});
    this.width;
    this.height;
    this.enter;
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
    let progressBoxWidth = 320;
    let progressBoxHeight = 50;

    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRoundedRect( (this.width / 2) - (progressBoxWidth / 2), (this.height / 2) - (progressBoxHeight / 2), progressBoxWidth, progressBoxHeight, 25);

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
      let myProgress = progressBarWidth * value;
      if (value < 0.1){
        myProgress = progressBarWidth * 0.1;
      } 
      progressBar.fillRoundedRect((this.width / 2) - (progressBarWidth / 2), (this.height / 2) - (progressBarHeight / 2), myProgress, progressBarHeight, {tl: 15, bl: 15, tr: 15, br: 15});
    });

    this.load.on('complete', (e) => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    })


    // Loading of the assets
    this.load.image('logo', '../assets/gameLogo.png');
    this.load.image('logo2', '../assets/gameLogoTransparent.png');
    this.load.image('startGame', '../assets/startButton.png');
    this.load.image('startGameHover', '../assets/startButtonOver.png');
    this.load.image('options', '../assets/optionsButton.png');
    this.load.image('optionsHover', '../assets/optionsButtonHover.png');
    this.load.image('leaderBoard', '../assets/leaderBoard.png');
    this.load.image('leaderBoardHover', '../assets/leaderBoardHover.png');
    this.load.image('instructions', '../assets/instructions.png');
    this.load.image('instructionsHover', '../assets/instructionsHover.png');
    this.load.image('credits', '../assets/credits.png');
    this.load.image('creditsHover', '../assets/creditsHover.png');
    this.load.image('mainMenu', '../assets/mainMenu.png' );
    this.load.image('mainMenuHover', '../assets/mainMenuHover.png');

    this.load.image('sky', '../assets/sky.png');
    this.load.image('mountains', '../assets/mountains.png');
    this.load.image('plateau', '../assets/plateau.png');
    this.load.image('ground', '../assets/ground.png');

    this.load.image('checkbox', '../assets/checkbox2.png');
    this.load.image('tick', '../assets/tick2.png');

    this.load.spritesheet('player', '../assets/playersprite.png', {frameWidth: 150, frameWidth: 250});
    this.load.spritesheet('bird', '../assets/birdSprite.png', {frameWidth: 290, frameHeight: 300});
    this.load.spritesheet('explosion', '../assets/explosion.png', {frameWidth: 64, frameHeight: 63});
    this.load.image('coin', '../assets/coin.png');
    this.load.image('spike', '../assets/spike.png');
    this.load.image('missile', '../assets/missile.png');
    this.load.image('missile2', '../assets/missile2.png');


    // for(let i = 0; i < 200; i ++) {
    //   this.load.image('logo' + i, '../assets/gameLogo.png');
    // }

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

    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  update() {
    if(Phaser.Input.Keyboard.JustDown(this.enter)){
      this.scene.stop();
      this.scene.start('Game');
    }
  }
}

export default Preload;
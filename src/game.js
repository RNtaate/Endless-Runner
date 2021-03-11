import Phaser from 'phaser';
import {gameState} from './boot';

class Game extends Phaser.Scene {
  constructor(){
    super({key: 'Game'});
    this.timer = 0;
    this.secondTimer = 0;
  }

  preload() {

  }

  //Start of create function
  create() {

    gameState.score = 0;

    this.scoreText = this.add.text(50, 25, 'Coins: ', {
      fontSize: "40px",
      fill: '#333',
      fontFamily: '"Akaya Telivigala"',
      strokeThickness: 10,
      stroke: '#FFD700'
    }).setDepth(8);

    this.scoreValue = this.add.text(170, 25, `${gameState.score}`, {
      fontSize: '40px',
      fill: '#ffffff',
      fontFamily: '"Akaya Telivigala"',
      strokeThickness: 5,
      stroke: '#000'
    }).setDepth(8);

    this.healthText = this.add.text(50, 75, 'Health: ', {
      fontSize: '30px',
      fill: '#ffffff',
      strokeThickness: 8,
      fontFamily: '"Akaya Telivigala"',
      stroke: "#FF69B4"
    }).setDepth(8);


    this.progressBox = this.add.graphics();
    this.progressBar = this.add.graphics();
    this.progressBox.setDepth(8);
    this.progressBar.setDepth(8);

    this.progressBox.lineStyle(3, 0x0275d8, 1);
    this.progressBox.strokeRect(170, 95, 200, 10);

    this.progressBar.fillStyle(0xFFD700, 1);
    this.progressBar.fillRect(170, 95,  200, 10);



    this.addGameBackground();

    this.player = this.physics.add.sprite(200, gameState.sceneHeight - 300,  'player').setScale(0.2);

    this.physics.add.collider(this.player, this.groundGroup);
    this.player.setGravityY(800);
    this.player.setDepth(6);
    this.player.body.setCollideWorldBounds();
    this.player.setSize(this.player.width / 2, this.player.height - 30);
    this.player.setOffset(this.player.width / 2 - 20, 30);

    this.createAnimations('run', 'player', 0, 5, -1, 12 );

    this.createAnimations('jump', 'player', 0, 0, -1, 1);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.jumpTimes = 2;
    this.jump = 0;

    // Birds SECTION

    this.birdGroup = this.physics.add.group();

    let createBird = () => {
      let myY =  Phaser.Math.Between(100, 300);
      let bird = this.birdGroup.create( gameState.sceneWidth + 100, myY, 'bird').setScale(0.3);
      bird.setVelocityX(-100);
      bird.flipX = true;
      bird.setDepth(6);
      bird.setSize(bird.displayWidth - 10, bird.displayHeight - 10);
    }

    this.createAnimations('fly', 'bird', 0, 8, -1, 7);

    this.birdCreationTime = this.time.addEvent({
      callback: createBird,
      delay: Phaser.Math.Between(2500, 5000),
      callbackScope: this,
      loop: true
    })

    // Coins SECTION

    this.coinGroup = this.physics.add.group();
    let createCoin = () => {
      this.createBirdDrop(this.coinGroup, 'coin');
    }

    this.physics.add.collider(this.coinGroup, this.groundGroup, function(singleCoin){
      singleCoin.setVelocityX(-200);
    });

    this.physics.add.overlap(this.player, this.coinGroup, (player, singleCoin) => {
      singleCoin.destroy();
      gameState.score += 1;
      this.scoreValue.setText(`${gameState.score}`);
      this.hoveringTextScore(player, '1+', "#0000ff");
    })

    this.coinCreationTime = this.time.addEvent({
      callback: createCoin,
      delay: 1000,
      callbackScope: this,
      loop: true
    })


    //Spikes SECTION

    this.spikeGroup = this.physics.add.group();
    function createSpike () {
      this.createBirdDrop(this.spikeGroup, 'spike');
    }

    this.spikeCreationTime = this.time.addEvent({
      callback: createSpike,
      delay: 5000,
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(this.spikeGroup, this.groundGroup, (singleSpike) => {
      singleSpike.setVelocityX(-200);
    });

    this.physics.add.overlap(this.player, this.spikeGroup, (player, singleSpike) => {
      singleSpike.destroy();
      this.hoveringTextScore(player, "Spiked!", '#CCCC00', '#800080');
    });

    // Missiles SECTION

    this.missileGroup = this.physics.add.group();

    this.explosion = this.add.sprite(-100, -100, 'explosion').setScale(0.5).setDepth(8);

    this.createAnimations('explode', 'explosion', 0, 15, 0, 20);

    this.createAnimations('idle', 'explosion', 15, 15, -1, 1);
    this.explosion.play('idle', true);

    this.physics.add.collider(this.player, this.missileGroup, (player, missile) => {
      if(player.body.touching.down && missile.body.touching.up){
        player.setVelocityY(-300);
        missile.setVelocityY(300);
        this.hoveringTextScore(player, "+0.25", "#00ff00");
      }else{
        missile.destroy();
        player.setVelocityY(0);
        this.hoveringTextScore(player, "Damage", "#ff0000", "#ff0000");

        this.explosion.x = player.x;
        this.explosion.y = player.y;
        this.explosion.play('explode', true);
      }
    });

    this.leftBound = this.add.rectangle(-50, 0, 10, gameState.sceneHeight, 0x000000).setOrigin(0);
    this.bottomBound = this.add.rectangle(0, gameState.sceneHeight , gameState.sceneWidth, 10, 0x000000).setOrigin(0);
    this.boundGroup = this.physics.add.staticGroup();
    this.boundGroup.add(this.leftBound);
    this.boundGroup.add(this.bottomBound);

    this.physics.add.collider(this.birdGroup, this.boundGroup, function(singleBird) {
      singleBird.destroy();
    })

    this.physics.add.collider(this.coinGroup, this.boundGroup, function(singleCoin){
      singleCoin.destroy();
    });

    this.physics.add.collider(this.spikeGroup, this.boundGroup, (singleSpike) => {
      singleSpike.destroy();
    })

    this.physics.add.collider(this.missileGroup, this.boundGroup, function(singleMissile) {
      singleMissile.destroy();
    })
  }

  // END of create function above

  createPlatform( group, spriteWidth, myTexture, dist = 0) {
    let platform = group.create(spriteWidth + dist, gameState.sceneHeight, myTexture)
   .setOrigin(0, 1)
   .setScale(0.5);
    if(myTexture === 'ground'){
      platform.setImmovable(true); 
      platform.setSize(platform.displayWidth * 2, platform.displayHeight - 50);
    }

    switch(myTexture){
      case 'ground':
        platform.setDepth(2);
        break;
      case 'plateau':
        platform.setDepth(1);
        break;
      default: 
    }
  }

  updatePlatform(group, spriteWidth, myTexture, dist = 0){
    let child = group.get(spriteWidth - dist, gameState.sceneHeight, myTexture);
    child.setVisible(true);
    child.setActive(true);
    switch(myTexture){
      case 'ground':
        child.setDepth(2);
        break;
      case 'plateau':
        child.setDepth(1);
        break;
      default:
    }
  }

  createAnimations(animKey, spriteKey, startFrame, endFrame, loopTimes, frameRate) {
    return (this.anims.create({
      key: animKey,
      frames: this.anims.generateFrameNumbers(spriteKey, {start: startFrame, end: endFrame}),
      frameRate: frameRate,
      repeat: loopTimes
    }));
  }

  addGameBackground() {
    this.add.image(gameState.sceneWidth / 2, gameState.sceneHeight / 2, 'sky').setScale(0.5);

    this.mountainGroup = this.add.group();
    this.firstMountain = this.mountainGroup.create(0, gameState.sceneHeight, 'mountains').setScale(0.5).setOrigin(0, 1);
    this.mountainWidth = this.firstMountain.displayWidth;
    this.createPlatform(this.mountainGroup, this.mountainWidth, 'mountains');

    this.plateauGroup = this.add.group();
    this.firstPlateau = this.plateauGroup.create(0, gameState.sceneHeight, 'plateau').setScale(0.5).setOrigin(0, 1);
    this.plateauWidth = this.firstPlateau.displayWidth;
    this.createPlatform(this.plateauGroup, this.plateauWidth, 'plateau');

    this.groundGroup = this.physics.add.group();
    this.first = this.groundGroup.create(0, this.scale.height, 'ground')
    .setOrigin(0, 1)
    .setScale(0.5);
    this.first.setImmovable(true);

    this.groundWidth = this.first.displayWidth;
    this.groundHeight = this.first.displayHeight;
    this.first.setSize(this.groundWidth * 2, this.groundHeight - 50);

    this.createPlatform(this.groundGroup, this.groundWidth, 'ground');
  }

  moveBackgroundPlatform(group, platformWidth, myTexture, scrollFactor) {
    group.children.iterate((child) => {
      child.x -= scrollFactor;
      if(child.x < -(child.displayWidth)) {
        group.killAndHide(child);
        this.updatePlatform(group, platformWidth, myTexture, scrollFactor);
      }
    })
  }

  createBirdDrop(group, texture) {
    if(this.birdGroup.getLength() >= 2) {
      let child = this.birdGroup.getChildren()[Phaser.Math.Between(0, this.birdGroup.getLength() - 1)];
      let drop = group.create(child.x, child.y, texture).setScale(0.05);
      if(texture === 'spike') {
        drop.setScale(0.1)
      }
      drop.setGravityY(700);
      drop.setGravityX(0);
      drop.setDepth(6);
      drop.setBounce(1);
      drop.setSize( drop.width - 200, drop.height - 200);
    }
  }

  createMissile(height, texture) {
    let missile = this.missileGroup.create(gameState.sceneWidth + 100, height, texture);
    missile.setScale(0.1);
    missile.setDepth(6);
    missile.setSize(missile.width, missile.height - 300);
    missile.setOffset(0, 150);
  }
  
  hoveringTextScore(player, message, strokeColor, fillColor = '#ffffff'){
    let singleScoreText = this.add.text(player.x, player.y, message, {
      fontSize: '30px',
      fill: fillColor,
      fontFamily: '"Akaya Telivigala"',
      strokeThickness: 2,
      stroke: strokeColor
    }).setDepth(7);
    singleScoreText.setAlpha(1);

    this.tweens.add({
      targets: singleScoreText,
      repeat: 0,
      duration: 1000,
      ease: 'linear',
      alpha: 0,
      y: singleScoreText.y - 100,
      onComplete: function() {
        singleScoreText.destroy();
      }
    })
  }

  update(time, delta) {

    this.moveBackgroundPlatform(this.mountainGroup, this.mountainWidth, 'mountains', 0.5);
    this.moveBackgroundPlatform(this.plateauGroup, this.plateauWidth, 'plateau', 1.5);
    this.moveBackgroundPlatform(this.groundGroup, this.groundWidth, 'ground', 4);

    this.player.anims.play('run', true);
    this.birdGroup.children.iterate((child) => {
      child.anims.play('fly', true);
    })

    this.missileGroup.children.iterate((child) => {
      child.x -= 5;
    })

    this.timer += delta;
    if(this.timer >= 5000) {
      this.createMissile(415, 'missile');
      this.timer = 0;
    }
    
    this.secondTimer += delta;
    if(this.secondTimer >= 7000){
      this.createMissile(300, 'missile2');
      this.secondTimer = 0;
    }

    if(Phaser.Input.Keyboard.JustDown(this.cursors.up)){
      if(this.player.body.touching.down || (this.jump < this.jumpTimes && (this.jump > 0))){
        this.player.setVelocityY(-400);
        
        if((this.player.body.touching.down)){
          this.jump = 0;
        }
        this.jump ++;
      }
    }

    if(!this.player.body.touching.down){
      this.player.anims.play('jump', true);
    }

    if(this.cursors.down.isDown) {
      if(!this.player.body.touching.down) {
        this.player.setGravityY(1300);
      }
    }

    if(this.player.body.touching.down){
      this.player.setGravityY(800)
    }

  }
}

export default Game;
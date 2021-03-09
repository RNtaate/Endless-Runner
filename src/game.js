import Phaser from 'phaser';
import {gameState} from './boot';

class Game extends Phaser.Scene {
  constructor(){
    super({key: 'Game'});
  }

  preload() {
   
  }

  create() {

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
  }

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
  
  update() {

    this.moveBackgroundPlatform(this.mountainGroup, this.mountainWidth, 'mountains', 0.5);
    this.moveBackgroundPlatform(this.plateauGroup, this.plateauWidth, 'plateau', 1.5);
    this.moveBackgroundPlatform(this.groundGroup, this.groundWidth, 'ground', 4);

    this.player.anims.play('run', true);
    this.birdGroup.children.iterate((child) => {
      child.anims.play('fly', true);
    })

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
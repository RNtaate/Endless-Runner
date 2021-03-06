import Phaser from 'phaser';

class Preload extends Phaser.Scene {
   constructor() {
     super({key: 'Preload'});
   }

   preload() {

   }

   create() {
     this.add.text(100, 200, "Preload Scene", {
       font: '30px monospace',
       fill: "#ffffff"
     })
   }
}

export default Preload;
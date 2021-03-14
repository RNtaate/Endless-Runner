import Phaser from 'phaser';

export default class CustomButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, firstImage, hoverImage) {
    super(scene, x, y);

    this.firstImage = scene.add.image(0, 0, firstImage);
    this.hoverImage = scene.add.image(0, 0, hoverImage);

    this.add(this.firstImage);
    this.add(this.hoverImage);

    this.hoverImage.setVisible(false);

    this.setSize(this.firstImage.width, this.firstImage.height);

    this.setInteractive().on('pointerover', () => {
      this.firstImage.setVisible(false);
      this.hoverImage.setVisible(true);
    }).on('pointerout', () => {
      this.firstImage.setVisible(true);
      this.hoverImage.setVisible(false);
    });
  }
}
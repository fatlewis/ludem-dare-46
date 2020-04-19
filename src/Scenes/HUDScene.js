import 'phaser';

export default class HUDScene extends Phaser.Scene {
  constructor() {
    super('HUD');
  }

  create() {
    this.button = this.scene.scene.add.sprite(150, 550, 'menuButton').setInteractive({ useHandCursor: true });

    const bgScene = this.scene.settings.data.backgroundScene;

    this.button.on('pointerdown', () => {
      bgScene.scene.stop();
      this.scene.start('Title');
    });

    this.button.on('pointerover', () => {
      this.button.setTexture('menuButtonPressed');
    });

    this.button.on('pointerout', () => {
      this.button.setTexture('menuButton');
    });
  }
}

import 'phaser';

export default class HUDScene extends Phaser.Scene {
  constructor() {
    super('HUD');
  }

  create() {
    this.button = this.scene.scene.add.sprite(720, 50, 'menuButton').setInteractive({ useHandCursor: true });

    this.button.on('pointerdown', () => {
      this.fadeToScene('Title');
    });

    this.button.on('pointerover', () => {
      this.button.setTexture('menuButtonPressed');
    });

    this.button.on('pointerout', () => {
      this.button.setTexture('menuButton');
    });
  }

  fadeToScene(scene) {
    const bgScene = this.scene.settings.data.backgroundScene;
    this.cameras.main.fadeOut(500);
    bgScene.cameras.main.fadeOut(500);
    bgScene.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        bgScene.scene.stop();
        this.scene.start(scene);
      },
    );
  }
}

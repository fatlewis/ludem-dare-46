import 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, targetScene, fadeToScene = false) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.sprite(0, 0, key1).setInteractive({ useHandCursor: true });

    this.add(this.button);

    this.button.on('pointerdown', () => {
      if (fadeToScene) {
        this.fadeToScene(targetScene);
      } else {
        this.scene.scene.start(targetScene);
      }
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(key2);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(key1);
    });

    this.scene.add.existing(this);
  }

  fadeToScene(scene) {
    this.scene.cameras.main.fadeOut(500);
    this.scene.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.scene.start(scene);
      },
    );
  }
}

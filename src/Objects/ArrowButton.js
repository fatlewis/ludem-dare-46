import 'phaser';

export default class ArrowButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, direction, frames, option) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.scene.model = this.scene.sys.game.globals.model;

    this.button = this.scene.add.image(0, 0, key1).setInteractive({ useHandCursor: true });

    this.add(this.button);
    let frameCount;

    this.button.on('pointerdown', () => {
      if (option == 'colour') { 
        frameCount = this.scene.model.colourFrame;
      }
      else if (option == 'accessory') {
        frameCount = this.scene.model.accessoryFrame;
      }

      if (direction == 'left') { 
        frameCount = (frameCount - 1) % frames;
        if (frameCount < 0) { frameCount += frames; }
      }

      if (direction == 'right') {
        frameCount = (frameCount + 1) % 9;
      }

      if (option == 'colour') { 
        this.scene.model.colourFrame = frameCount;
      }
      else if (option == 'accessory') {
        this.scene.model.accessoryFrame = frameCount;
      }
      console.log(this.scene.model.colourFrame);

    });

    this.button.on('pointerover', () => {
      this.button.setTexture(key2);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(key1);
    });

    this.scene.add.existing(this);
  }
}

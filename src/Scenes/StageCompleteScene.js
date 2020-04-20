import 'phaser';
import Button from '../Objects/Button';

export default class StageCompleteScene extends Phaser.Scene {
  constructor() {
    super('StageComplete');
  }

  create() {
    const { config } = this.game;
    this.model = this.sys.game.globals.model;
    console.log(this.model);

    this.add.image(config.width / 2, config.height / 2, 'background-stageComplete');

    this.button = this.scene.scene.add.sprite(550, 500, 'continueButton').setInteractive({ useHandCursor: true });

    this.button.on('pointerdown', () => {
      if (this.model.level < 4) {
        this.model.level += 1;
        this.scene.start('Game');
      } else {
        this.scene.start('MissionSuccess');
      }
    });

    this.button.on('pointerover', () => {
      this.button.setTexture('continueButtonPressed');
    });

    this.button.on('pointerout', () => {
      this.button.setTexture('continueButton');
    });
  }
}

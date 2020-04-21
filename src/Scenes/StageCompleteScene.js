import 'phaser';
import Balloon from '../Objects/Balloon';
import Rope from '../Objects/Rope';

export default class StageCompleteScene extends Phaser.Scene {
  constructor() {
    super('StageComplete');
  }

  create() {
    const { config } = this.game;
    this.model = this.sys.game.globals.model;

    this.add.image(config.width / 2, config.height / 2, 'background-stageComplete');

    this.button = this.scene.scene.add.sprite(550, 500, 'continueButton').setInteractive({ useHandCursor: true });

    this.button.on('pointerdown', () => {
      if (this.model.level < 4) {
        this.model.level += 1;
        this.fadeToScene('Game');
      } else {
        this.fadeToScene('MissionSuccess');
      }
    });

    this.button.on('pointerover', () => {
      this.button.setTexture('continueButtonPressed');
    });

    this.button.on('pointerout', () => {
      this.button.setTexture('continueButton');
    });

    const x = 170;
    const y = 320;
    const balloonContainer = new Balloon(this, x, y, undefined, { yGravity: -1 });
    this.add.existing(balloonContainer);
    this.balloon = balloonContainer.matterObject;

    this.ropeAnchor = this.matter.add.image(x, y + 100, 'nametag', null, {
      mass: 50000,
      ignoreGravity: false,
      frictionAir: 1,
      fixedRotation: true,
      isStatic: true,
    });

    this.rope = Rope.createBetweenObjects(this, this.balloon, this.ropeAnchor, 15, {
      pointA: { x: -5, y: 70 },
      pointB: { x: 0, y: -12 },
    });
    this.graphics = this.add.graphics();
  }

  fadeToScene(scene) {
    this.cameras.main.fadeOut(500);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.start(scene);
      },
    );
  }

  update() {
    if (this.ropeAnchor.active) {
      this.graphics.clear();
      this.graphics.lineStyle(1, 0x000000, 1);
      this.rope.drawCurve(this);
    }
  }
}

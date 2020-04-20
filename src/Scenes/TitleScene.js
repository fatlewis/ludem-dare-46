import 'phaser';
import Button from '../Objects/Button';
import Balloon from '../Objects/Balloon';
import Rope from '../Objects/Rope';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    const { config } = this.game;

    this.add.image(config.width / 2, config.height / 2, 'background');

    // Game - Head to Rocket Select page
    this.gameButton = new Button(this, config.width * 0.75, config.height / 2 - 100, 'playButton', 'playButtonPressed', 'BalloonSelect');

    // Options
    this.optionsButton = new Button(this, config.width * 0.75, config.height / 2, 'optionsButton', 'optionsButtonPressed', 'Options');

    // About
    this.aboutButton = new Button(this, config.width * 0.75, config.height / 2 + 100, 'aboutButton', 'aboutButtonPressed', 'About');

    // credits
    this.creditsButton = new Button(this, config.width * 0.75, config.height / 2 + 200, 'creditsButton', 'creditsButtonPressed', 'Credits');

    this.model = this.sys.game.globals.model;

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.game.registry.get('bgMusic').play();
      this.model.bgMusicPlaying = true;
    }

    this.graphics = this.add.graphics();
    this.matter.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
    this.balloons = [
      new Balloon(this, 75, 400, null, { faceFrame: 1, baseFrame: 1, accessoryFrame: 0, yGravity: -3 }),
      new Balloon(this, 100, 500, null, { faceFrame: 1, baseFrame: 2, accessoryFrame: 0, yGravity: -3 }),
      new Balloon(this, 150, 400, null, { faceFrame: 1, baseFrame: 3, accessoryFrame: 0, yGravity: -3 }),
      new Balloon(this, 200, 500, null, { faceFrame: 1, baseFrame: 4, accessoryFrame: 0, yGravity: -3 }),
      new Balloon(this, 250, 500, null, { faceFrame: 1, baseFrame: 5, accessoryFrame: 0, yGravity: -3 }),
      new Balloon(this, 300, 400, null, { faceFrame: 1, baseFrame: 6, accessoryFrame: 0, yGravity: -3 }),
    ];

    this.ropeAnchor = this.matter.add.image(175, 575, 'rope', null, {
      mass: 50000,
      ignoreGravity: false,
      frictionAir: 1,
      fixedRotation: true,
      isStatic: true,
    });

    this.ropes = [];
    this.balloons.forEach(balloon => {
      this.add.existing(balloon);
      this.ropes.push(
        Rope.createBetweenObjects(
          this,
          balloon.matterObject,
          this.ropeAnchor,
          15,
          { pointA: { x:-5, y:70 }}
        )
      )
    });
  }  

  update() {
    if (this.ropeAnchor.active) {
      this.graphics.clear();
      this.graphics.lineStyle(1, 0x000000, 1);
      this.ropes.forEach(rope => rope.drawCurve(this));
    }
  }
}

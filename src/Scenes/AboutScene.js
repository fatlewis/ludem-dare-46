import 'phaser';
import Button from '../Objects/Button';

export default class AboutScene extends Phaser.Scene {
  constructor() {
    super('About');
  }

  create() {
    const { config } = this.game;
    this.model = this.sys.game.globals.model;

    this.add.image(config.width / 2, config.height / 2, 'background-about');

    this.menuButton = new Button(this, 550, 500, 'menuButton', 'menuButtonPressed', 'Title');

    this.addBees();
  }

  addBees() {
    const { matter } = this;

    this.bee1 = matter.add.image(1994, 207, 'bee', null, {
      ignoreGravity: true,
      ignorePointer: true,
      fixedRotation: true,
      frictionAir: 1,
    });
    this.bee2 = matter.add.image(1994, 207, 'bee', null, {
      ignoreGravity: true,
      ignorePointer: true,
      fixedRotation: true,
      frictionAir: 1,
    });

    const beePoints1 = [
      new Phaser.Math.Vector2(100, 150),
      new Phaser.Math.Vector2(125, 160),
      new Phaser.Math.Vector2(150, 180),
      new Phaser.Math.Vector2(130, 190),
      new Phaser.Math.Vector2(110, 180),
      new Phaser.Math.Vector2(110, 170),
      new Phaser.Math.Vector2(155, 160),
      new Phaser.Math.Vector2(100, 150),
    ];
    const beePoints2 = [
      new Phaser.Math.Vector2(180, 300),
      new Phaser.Math.Vector2(185, 305),
      new Phaser.Math.Vector2(190, 315),
      new Phaser.Math.Vector2(185, 305),
      new Phaser.Math.Vector2(200, 320),
      new Phaser.Math.Vector2(195, 330),
      new Phaser.Math.Vector2(190, 335),
    ];

    this.beePath1 = new Phaser.Curves.Spline(beePoints1);
    this.beePath2 = new Phaser.Curves.Spline(beePoints2);

    this.follower1 = { t: 0, vec: new Phaser.Math.Vector2() };
    this.follower2 = { t: 0, vec: new Phaser.Math.Vector2() };

    this.tweens.add({
      targets: this.follower1,
      t: 1,
      ease: 'Linear',
      duration: 10000,
      repeat: -1,
    });
    this.tweens.add({
      targets: this.follower2,
      t: 1,
      ease: 'Sine.easeInOut',
      yoyo: true,
      duration: 8000,
      repeat: -1,
    });
  }

  update() {
    const point1 = this.beePath1.getPoint(this.follower1.t, this.follower1.vec);
    const point2 = this.beePath2.getPoint(this.follower2.t, this.follower2.vec);
    this.bee1.x = point1.x;
    this.bee1.y = point1.y;
    this.bee2.x = point2.x;
    this.bee2.y = point2.y;
  }
}

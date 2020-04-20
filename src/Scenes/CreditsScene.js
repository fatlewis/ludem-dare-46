import 'phaser';
import Button from '../Objects/Button';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }


  create() {
    const { config } = this.game;

    this.add.image(config.width / 2, config.height / 2, 'background-credits');

    this.menuButton = new Button(this, 550, 500, 'menuButton', 'menuButtonPressed', 'Title');

    this.addBirds();
  }

  addBirds() {
    const { matter } = this;

    this.scene.scene.anims.create({
      key: 'flyGreen',
      frames: this.scene.scene.anims.generateFrameNumbers('birdGreen', { start: 0, end: -1 }),
      frameRate: 10,
      repeat: -1,
    });
    this.scene.scene.anims.create({
      key: 'flyYellow',
      frames: this.scene.scene.anims.generateFrameNumbers('birdYellow', { start: 0, end: -1 }),
      frameRate: 10,
      repeat: -1,
    });

    const birdConfig = {
      ignoreGravity: true,
      ignorePointer: true,
      fixedRotation: true,
      frictionAir: 1,
    };

    this.bird1 = matter.add.sprite(1994, 207, 'birdGreen', 0, birdConfig).anims.play('flyGreen', true).toggleFlipX();
    this.bird2 = matter.add.sprite(1994, 207, 'birdYellow', 0, birdConfig).anims.play('flyYellow', true);

    const birdPoints1 = [
      new Phaser.Math.Vector2(1000, 100),
      new Phaser.Math.Vector2(550, 400),
      new Phaser.Math.Vector2(-150, 150),
    ];
    const birdPoints2 = [
      new Phaser.Math.Vector2(-200, 300),
      new Phaser.Math.Vector2(200, 550),
      new Phaser.Math.Vector2(800, -500),
    ];

    this.birdPath1 = new Phaser.Curves.Spline(birdPoints1);
    this.birdPath2 = new Phaser.Curves.Spline(birdPoints2);

    this.follower1 = { t: 0, vec: new Phaser.Math.Vector2() };
    this.follower2 = { t: 0, vec: new Phaser.Math.Vector2() };

    this.tweens.add({
      targets: this.follower1,
      t: 1,
      ease: 'Sine.easeInOut',
      duration: 4000,
      repeat: -1,
      delay: 0,
    });
    this.tweens.add({
      targets: this.follower2,
      t: 1,
      ease: 'Sine.easeInOut',
      duration: 4000,
      repeat: -1,
      delay: 2000,
    });
  }

  update() {
    const point1 = this.birdPath1.getPoint(this.follower1.t, this.follower1.vec);
    const point2 = this.birdPath2.getPoint(this.follower2.t, this.follower2.vec);
    this.bird1.x = point1.x;
    this.bird1.y = point1.y;
    this.bird2.x = point2.x;
    this.bird2.y = point2.y;
  }
}

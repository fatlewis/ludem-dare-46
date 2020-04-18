import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.model = this.sys.game.globals.model;
    const { matter } = this;
    matter.world.setBounds();
    matter.add.mouseSpring();
    this.addBalloon();
  }

  addBalloon() {
    const { matter } = this;

    this.balloon = matter.add.image(400, 200, 'balloon', null, {
      shape: {
        type: 'circle',
        radius: 32,
      },
      mass: 1,
      ignorePointer: true,
      gravityScale: { y: -10 },
    }).setInteractive();

    this.balloon.on('pointerdown', () => {
      this.popBalloon();
    });

    const firstRopeSection = matter.add.image(400, 200, 'rope', null, {
      mass: 1,
      ignorePointer: true,
    });
    matter.add.joint(this.balloon, firstRopeSection, 0, 1, { pointA: { x: 0, y: 35 } });

    let prev = firstRopeSection;
    const segmentCount = 8;
    for (let i = 0; i < segmentCount; i += 1) {
      const ropeSection = matter.add.image(400, 235 + (i * 15), 'rope', null, {
        mass: 1,
        ignorePointer: true,
      });
      matter.add.joint(prev, ropeSection, 15);
      prev = ropeSection;
    }

    const lastRopeSection = matter.add.image(400, 235 + (segmentCount * 15), 'rope', null, {
      mass: 50000,
      ignoreGravity: true,
      frictionAir: 1,
      fixedRotation: true,
    });
    matter.add.joint(prev, lastRopeSection, 15);
  }

  popBalloon() {
    this.balloon.destroy();
  }

  update() {
    this.model = this.sys.game.globals.model;
  }
}

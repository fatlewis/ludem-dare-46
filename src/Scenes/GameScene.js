import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const { config } = this.game;
    this.model = this.sys.game.globals.model;

    const { matter } = this;
    matter.world.setBounds(0, 0, config.width, config.height);

    matter.add.image(100, 200, 'box', null, {
      ignoreGravity: true,
      plugin: {
        attractors: [
          (bodyA, bodyB) => {
            if (Math.abs(bodyA.position.y - bodyB.position.y) < 100
                        && bodyA.position.x < bodyB.position.x) {
              return { x: 0.001, y: 0 };
            }

            return { x: 0, y: 0 };
          }],
      },
    });

    const balloon = matter.add.image(400, 200, 'balloon', null, {
      shape: {
        type: 'circle',
        radius: 32,
      },
      mass: 1,
      ignorePointer: true,
      gravityScale: { x: 1, y: -1 },
    });

    const firstRope = this.matter.add.sprite(400, 231.5, 'rope', null, {
      ignoreGravity: true,
      ignorePointer: true,
    });
    matter.add.joint(balloon, firstRope, 35);

    let prev = firstRope;
    let i;
    for (i = 0; i < 10; i += 1) {
      const ropeSection = this.matter.add.image(400, 241.5 + (i * 10), 'rope', null, {
        ignoreGravity: true,
        ignorePointer: true,
      });
      matter.add.joint(prev, ropeSection, 13);
      prev = ropeSection;
    }

    const lastRope = this.matter.add.image(400, 251.5 + (i * 10), 'rope', null, {
      mass: 50000,
      ignoreGravity: true,
      frictionAir: 1,
      fixedRotation: true,
    });
    matter.add.joint(prev, lastRope, 20);

    matter.add.mouseSpring();
  }

  update() {
    this.model = this.sys.game.globals.model;
  }
}

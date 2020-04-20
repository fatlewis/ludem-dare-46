import 'phaser';

export default class Fan extends Phaser.GameObjects.Container {
  constructor(scene, x, y, color, direction, strength) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    const colorMap = {
      green: 'fanGreen',
      olive: 'fanOlive',
      orange: 'fanOrange',
      pink: 'fanPink',
      red: 'fanRed',
      teal: 'fanTeal',
      yellow: 'fanYellow',
    };
    const textureKey = colorMap[color];

    const strengthMap = {
      low: 0.0001,
      medium: 0.002,
      high: 0.005,
    };
    const strengthValue = strengthMap[strength];

    const directionMap = {
      left: {
        activeCondition: (a, b) => (Math.abs(a.position.y - b.position.y) < 100
                  && b.position.x < a.position.x),
        forceVector: { x: -strengthValue, y: 0 },
      },
      right: {
        activeCondition: (a, b) => (Math.abs(a.position.y - b.position.y) < 100
                  && a.position.x < b.position.x),
        forceVector: { x: strengthValue, y: 0 },
      },
    };
    const condition = directionMap[direction].activeCondition;
    const { forceVector } = directionMap[direction];

    this.scene.anims.create({
      key: 'spin',
      frames: this.scene.anims.generateFrameNumbers(textureKey, { start: 0, end: -1 }),
      frameRate: 10,
      repeat: -1,
    });

    this.fan = this.scene.matter.add.sprite(x, y, textureKey, 0, {
      ignoreGravity: true,
      fixedRotation: true,
      frictionAir: 1,
      plugin: {
        attractors: [
          (bodyA, bodyB) => {
            if (condition(bodyA, bodyB)) {
              return forceVector;
            }
            return undefined;
          }],
      },
    }).anims.play('spin', true);
  }
}

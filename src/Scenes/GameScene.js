import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const { config } = this.game;

  addBalloon() {
    const { matter } = this;
    this.levelBackground = this.add.image(0, 0, 'background-level1').setOrigin(0, 0);
    matter.world.setBounds(0, -40, this.levelBackground.width, config.height);

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

    this.ropeAnchor = this.matter.add.image(400, 251.5 + (i * 10), 'rope', null, {
      mass: 50000,
      ignoreGravity: false,
      frictionAir: 1,
      fixedRotation: true,
    });
    this.ropeAnchor.setInteractive({ useHandCursor: true });
    matter.add.joint(prev, this.ropeAnchor, 20);

  popBalloon() {
    this.balloon.destroy();
  }

  update() {
    this.recenterCamera();
  }

  recenterCamera() {
    const halfViewportWidth = this.game.config.width / 2;
    const screenCenterX = Math.round(this.cameras.main.scrollX + halfViewportWidth);
    const ropeAnchorX = Math.round(this.ropeAnchor.x);

    const isOutsideCameraCenter = GameScene.isOutsideCameraCenter(
      ropeAnchorX,
      screenCenterX,
      150,
    );
    if (isOutsideCameraCenter && !this.input.activePointer.leftButtonDown()) {
      const moveDistance = GameScene.getMoveDistance(ropeAnchorX, screenCenterX);

      const newScrollX = this.cameras.main.scrollX + moveDistance;
      if (
        (newScrollX > 0)
        && (newScrollX < (this.levelBackground.width - this.game.config.width))
      ) {
        this.cameras.main.scrollX += moveDistance;
      }
    }
  }

  static isOutsideCameraCenter(xValue, screenCenterX, offsetTolerationSize) {
    if (
      xValue >= (screenCenterX - offsetTolerationSize)
      && xValue <= (screenCenterX + offsetTolerationSize)
    ) {
      return false;
    }
    return true;
  }

  static getMoveDistance(ropeAnchorX, screenCenterX) {
    const moveDistance = Math.min(
      Math.abs(ropeAnchorX - screenCenterX),
      5,
    );
    const ropeAnchorIsRightOfCenter = ropeAnchorX > screenCenterX;
    return ropeAnchorIsRightOfCenter ? moveDistance : -moveDistance;
  }
}

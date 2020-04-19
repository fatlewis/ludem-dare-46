import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const { config } = this.game;

    const { matter } = this;
    this.levelBackground = this.add.image(0, 0, 'background-level1').setOrigin(0, 0);
    matter.world.setBounds(0, -40, this.levelBackground.width, config.height);

    const balloon = matter.add.image(400, 200, 'balloon', null, {
      shape: {
        type: 'circle',
        radius: 32,
      },
      mass: 0.1,
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

    this.ropeAnchor = this.matter.add.image(400, 251.5 + (i * 10), 'rope', null, {
      mass: 50000,
      ignoreGravity: false,
      frictionAir: 1,
      fixedRotation: true,
    });
    matter.add.joint(prev, this.ropeAnchor, 20);

    matter.add.mouseSpring();
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

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
    matter.add.mouseSpring();

    matter.add.image(100, 200, 'fan-1', null, {
      ignoreGravity: true,
      fixedRotation: true,
      frictionAir: 1,
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

    this.addBalloon();
    this.addSpikeyThings();

    this.debugMode = false;
    this.input.on('pointerdown', () => {
      if (this.debugMode) {
        console.log(this.input.x, this.input.y);
      }
    });
  }

  // for use in the chrome dev console via the command:
  // game.scene.scenes[5].toggleDebugMode()
  toggleDebugMode() {
    this.debugMode = !this.debugMode;
  }

  addBalloon() {
    const { matter } = this;
    this.model = this.sys.game.globals.model;

    this.balloon = matter.add.sprite(400, 200, 'balloons', this.model.colourframe, {
      shape: {
        type: 'circle',
        radius: 32,
      },
      mass: 1,
      ignorePointer: true,
      gravityScale: { y: -10 },
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

    this.ropeAnchor = this.matter.add.image(400, 251.5 + (segmentCount * 10), 'rope', null, {
      mass: 50000,
      ignoreGravity: false,
      frictionAir: 1,
      fixedRotation: true,
    });
    this.ropeAnchor.setInteractive({ useHandCursor: true });
    matter.add.joint(prev, this.ropeAnchor, 20);

    this.accessories = this.add.sprite(400,200, 'accessories', this.model.accessoryframe);
    this.face = this.add.image(400, 200, 'face');


  }

  addSpikeyThings() {
    const { matter } = this;

    this.spikeys = []
    this.spikeys.push(matter.add.image(500, 450, 'cactus', null, {
      isStatic: true
    }));
    this.spikeys.push(matter.add.image(988, 320, 'knives', null, {
      isStatic: true
    }));

    // Add the collision detection callback for the balloon.
    this.spikeys.forEach((s) => {
      this.matterCollision.addOnCollideStart({
        objectA: this.balloon,
        objectB: s,
        callback: () => {this.popBalloon()},
        context: this
      });
    });
  }

  popBalloon() {
    this.face.destroy();
    this.accessories.destroy();
    this.balloon.destroy();
    this.ropeAnchor.setMass(1).setFrictionAir(0).setFixedRotation(false);
  }

  update() {
    this.recenterCamera();
    if (this.balloon.active) {
      this.accessories.x = this.balloon.x;
      this.accessories.y = this.balloon.y;
      this.face.x = this.balloon.x;
      this.face.y = this.balloon.y;
    }
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

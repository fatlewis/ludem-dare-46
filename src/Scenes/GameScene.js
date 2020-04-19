import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const { config } = this.game;
    const { matter } = this;
    this.levelBackground = this.add.image(0, 0, 'background-level1').setOrigin(0, 0);
    this.graphics = this.add.graphics();
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
    this.addEndZone();

    this.debugMode = false;
    this.input.on('pointerdown', () => {
      if (this.debugMode) {
        // eslint-disable-next-line no-console
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

    const balloonBase = this.add.sprite(0, 0, 'balloons', this.model.colourFrame);
    const balloonFace = this.add.image(0, 0, 'face');
    const balloonAccessories = this.add.sprite(0, 0, 'accessories', this.model.accessoryframe);
    const balloonContainer = this.add.container(
      400,
      200,
      [balloonBase, balloonFace, balloonAccessories],
    );

    this.balloon = matter.add.gameObject(balloonContainer, {
      position: { x: 400, y: 200 },
      vertices: [
        { x: 47, y: 0 },
        { x: 76, y: 11 },
        { x: 90, y: 31 },
        { x: 94, y: 59 },
        { x: 86, y: 91 },
        { x: 70, y: 112 },
        { x: 46, y: 125 },
        { x: 22, y: 112 },
        { x: 7, y: 91 },
        { x: 0, y: 59 },
        { x: 5, y: 31 },
        { x: 18, y: 11 },
      ],
      mass: 1,
      ignorePointer: true,
      gravityScale: { y: -10 },
    });

    this.ropeSections = [];

    const x = 400; let
      y = 200;
    const firstRopeSection = matter.add.image(x, y, 'rope', null, {
      mass: 1,
      ignorePointer: true,
    }).setVisible(false);
    matter.add.joint(this.balloon, firstRopeSection, 0, 1, { pointA: { x: 0, y: 66.5 } });
    this.ropeSections.push(firstRopeSection);

    let prev = firstRopeSection;
    const segmentCount = 8;
    for (let i = 0; i < segmentCount; i += 1) {
      y = 235 + (i * 15);
      const ropeSection = matter.add.image(x, y, 'rope', null, {
        mass: 1,
        ignorePointer: true,
        render: { opacity: 0 },
      }).setVisible(false);
      matter.add.joint(prev, ropeSection, 15);
      this.ropeSections.push(ropeSection);
      prev = ropeSection;
    }

    y = 251.5 + (segmentCount * 10);
    this.ropeAnchor = this.matter.add.image(x, y, 'rope', null, {
      mass: 50000,
      ignoreGravity: true,
      frictionAir: 1,
      fixedRotation: true,
    });
    this.ropeAnchor.setInteractive({ useHandCursor: true });
    this.ropeSections.push(this.ropeAnchor);
    matter.add.joint(prev, this.ropeAnchor, 20);
  }

  addSpikeyThings() {
    const { matter } = this;

    this.spikeys = [];
    this.spikeys.push(matter.add.image(500, 450, 'cactus', null, {
      isStatic: true,
    }));
    this.spikeys.push(matter.add.image(988, 320, 'knives', null, {
      isStatic: true,
    }));

    // Add the collision detection callback for the balloon.
    this.spikeys.forEach((s) => {
      this.matterCollision.addOnCollideStart({
        objectA: this.balloon,
        objectB: s,
        callback: () => { this.popBalloon(); },
        context: this,
      });
    });
  }

  addEndZone() {
    const endZoneRectangle = this.add.rectangle(
      this.levelBackground.width,
      this.game.config.height / 2,
      1,
      this.game.config.height,
      0x000000,
    );
    this.endZone = this.matter.add.gameObject(endZoneRectangle, { isStatic: true });
    this.matterCollision.addOnCollideStart({
      objectA: this.balloon,
      objectB: this.endZone,
      callback: () => {
        this.startGoalSequence();
      },
    });
  }

  popBalloon() {
    this.balloon.destroy();
    this.ropeAnchor.setMass(1).setFrictionAir(0).setFixedRotation(false);
  }

  getRopePoints() {
    const points = [];
    this.ropeSections.forEach((p) => {
      points.push(new Phaser.Math.Vector2(p.x, p.y));
    });
    return points;
  }

  update() {
    if (this.balloon.active) {
      this.ropeCurve = new Phaser.Curves.Spline(this.getRopePoints());
      this.graphics.clear();
      this.graphics.lineStyle(1, 0x000000, 1);
      this.ropeCurve.draw(this.graphics, 64);
    }

    if (this.cameras.main) {
      this.recenterCamera();
    }
  }

  startGoalSequence() {
    const titleScene = this.scene.get('Title');
    titleScene.events.once('transitioncomplete', () => {
      titleScene.cameras.main.fadeIn(500);
    });
    this.endZone.destroy();
    this.cameras.main.fadeOut(500);
    this.scene.transition({
      duration: 500,
      target: 'Title',
    });
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
    if (isOutsideCameraCenter) { // } && !this.input.activePointer.leftButtonDown()) {
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

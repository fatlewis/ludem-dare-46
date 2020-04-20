import 'phaser';
import Fan from '../Objects/Fan';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const { config } = this.game;
    const { matter } = this;

    this.scene.launch('HUD', { backgroundScene: this });

    this.model = this.sys.game.globals.model;
    switch (this.model.level) {
      case 1:
        this.addLevel1();
        break;
      case 2:
        this.addLevel2();
        break;
    }

    matter.world.setBounds(0, -40, this.levelBackground.width, config.height);
    this.graphics = this.add.graphics();
    matter.add.mouseSpring();


    this.debugMode = false;
    this.input.on('pointerdown', () => {
      if (this.debugMode) {
        // eslint-disable-next-line no-console
        console.log(this.cameras.main.scrollX + this.input.x, this.input.y);
      }
    });
  }

  // for use in the chrome dev console via the command:
  // game.scene.scenes[5].toggleDebugMode()
  toggleDebugMode() {
    this.debugMode = !this.debugMode;
  }

  addLevel1() {
    this.levelBackground = this.add.image(0, 0, 'background-level1').setOrigin(0, 0);
    this.addFan();
    this.addBalloon();
    this.addLevel1SpikeyThings();
    this.addEndZone();
  }

  addLevel2() {
    this.levelBackground = this.add.image(0, 0, 'background-level2').setOrigin(0, 0);
    this.addBalloon();
    this.addLevel2SpikeyThings();
    this.addEndZone();
  }

  addFan() {
    const fan = new Fan(this, 100, 100, 'green', 'right', 'medium');

    const particles = this.add.particles('rope');
    const emitter = particles.createEmitter({
        speed: 100,
        x: fan.x,
        y: { min: fan.y -60, max: fan.y +50 },
        scale: { start: 1, end: 0 },
        //angle will need to be 180 for left facing fans
        angle: 0,
        blendMode: 'ADD'
    });

  }

  addBalloon() {
    const { matter } = this;
    this.model = this.sys.game.globals.model;

    const balloonBase = this.add.sprite(0, 0, 'balloons', this.model.colourFrame);
    const balloonFace = this.add.sprite(0, 0, 'face', this.model.faceFrame);
    const balloonAccessories = this.add.sprite(0, 0, 'accessories', this.model.accessoryFrame);
    const balloonHair = this.add.sprite(0, 0, 'hairstyles', this.model.hairFrame);
    const balloonContainer = this.add.container(
      400,
      200,
      [balloonBase, balloonFace, balloonAccessories, balloonHair],
    );

    this.balloon = matter.add.gameObject(balloonContainer, {
      position: { x: 400, y: 200 },
      vertices: [
        { x: 42, y: 8 },
        { x: 71, y: 19 },
        { x: 85, y: 39 },
        { x: 89, y: 67 },
        { x: 81, y: 99 },
        { x: 65, y: 120 },
        { x: 41, y: 133 },
        { x: 17, y: 120 },
        { x: 2, y: 99 },
        { x: -5, y: 67 },
        { x: 0, y: 39 },
        { x: 13, y: 19 },
      ],
      mass: 1,
      ignorePointer: true,
      gravityScale: { y: -10 },
    });

    this.ropeSections = [];

    const x = 400;
    let y = 200;
    const firstRopeSection = matter.add.image(x, y, 'rope', null, {
      mass: 1,
      ignorePointer: true,
    }).setVisible(false);
    const balloonNeckPoint = { x: -5, y: 70 };
    matter.add.joint(this.balloon, firstRopeSection, 0, 1, { pointA: balloonNeckPoint });
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

  addLevel1SpikeyThings() {
    const { matter } = this;

    this.spikeys = [];
    this.spikeys.push(matter.add.image(500, 450, 'cactus', null, {isStatic: true,}));
    this.spikeys.push(matter.add.image(988, 320, 'knives', null, {isStatic: true,}));

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

  addLevel2SpikeyThings() {
    const { matter } = this;

    this.spikeys = [];
    this.spikeys.push(matter.add.image(1886, 467, 'tree1', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(1744, 352, 'tree2', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(1616, 460, 'tree3', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(3049, 324, 'tree4', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(635, 504, 'ironFence', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(836, 504, 'ironFence', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(1076, 504, 'ironFence', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(1279, 504, 'ironFence', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(2790, 504, 'ironFence', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(2992, 504, 'ironFence', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(86, 504, 'woodFence', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(260, 504, 'woodFence', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(2443, 504, 'woodFence', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(2616, 504, 'woodFence', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(3211, 504, 'woodFence', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(3383, 504, 'woodFence', null, { isStatic: true }));

    this.addBees();

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

    this.spikeys.push(this.bee1);
    this.spikeys.push(this.bee2);

    // Bees want to move along a path
    const beePoints1 = [
      new Phaser.Math.Vector2(1891, 56),
      new Phaser.Math.Vector2(2291, 338),
      new Phaser.Math.Vector2(2329, 93),
      new Phaser.Math.Vector2(1939, 298),
      new Phaser.Math.Vector2(1891, 56),
    ];
    const beePoints2 = [
      new Phaser.Math.Vector2(2090, 500),
      new Phaser.Math.Vector2(2233, 488),
    ];

    this.beePath1 = new Phaser.Curves.Spline(beePoints1);
    this.beePath2 = new Phaser.Curves.Spline(beePoints2);

    this.follower1 = { t: 0, vec: new Phaser.Math.Vector2() };
    this.follower2 = { t: 0, vec: new Phaser.Math.Vector2() };

    this.tweens.add({
      targets: this.follower1,
      t: 1,
      ease: 'Linear',
      duration: 4000,
      repeat: -1,
    });
    this.tweens.add({
      targets: this.follower2,
      t: 1,
      ease: 'Sine.easeInOut',
      yoyo: true,
      duration: 1500,
      repeat: -1,
    })
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
    this.model = this.sys.game.globals.model;
    this.balloon.destroy();
    this.ropeAnchor.setMass(1).setFrictionAir(0).setFixedRotation(false);
    if (this.model.soundOn == true) {
      this.game.registry.get('pop').play();
    }
  }

  getRopePoints() {
    const points = [];
    this.ropeSections.forEach((p) => {
      points.push(new Phaser.Math.Vector2(p.x, p.y));
    });
    return points;
  }

  update() {
    if (this.ropeAnchor.active) {
      this.ropeCurve = new Phaser.Curves.Spline(this.getRopePoints());
      this.graphics.clear();
      this.graphics.lineStyle(1, 0x000000, 1);
      this.ropeCurve.draw(this.graphics, 64);
    }

    if (this.cameras.main) {
      this.recenterCamera();
    }

    // Update the bees
    if (this.model.level == 2) {
      const point1 = this.beePath1.getPoint(this.follower1.t, this.follower1.vec);
      const point2 = this.beePath2.getPoint(this.follower2.t, this.follower2.vec);
      this.bee1.x = point1.x;
      this.bee1.y = point1.y;
      this.bee2.x = point2.x;
      this.bee2.y = point2.y;
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

import 'phaser';
import Balloon from '../Objects/Balloon';
import Fan from '../Objects/Fan';
import Rope from '../Objects/Rope';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const { matter } = this;

    this.scene.launch('HUD', { backgroundScene: this });
    this.ending = false;

    this.model = this.sys.game.globals.model;
    switch (this.model.level) {
      case 1:
        this.addLevel1();
        break;
      case 2:
        this.addLevel2();
        break;
      case 3:
        this.addLevel3();
        break;
      case 4:
        this.addLevel4();
        break;
      default:
        break;
    }

    matter.world.setBounds(0, -40, this.levelBackground.width, this.levelBackground.height);
    this.graphics = this.add.graphics();
    matter.add.mouseSpring();


    this.debugMode = false;
    this.input.on('pointerdown', () => {
      if (this.debugMode) {
        // eslint-disable-next-line no-console
        console.log(
          this.cameras.main.scrollX + this.input.x,
          this.cameras.main.scrollY + this.input.y,
        );
      }
    });

    this.cameras.main.fadeIn(500);
  }

  toggleDebugMode() {
    this.debugMode = !this.debugMode;
  }

  addLevel1() {
    this.levelBackground = this.add.image(0, 0, 'background-level1').setOrigin(0, 0);
    this.addLevel1Fan();
    this.addBalloon();
    this.addLevel1SpikeyThings();
    this.addEndZone();
    this.levelForeground = this.add.image(0, 0, 'foreground-level1').setOrigin(0, 0);
  }

  addLevel2() {
    this.levelBackground = this.add.image(0, 0, 'background-level2').setOrigin(0, 0);
    this.addBalloon(170);
    this.addLevel2SpikeyThings();
    this.addEndZone();
  }

  addLevel3() {
    this.levelBackground = this.add.image(0, 0, 'background-level3').setOrigin(0, 0);
    this.initialiseCamera();
    this.addWindow();
    this.addBalloon(100, this.levelBackground.height - 250);
    this.addLevel3SpikeyThings();
    this.addLevel3EndZone();
  }

  addLevel4() {
    this.add.rectangle(400, 300, 800, 600, 0xebf6f7);
    this.levelBackground = this.add.image(0, 0, 'background-level4').setOrigin(0, 0);
    this.endButton = this.add.image(770, 275, 'endButton');
    this.addBalloon();
    this.addLevel4SpikeyThings();
    this.addEndZone();
  }

  initialiseCamera() {
    this.cameras.main.scrollX = 0;
    this.cameras.main.scrollY = this.levelBackground.height - this.game.config.height;
  }

  addLevel1Fan() {
    this.fan1 = new Fan(this, 1295, 270, 'green', 'right', 'medium');

    const particles = this.add.particles('rope');
    particles.createEmitter({
      speed: 100,
      x: this.fan1.x,
      y: { min: this.fan1.y - 60, max: this.fan1.y + 50 },
      scale: { start: 1, end: 0 },
      // angle will need to be 180 for left facing fans
      angle: 0,
      blendMode: 'ADD',
    });
  }

  addBalloon(x = 100, y = 350) {
    const balloonContainer = new Balloon(this, x, y, undefined, { yGravity: -1 });
    this.add.existing(balloonContainer);
    this.balloon = balloonContainer.matterObject;

    this.ropeAnchor = this.matter.add.image(x, y + 100, 'nametag', null, {
      mass: 50000,
      ignoreGravity: false,
      frictionAir: 1,
      fixedRotation: true,
    });
    this.ropeAnchor.setInteractive({ useHandCursor: true });

    this.rope = Rope.createBetweenObjects(this, this.balloon, this.ropeAnchor, 15, {
      pointA: { x: -5, y: 70 },
      pointB: { x: 0, y: -12 },
    });
  }

  addLevel1SpikeyThings() {
    const { matter } = this;

    this.spikeys = [];
    this.spikeys.push(matter.add.image(450, 450, 'cactus', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(988, 320, 'knives', null, { isStatic: true }));
    this.spikeys.push(matter.add.image(1714, 485, 'bin', null, { isStatic: true }));

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
    this.spikeys.push(matter.add.image(1744, 382, 'tree2', null, { isStatic: true }));
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
    this.addLevel2Birds();

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

  addLevel3SpikeyThings() {
    this.spikeys = [];

    this.addLevel3Birds();

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

  addLevel4SpikeyThings() {
    const { matter } = this;
    this.spikeys = [];

    this.laser1 = matter.add.image(260, 50, 'laser', null, { isStatic: true, angle: 30 });
    this.laser2 = matter.add.image(200, 0, 'laser', null, { isStatic: true, angle: 320 });
    this.laser3 = matter.add.image(300, 500, 'laser', null, { isStatic: true, angle: 40 });
    this.laser4 = matter.add.image(400, 200, 'laser', null, { isStatic: true, angle: 30 });
    this.laser5 = matter.add.image(500, 300, 'laser', null, { isStatic: true, angle: 10 });

    this.spikeys.push(this.laser1);
    this.spikeys.push(this.laser2);
    this.spikeys.push(this.laser3);
    this.spikeys.push(this.laser4);
    this.spikeys.push(this.laser5);

    // Add the collision detection callback for the balloon.
    this.spikeys.forEach((s) => {
      this.matterCollision.addOnCollideStart({
        objectA: this.balloon,
        objectB: s,
        callback: () => { this.popBalloon(); },
        context: this,
      });
    });

    this.toggle1 = false;
    this.toggle2 = false;

    this.time.addEvent({
      delay: 2000,
      loop: true,
      startAt: 2000,
      callback: () => {
        this.toggle1 = !this.toggle1;
        if (this.toggle1) {
          this.laser1.destroy();
          this.laser2.destroy();
          this.laser3.destroy();
        } else {
          this.laser1 = matter.add.image(260, 50, 'laser', null, { isStatic: true, angle: 30 });
          this.laser2 = matter.add.image(200, 0, 'laser', null, { isStatic: true, angle: 320 });
          this.laser3 = matter.add.image(300, 500, 'laser', null, { isStatic: true, angle: 40 });
          [this.laser1, this.laser2, this.laser3].forEach((l) => {
            this.matterCollision.addOnCollideStart({
              objectA: this.balloon,
              objectB: l,
              callback: () => { this.popBalloon(); },
              context: this,
            });
          });
        }
      },
    });

    this.time.addEvent({
      delay: 2000,
      loop: true,
      startAt: 4000,
      callback: () => {
        this.toggle2 = !this.toggle2;
        if (this.toggle2) {
          this.laser4.destroy();
          this.laser5.destroy();
        } else {
          this.laser4 = matter.add.image(400, 200, 'laser', null, { isStatic: true, angle: 30 });
          this.laser5 = matter.add.image(500, 300, 'laser', null, { isStatic: true, angle: 10 });
          [this.laser4, this.laser5].forEach((l) => {
            this.matterCollision.addOnCollideStart({
              objectA: this.balloon,
              objectB: l,
              callback: () => { this.popBalloon(); },
              context: this,
            });
          });
        }
      },
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
    });
  }

  addLevel2Birds() {
    const { matter } = this;

    this.scene.scene.anims.create({
      key: 'flyGreen',
      frames: this.scene.scene.anims.generateFrameNumbers('birdGreen', { start: 0, end: -1 }),
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

    this.spikeys.push(this.bird1);

    // Birds want to move along a path
    const birdPoints1 = [
      new Phaser.Math.Vector2(1350, 82),
      new Phaser.Math.Vector2(650, 160),
      new Phaser.Math.Vector2(240, 82),
    ];

    this.birdPath1 = new Phaser.Curves.Spline(birdPoints1);

    this.follower1 = { t: 0, vec: new Phaser.Math.Vector2() };

    this.tweens.add({
      targets: this.follower1,
      t: 1,
      ease: 'Sine.easeInOut',
      yoyo: true,
      onYoyo: () => { this.bird1.toggleFlipX(); },
      onRepeat: () => { this.bird1.toggleFlipX(); },
      duration: 4000,
      repeat: -1,
      delay: 0,
    });
  }

  addLevel3Birds() {
    const { matter } = this;

    this.scene.scene.anims.create({
      key: 'flyRed',
      frames: this.scene.scene.anims.generateFrameNumbers('birdRed', { start: 0, end: -1 }),
      frameRate: 10,
      repeat: -1,
    });
    this.scene.scene.anims.create({
      key: 'flyBlue',
      frames: this.scene.scene.anims.generateFrameNumbers('birdBlue', { start: 0, end: -1 }),
      frameRate: 10,
      repeat: -1,
    });
    this.scene.scene.anims.create({
      key: 'flyYellow',
      frames: this.scene.scene.anims.generateFrameNumbers('birdYellow', { start: 0, end: -1 }),
      frameRate: 10,
      repeat: -1,
    });
    this.scene.scene.anims.create({
      key: 'flyMint',
      frames: this.scene.scene.anims.generateFrameNumbers('birdMint', { start: 0, end: -1 }),
      frameRate: 10,
      repeat: -1,
    });
    this.scene.scene.anims.create({
      key: 'flyGreen',
      frames: this.scene.scene.anims.generateFrameNumbers('birdGreen', { start: 0, end: -1 }),
      frameRate: 10,
      repeat: -1,
    });

    const birdConfig = {
      ignoreGravity: true,
      ignorePointer: true,
      fixedRotation: true,
      frictionAir: 1,
    };

    this.bird1 = matter.add.sprite(1994, 207, 'birdRed', 0, birdConfig).anims.play('flyRed', true);
    this.bird2 = matter.add.sprite(1994, 207, 'birdBlue', 0, birdConfig).anims.play('flyBlue', true).toggleFlipX();
    this.bird3 = matter.add.sprite(1994, 207, 'birdYellow', 0, birdConfig).anims.play('flyYellow', true);
    this.bird4 = matter.add.sprite(1994, 207, 'birdMint', 0, birdConfig).anims.play('flyMint', true);
    this.bird5 = matter.add.sprite(1994, 207, 'birdGreen', 0, birdConfig).anims.play('flyGreen', true);

    this.spikeys.push(this.bird1);
    this.spikeys.push(this.bird2);
    this.spikeys.push(this.bird3);
    this.spikeys.push(this.bird4);
    this.spikeys.push(this.bird5);

    // Birds want to move along a path
    const birdPoints1 = [
      new Phaser.Math.Vector2(60, 1840),
      new Phaser.Math.Vector2(750, 1840),
    ];
    const birdPoints2 = [
      new Phaser.Math.Vector2(750, 1300),
      new Phaser.Math.Vector2(60, 1300),
    ];
    const birdPoints3 = [
      new Phaser.Math.Vector2(60, 900),
      new Phaser.Math.Vector2(430, 900),
    ];
    const birdPoints4 = [
      new Phaser.Math.Vector2(410, 460),
      new Phaser.Math.Vector2(750, 460),
    ];
    const birdPoints5 = [
      new Phaser.Math.Vector2(60, 40),
      new Phaser.Math.Vector2(750, 40),
    ];

    this.birdPath1 = new Phaser.Curves.Spline(birdPoints1);
    this.birdPath2 = new Phaser.Curves.Spline(birdPoints2);
    this.birdPath3 = new Phaser.Curves.Spline(birdPoints3);
    this.birdPath4 = new Phaser.Curves.Spline(birdPoints4);
    this.birdPath5 = new Phaser.Curves.Spline(birdPoints5);

    this.follower1 = { t: 0, vec: new Phaser.Math.Vector2() };
    this.follower2 = { t: 0, vec: new Phaser.Math.Vector2() };
    this.follower3 = { t: 0, vec: new Phaser.Math.Vector2() };
    this.follower4 = { t: 0, vec: new Phaser.Math.Vector2() };
    this.follower5 = { t: 0, vec: new Phaser.Math.Vector2() };

    this.tweens.add({
      targets: this.follower1,
      t: 1,
      ease: 'Sine.easeInOut',
      yoyo: true,
      onYoyo: () => { this.bird1.toggleFlipX(); },
      onRepeat: () => { this.bird1.toggleFlipX(); },
      duration: 4000,
      repeat: -1,
      delay: 0,
    });
    this.tweens.add({
      targets: this.follower2,
      t: 1,
      ease: 'Sine.easeInOut',
      yoyo: true,
      onYoyo: () => { this.bird2.toggleFlipX(); },
      onRepeat: () => { this.bird2.toggleFlipX(); },
      duration: 4000,
      repeat: -1,
      delay: 1000,
    });
    this.tweens.add({
      targets: this.follower3,
      t: 1,
      ease: 'Sine.easeInOut',
      yoyo: true,
      onYoyo: () => { this.bird3.toggleFlipX(); },
      onRepeat: () => { this.bird3.toggleFlipX(); },
      duration: 4000,
      repeat: -1,
      delay: 2000,
    });
    this.tweens.add({
      targets: this.follower4,
      t: 1,
      ease: 'Sine.easeInOut',
      yoyo: true,
      onYoyo: () => { this.bird4.toggleFlipX(); },
      onRepeat: () => { this.bird4.toggleFlipX(); },
      duration: 4000,
      repeat: -1,
      delay: 3000,
    });
    this.tweens.add({
      targets: this.follower5,
      t: 1,
      ease: 'Sine.easeInOut',
      yoyo: true,
      onYoyo: () => { this.bird5.toggleFlipX(); },
      onRepeat: () => { this.bird5.toggleFlipX(); },
      duration: 4000,
      repeat: -1,
      delay: 4000,
    });
  }

  addWindow() {
    this.add.image(544, 471, 'level3-insideWindow');
    this.window = this.add.image(544, 471, 'level3-window');
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

  addLevel3EndZone() {
    const endZoneRectangle = this.add.rectangle(
      544,
      471,
      this.window.width,
      this.window.height,
      0x000000,
      0,
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
    this.matter.world.removeConstraint(this.rope.initialJoint);
    this.matter.world.removeConstraint(this.rope.finalJoint);
    this.ropeAnchor.setMass(1).setFrictionAir(0).setFixedRotation(false);
    if (this.model.soundOn === true) {
      this.game.registry.get('pop').play();
    }
    this.startFailSequence();
  }

  getRopePoints() {
    const points = [];
    this.ropeSections.forEach((p) => {
      points.push(new Phaser.Math.Vector2(p.position.x, p.position.y));
    });
    return points;
  }

  update() {
    if (this.ropeAnchor.active) {
      this.graphics.clear();
      this.graphics.lineStyle(1, 0x000000, 1);
      this.rope.drawCurve(this);
    }

    if (this.cameras.main) {
      this.recenterCamera();
    }

    // update level 2 birds
    if (!this.ending && this.model.level === 2) {
      const point1 = this.birdPath1.getPoint(this.follower1.t, this.follower1.vec);
      this.bird1.x = point1.x;
      this.bird1.y = point1.y;
    }

    // Update the bees
    if (!this.ending && this.model.level === 2) {
      const point1 = this.beePath1.getPoint(this.follower1.t, this.follower1.vec);
      const point2 = this.beePath2.getPoint(this.follower2.t, this.follower2.vec);
      this.bee1.x = point1.x;
      this.bee1.y = point1.y;
      this.bee2.x = point2.x;
      this.bee2.y = point2.y;
    }

    // Update level 3 birds
    if (!this.ending && this.model.level === 3) {
      const point1 = this.birdPath1.getPoint(this.follower1.t, this.follower1.vec);
      const point2 = this.birdPath2.getPoint(this.follower2.t, this.follower2.vec);
      const point3 = this.birdPath3.getPoint(this.follower3.t, this.follower3.vec);
      const point4 = this.birdPath4.getPoint(this.follower4.t, this.follower4.vec);
      const point5 = this.birdPath5.getPoint(this.follower5.t, this.follower5.vec);
      this.bird1.x = point1.x;
      this.bird1.y = point1.y;
      this.bird2.x = point2.x;
      this.bird2.y = point2.y;
      this.bird3.x = point3.x;
      this.bird3.y = point3.y;
      this.bird4.x = point4.x;
      this.bird4.y = point4.y;
      this.bird5.x = point5.x;
      this.bird5.y = point5.y;
    }
  }

  startGoalSequence() {
    this.ending = true;
    this.endZone.destroy();
    this.scene.stop('HUD');

    const target = 'StageComplete';
    this.cameras.main.fadeOut(500);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.start(target);
        this.scene.get(target).events.once(
          Phaser.Scenes.Events.CREATE,
          () => this.scene.get(target).cameras.main.fadeIn(500),
        );
      },
    );
  }

  startFailSequence() {
    this.ending = true;
    this.endZone.destroy();
    this.scene.stop('HUD');

    const target = 'MissionFail';
    this.cameras.main.fadeOut(500);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.start(target);
        this.scene.get(target).events.once(
          Phaser.Scenes.Events.CREATE,
          () => this.scene.get(target).cameras.main.fadeIn(500),
        );
      },
    );
  }

  recenterCamera() {
    const halfViewportWidth = this.game.config.width / 2;
    const screenCenterX = Math.round(this.cameras.main.scrollX + halfViewportWidth);
    const ropeAnchorX = Math.round(this.ropeAnchor.x);

    const isOutsideCameraCenterX = GameScene.isOutsideCameraCenter(
      ropeAnchorX,
      screenCenterX,
      150,
    );
    if (isOutsideCameraCenterX) {
      const moveDistance = GameScene.getMoveDistance(ropeAnchorX, screenCenterX);
      const newScrollX = this.cameras.main.scrollX + moveDistance;
      if (
        (newScrollX > 0)
        && (newScrollX < (this.levelBackground.width - this.game.config.width))
      ) {
        this.cameras.main.scrollX += moveDistance;
      }
    }

    const threeQuartersViewportHeight = this.game.config.height * 0.75;
    const screenPivotY = Math.round(this.cameras.main.scrollY + threeQuartersViewportHeight);
    const ropeAnchorY = Math.round(this.ropeAnchor.y);
    const isOutsideCameraCenterY = GameScene.isOutsideCameraCenter(
      ropeAnchorY,
      screenPivotY,
      0,
    );
    if (isOutsideCameraCenterY) {
      const moveDistance = GameScene.getMoveDistance(ropeAnchorY, screenPivotY);
      const newScrollY = this.cameras.main.scrollY + moveDistance;
      if (
        (newScrollY > 0)
        && (newScrollY < (this.levelBackground.height - this.game.config.height))
      ) {
        this.cameras.main.scrollY += moveDistance;
      }
    }
  }

  static isOutsideCameraCenter(value, screenCenterValue, offsetTolerationSize) {
    if (
      value >= (screenCenterValue - offsetTolerationSize)
      && value <= (screenCenterValue + offsetTolerationSize)
    ) {
      return false;
    }
    return true;
  }

  static getMoveDistance(ropeAnchorValue, screenCenterValue) {
    const moveDistance = Math.min(
      Math.abs(ropeAnchorValue - screenCenterValue),
      5,
    );
    return (ropeAnchorValue > screenCenterValue) ? moveDistance : -moveDistance;
  }
}

import 'phaser';
import Balloon from '../Objects/Balloon';
import Fan from '../Objects/Fan';
import Rope from '../Objects/Rope';

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

    this.scene.launch('HUD', { backgroundScene: this });

    this.addFan();
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

    const balloonContainer = new Balloon(this, 100, 250, undefined, { yGravity: -1 });
    this.add.existing(balloonContainer);
    this.balloon = balloonContainer.matterObject;

    this.ropeAnchor = this.matter.add.image(100, 350, 'rope', null, {
      mass: 50000,
      ignoreGravity: false,
      frictionAir: 1,
      fixedRotation: true,
    });
    this.ropeAnchor.setInteractive({ useHandCursor: true });

    this.rope = Rope.createBetweenObjects(this, this.balloon, this.ropeAnchor, 15, { pointA: { x:-5, y:70 }});
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

import 'phaser';

export default class Balloon extends Phaser.GameObjects.Container {
  constructor(scene, x, y, children, options = {}) {
    super(scene, x, y);

    const { model } = scene.sys.game.globals;
    const balloonBase = scene.add.sprite(0, 0, 'balloons', options.baseFrame || model.colourFrame);
    const balloonFace = scene.add.sprite(0, 0, 'face', options.faceFrame || 0);
    const balloonAccessories = scene.add.sprite(0, 0, 'accessories', options.accessoryFrame || model.accessoryFrame);
    const balloonHair = scene.add.sprite(0, 0, 'hairstyles', model.hairFrame);

    this.add([balloonBase, balloonFace, balloonAccessories, balloonHair]);

    this.matterObject = scene.matter.add.gameObject(this, {
      position: { x, y },
      vertices: Balloon.vertices,
      mass: 1,
      ignorePointer: true,
      gravityScale: { y: options.yGravity || -10 },
    });
  }
}

Balloon.vertices = [
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
];

import 'phaser';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 10 },
      plugins: {
        attractors: true,
      },
    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: 'matterCollision',
        mapping: 'matterCollision'
      }
    ]
  }
};

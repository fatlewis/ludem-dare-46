import 'phaser';
import Button from '../Objects/Button';

let player;
let cursors;
let playerSpeed;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.model = this.sys.game.globals.model;

    player = this.physics.add.image(500, 450, 'box');

    player.setCollideWorldBounds(true);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    playerSpeed = 200;

    this.menuButton = new Button(this, 250, 480, 'Button', 'ButtonPressed', 'Menu', 'Title');
  }

  update() {
    this.model = this.sys.game.globals.model;


    if (cursors.left.isDown) {
      player.setVelocityX(-playerSpeed);
    } else if (cursors.right.isDown) {
      player.setVelocityX(playerSpeed);
    } else {
      player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
      player.setVelocityY(-playerSpeed);
    } else if (cursors.down.isDown) {
      player.setVelocityY(playerSpeed);
    } else {
      player.setVelocityY(0);
    }
  }
}

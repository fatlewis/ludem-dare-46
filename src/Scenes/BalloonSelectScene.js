import 'phaser';
import Button from '../Objects/Button';

export default class BalloonSelectScene extends Phaser.Scene {
  constructor() {
    super('BalloonSelect');
  }

  create() {
    const { config } = this.game;
    this.model = this.sys.game.globals.model;

    this.add.image(config.width / 2, config.height / 2, 'background');

    this.add.text(config.width * 0.1, config.height * 0.11, 'Balloon select scene', { align: 'center', fontSize: '25px', fill: '#FFF' });
    this.menuButton = new Button(this, config.width * 0.25, config.height * 0.85, 'Button', 'ButtonPressed', 'Menu', 'Title');
    this.gameButton = new Button(this, config.width * 0.75, config.height * 0.85, 'Button', 'ButtonPressed', 'Play', 'Game');

    const balloon = this.add.image(config.width * 0.75, config.height / 2, 'balloonRed').setScale(2);

    this.colourButton1 = this.add.image(150, 200, 'box').setInteractive({ useHandCursor: true });
    this.colourText = this.add.text(200, 190, 'Colour', { fontSize: 24, fill: '#FFF' });
    this.colourButton2 = this.add.image(350, 200, 'box').setInteractive({ useHandCursor: true });

    this.faceButton1 = this.add.image(150, 300, 'box').setInteractive({ useHandCursor: true });
    this.faceText = this.add.text(200, 290, 'Face', { fontSize: 24, fill: '#FFF' });
    this.faceButton2 = this.add.image(350, 300, 'box').setInteractive({ useHandCursor: true });


    this.colourButton1.on('pointerdown', () => {
      this.colourButton1.setTexture('checkedBox');
    });

    this.faceButton1.on('pointerdown', () => {
      this.faceButton1.setTexture('checkedBox')
    });

    this.colourButton2.on('pointerdown', () => {
      this.colourButton2.setTexture('checkedBox');
    });

    this.faceButton2.on('pointerdown', () => {
      this.faceButton2.setTexture('checkedBox')
    });




  }
}

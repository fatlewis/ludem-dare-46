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
    this.menuButton = new Button(this, config.width * 0.25, config.height * 0.85, 'menuButton', 'menuButtonPressed', 'Title');
    this.gameButton = new Button(this, config.width * 0.75, config.height * 0.85, 'playButton', 'playButtonPressed', 'Game');

    let framecountcolour = 0;
    let framecountaccessory = 0;

    const balloon = this.add.sprite(config.width * 0.75, config.height / 2, 'balloons', framecountcolour);
    const accessory = this.add.sprite(config.width * 0.75, config.height / 2, 'accessories', framecountaccessory);
    this.add.sprite(config.width * 0.75, config.height / 2, 'face', 0);

    this.colourButton1 = this.add.image(150, 200, 'checkedBox').setInteractive({ useHandCursor: true });
    this.colourText = this.add.text(200, 190, 'Colour', { fontSize: 24, fill: '#FFF' });
    this.colourButton2 = this.add.image(350, 200, 'checkedBox').setInteractive({ useHandCursor: true });

    this.faceButton1 = this.add.image(150, 300, 'checkedBox').setInteractive({ useHandCursor: true });
    this.faceText = this.add.text(200, 290, 'Face', { fontSize: 24, fill: '#FFF' });
    this.faceButton2 = this.add.image(350, 300, 'checkedBox').setInteractive({ useHandCursor: true });

    this.colourButton1.on('pointerdown', () => {
      framecountcolour = (framecountcolour - 1) % 9;
      // JS modulo returns negative numbers, need to add 9 to get back to top of the loop
      if (framecountcolour < 0) { framecountcolour += 9; }
      balloon.setFrame(framecountcolour);
      this.model.colourFrame = framecountcolour;
    });

    this.colourButton2.on('pointerdown', () => {
      framecountcolour = (framecountcolour + 1) % 9;
      balloon.setFrame(framecountcolour);
      this.model.colourFrame = framecountcolour;
    });

    this.faceButton1.on('pointerdown', () => {
      framecountaccessory = (framecountaccessory - 1) % 7;
      // JS modulo returns negative numbers, need to add 9 to get back to top of the loop
      if (framecountaccessory < 0) { framecountaccessory += 7; }
      accessory.setFrame(framecountaccessory);
      this.model.accessoryFrame = framecountaccessory;
    });

    this.faceButton2.on('pointerdown', () => {
      framecountaccessory = (framecountaccessory + 1) % 7;
      accessory.setFrame(framecountaccessory);
      this.model.accessoryFrame = framecountaccessory;
    });

    const nameForm = this.add.dom(200, 400).createFromCache('nameForm');
    this.events.once('render', () => {
      const nameField = nameForm.getChildByName('nameField');
      if (this.model.heroName) {
        nameField.value = this.model.heroName;
      }
      nameField.addEventListener(
        'input',
        (event) => {
          this.model.heroName = event.target.value;
        },
      );
    });
  }
}

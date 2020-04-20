import 'phaser';
import Button from '../Objects/Button';
import ArrowButton from '../Objects/ArrowButton';

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

    let framecountcolour = this.model.colourFrame || 0;
    let framecountaccessory = this.model.accessoryFrame || 0;

    this.balloon = this.add.sprite(config.width * 0.75, config.height / 2, 'balloons', framecountcolour);
    this.accessory = this.add.sprite(config.width * 0.75, config.height / 2, 'accessories', framecountaccessory);
    this.add.sprite(config.width * 0.75, config.height / 2, 'face', 0);

    this.leftColourButton = new ArrowButton(this, 150, 200, 'leftArrowUp', 'leftArrowDown', 'left', 9, 'colour');
    this.rightColourButton = new ArrowButton(this, 350, 200, 'rightArrowUp', 'rightArrowDown', 'right', 9, 'colour');
    this.balloon.setFrame(this.model.colourFrame);


    this.leftAccessoryButton = new ArrowButton(this, 150, 300, 'leftArrowUp', 'leftArrowDown', 'left', 7, 'accessory');
    this.rightAccessoryButton = new ArrowButton(this, 350, 300, 'rightArrowUp', 'rightArrowDown', 'right', 7, 'accessory');
    this.balloon.setFrame(this.model.accessoryFrame);


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

  update() {
    this.balloon.setFrame(this.model.colourFrame);
    this.accessory.setFrame(this.model.accessoryFrame);

  }
}

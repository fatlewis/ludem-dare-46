import 'phaser';
import Button from '../Objects/Button';

export default class MissionSuccessScene extends Phaser.Scene {
  constructor() {
    super('MissionSuccess');
  }

  create() {
    const { config } = this.game;
    this.model = this.sys.game.globals.model;

    this.add.image(config.width / 2, config.height / 2, 'background-missionSuccess');
    this.menuButton = new Button(this, 170, 520, 'menuButton', 'menuButtonPressed', 'Title');

    this.balloonBase = this.add.sprite(215, 160, 'balloons', this.model.colourFrame).setScale(1.7);
    const balloonFace = this.add.sprite(215, 160, 'face', this.model.faceFrame).setScale(1.7);
    const balloonAccessories = this.add.sprite(215, 160, 'accessories', this.model.accessoryFrame).setScale(1.7);
    const balloonHair = this.add.sprite(215, 160, 'hairstyles', this.model.hairFrame).setScale(1.7);

    this.happy = this.add.image(130, 305, 'happyFamily');

    this.heronametext = this.add.text(490, 300, this.model.heroName, { align: 'center', fontSize: '25px', fill: '#000' });
    this.sys.game.globals.model.level = 1;
  }
}

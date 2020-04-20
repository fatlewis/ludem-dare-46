import 'phaser';
import Button from '../Objects/Button';
//import Model from '../Model';

export default class MissionFailScene extends Phaser.Scene {
  constructor() {
    super('MissionFail');
  }

  create() {
    const { config } = this.game;
    this.model = this.sys.game.globals.model;
    this.add.image(config.width / 2, config.height / 2, 'background-missionFail');
    //this.add.image(180, 300, 'family');
    //this.game.globals.model = new Model();
    this.menuButton = new Button(this, 550, 500, 'replayUp', 'replayDown', 'Title');

    const balloonBase = this.add.sprite(205, 470, 'balloons', this.model.colourFrame);
    const balloonFace = this.add.sprite(205, 470, 'face', this.model.faceFrame);
    const balloonAccessories = this.add.sprite(205, 470, 'accessories', this.model.accessoryFrame);
    const balloonHair = this.add.sprite(205, 470, 'hairstyles', this.model.hairFrame);

    this.add.text(490, 295, this.model.heroName, { align: 'center', fontSize: '25px', fill: '#000' });


  }
}

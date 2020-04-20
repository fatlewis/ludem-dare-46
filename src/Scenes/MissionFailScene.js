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
    this.add.image(180, 300, 'family');
    //this.game.globals.model = new Model();
    this.menuButton = new Button(this, 550, 500, 'menuButton', 'menuButtonPressed', 'Title');
  }
}

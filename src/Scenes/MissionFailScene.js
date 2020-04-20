import 'phaser';
import Button from '../Objects/Button';
import Model from '../Model';

export default class MissionFailScene extends Phaser.Scene {
  constructor() {
    super('MissionFail');
  }

  create() {
    const { config } = this.game;
    this.add.image(config.width / 2, config.height / 2, 'background-missionFail');
    this.game.globals.model = new Model();
    this.menuButton = new Button(this, 550, 500, 'menuButton', 'menuButtonPressed', 'Title');
  }
}

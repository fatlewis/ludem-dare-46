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

    this.add.text(490, 295, this.model.heroName, { align: 'center', fontSize: '25px', fill: '#000' });
    this.sys.game.globals.model.level = 1;
  }
}

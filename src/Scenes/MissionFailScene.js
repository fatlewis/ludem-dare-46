import 'phaser';
import Button from '../Objects/Button';

export default class MissionFailScene extends Phaser.Scene {
  constructor() {
    super('MissionFail');
  }

  create() {
    const { config } = this.game;
    this.add.image(config.width / 2, config.height / 2, 'background-missionFail');
    this.retryButton = new Button(this, 450, 500, 'retryButton', 'retryButtonPressed', 'Game');
    this.menuButton = new Button(this, 650, 500, 'menuButton', 'menuButtonPressed', 'Title');
  }
}

import 'phaser';
import Button from '../Objects/Button';

export default class AboutScene extends Phaser.Scene {
  constructor() {
    super('About');
  }

  create() {
    const { config } = this.game;
    this.model = this.sys.game.globals.model;

    this.add.image(config.width / 2, config.height / 2, 'background-about');
    
    this.menuButton = new Button(this, 550, 500, 'menuButton', 'menuButtonPressed', 'Title');
  }
}

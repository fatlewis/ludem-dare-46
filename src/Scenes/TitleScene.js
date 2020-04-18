import 'phaser';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    const { config } = this.game;

    this.add.image(config.width / 2, config.height / 2, 'background');

    this.add.image(config.width * 0.3, config.height / 2, 'Logo');

    // Game - Head to Rocket Select page
    this.gameButton = new Button(this, config.width * 0.75, config.height / 2 - 100, 'Button', 'ButtonPressed', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this, config.width * 0.75, config.height / 2, 'Button', 'ButtonPressed', 'Options', 'Options');

    // About
    this.aboutButton = new Button(this, config.width * 0.75, config.height / 2 + 100, 'Button', 'ButtonPressed', 'About', 'About');

    this.model = this.sys.game.globals.model;

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.game.registry.get('bgMusic').play();
      this.model.bgMusicPlaying = true;
    }
  }
}

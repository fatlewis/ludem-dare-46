import 'phaser';
import Button from '../Objects/Button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }


  create() {
    this.model = this.sys.game.globals.model;
    const { config } = this.game;


    this.add.image(config.width / 2, config.height / 2, 'background-options');

    this.musicButton = this.add.image(490, 300, 'checkMark').setInteractive({ useHandCursor: true });

    this.soundButton = this.add.image(490, 380, 'checkMark').setInteractive({ useHandCursor: true });

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.soundButton.on('pointerdown', () => {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    });

    this.updateAudio();

    this.menuButton = new Button(this, 550, 500, 'menuButton', 'menuButtonPressed', 'Title');
    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setAlpha(0.001);
      this.game.registry.get('bgMusic').stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setAlpha(1);
      if (this.model.bgMusicPlaying === false) {
        this.game.registry.get('bgMusic').play();
        this.model.bgMusicPlaying = true;
      }
    }

    if (this.model.soundOn === false) {
      this.soundButton.setAlpha(0.001);
    } else {
      this.soundButton.setAlpha(1);
    }
  }
}

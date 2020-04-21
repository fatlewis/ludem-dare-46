import 'phaser';

export default class StageCompleteScene extends Phaser.Scene {
  constructor() {
    super('StageComplete');
  }

  create() {
    const { config } = this.game;
    this.model = this.sys.game.globals.model;

    this.add.image(config.width / 2, config.height / 2, 'background-stageComplete');

    this.button = this.scene.scene.add.sprite(550, 500, 'continueButton').setInteractive({ useHandCursor: true });

    this.button.on('pointerdown', () => {
      if (this.model.level < 4) {
        this.model.level += 1;
        this.fadeToScene('Game');
      } else {
        this.fadeToScene('MissionSuccess');
      }
    });

    this.button.on('pointerover', () => {
      this.button.setTexture('continueButtonPressed');
    });

    this.button.on('pointerout', () => {
      this.button.setTexture('continueButton');
    });

    if (this.model.soundOn === true) {
        const successSound = this.game.registry.get('success');
        successSound.play();
        if (this.model.bgMusicPlaying === true) {
          const bgMusicSound = this.game.registry.get('bgMusic');
          bgMusicSound.stop();
          successSound.once(Phaser.Sound.Events.COMPLETE, () => {
            if (this.model.soundOn === true) {
              bgMusicSound.play();
            }
          });
        }
    }
  }

  fadeToScene(scene) {
    this.cameras.main.fadeOut(500);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.start(scene);
      },
    );
  }
}

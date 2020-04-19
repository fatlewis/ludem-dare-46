import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    // add logo image
    const logo = this.add.image(400, 120, 'Logo');
    logo.setScale(0.45);

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    // Balloons, accessories and ropes
    this.load.image('balloonBlack', 'assets/balloon/colors/BalloonBlack.png');
    this.load.image('balloonBlue', 'assets/balloon/colors/BalloonBlue.png');
    this.load.image('balloonOrange', 'assets/balloon/colors/BalloonOrange.png');
    this.load.image('balloonGreen', 'assets/balloon/colors/BalloonGreen.png');
    this.load.image('balloonPink', 'assets/balloon/colors/BalloonPink.png');
    this.load.image('balloonPurple', 'assets/balloon/colors/BalloonPurple.png');
    this.load.image('balloonRed', 'assets/balloon/colors/BalloonRed.png');
    this.load.image('balloonTeal', 'assets/balloon/colors/BalloonTeal.png');
    this.load.image('balloonYellow', 'assets/balloon/colors/BalloonYellow.png');
    this.load.spritesheet('balloons', 'assets/balloon/BalloonsSprite.png', {frameWidth: 288, frameHeight: 288});
    this.load.spritesheet('accessories', 'assets/balloon/accessories/AccessoriesSprite.png', {frameWidth: 288, frameHeight: 288});
    this.load.image('face', 'assets/balloon/Face_01.png');
    this.load.image('rope', 'assets/balloon/RopeSection.png');

    // Spikey things
    this.load.image('cactus', 'assets/spikey/Cactus_01.png');
    this.load.image('knives', 'assets/spikey/Knives_01.png');

    // Fans
    this.load.spritesheet('fanGreen', 'assets/fan/FanSpriteGreen.png', {frameWidth: 104, frameHeight: 129});
    this.load.spritesheet('fanOlive', 'assets/fan/FanSpriteOlive.png', {frameWidth: 104, frameHeight: 129});
    this.load.spritesheet('fanOrange', 'assets/fan/FanSpriteOrange.png', {frameWidth: 104, frameHeight: 129});
    this.load.spritesheet('fanPink', 'assets/fan/FanSpritePink.png', {frameWidth: 104, frameHeight: 129});
    this.load.spritesheet('fanRed', 'assets/fan/FanSpriteRed.png', {frameWidth: 104, frameHeight: 129});
    this.load.spritesheet('fanTeal', 'assets/fan/FanSpriteTeal.png', {frameWidth: 104, frameHeight: 129});
    this.load.spritesheet('fanYellow', 'assets/fan/FanSpriteYellow.png', {frameWidth: 104, frameHeight: 129});

    // Backgrounds
    this.load.image('background', 'assets/background/MainMenu.png');
    this.load.image('background-level1', 'assets/background/level-1/BackgroundLevel1_01.png');

    // Menu items
    this.load.image('logo', 'assets/logo.png');
    this.load.image('button', 'assets/buttons/ButtonUp_02.png');
    this.load.image('buttonPressed', 'assets/buttons/ButtonDown_02.png');
    this.load.image('playButton', 'assets/buttons/ButtonPlayUp_02.png');
    this.load.image('playButtonPressed', 'assets/buttons/ButtonPlayDown_02.png');
    this.load.image('menuButton', 'assets/buttons/ButtonMenuUp_02.png');
    this.load.image('menuButtonPressed', 'assets/buttons/ButtonMenuDown_02.png');
    this.load.image('optionsButton', 'assets/buttons/ButtonOptionsUp_02.png');
    this.load.image('optionsButtonPressed', 'assets/buttons/ButtonOptionsDown_02.png');
    this.load.image('aboutButton', 'assets/buttons/ButtonAboutUp_02.png');
    this.load.image('aboutButtonPressed', 'assets/buttons/ButtonAboutDown_02.png');
    this.load.image('creditsButton', 'assets/buttons/ButtonCreditsUp_02.png');
    this.load.image('creditsButtonPressed', 'assets/buttons/ButtonCreditsDown_02.png');
    this.load.image('checkedBox', 'assets/ui/checked.png');

    // Audio
    this.load.audio('bgMusic', ['assets/audio/theme.mp3']);

    // remove progress bar when complete
    this.load.on('complete', () => {
      this.game.registry.set('bgMusic', this.sound.add('bgMusic', { volume: 0.5, loop: true }));
      this.ready();
    });
  }

  ready() {
    this.cameras.main.fadeOut(1000);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.start('Title');
        this.scene.get('Title').cameras.main.fadeIn(1000);
      },
    );
  }
}

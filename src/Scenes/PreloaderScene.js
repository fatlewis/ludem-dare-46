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

    // load assets needed in our game
    this.load.image('Button', 'assets/button1.png');
    this.load.image('ButtonPressed', 'assets/button1selected.png');
    this.load.image('box', 'assets/planet6.png');
    this.load.image('checkedBox', 'assets/checked1.png');
    this.load.image('Logo', 'assets/logo.png');
    this.load.image('balloon', 'assets/pink.png');
    this.load.image('rope', 'assets/blue-square.png');

    this.load.audio('bgMusic', ['assets/theme.mp3']);

    this.load.image('background', 'assets/menubackground.png');
    this.load.image('background-level1', 'assets/background/level1.png');

    // remove progress bar when complete
    this.load.on('complete', () => {
      this.game.registry.set('bgMusic', this.sound.add('bgMusic', { volume: 0.5, loop: true }));
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.scene.start('Title');
    // this.readyCount++;
    // if (this.readyCount === 20) {
    //     this.scene.start('Credits');
    // }
  }
}
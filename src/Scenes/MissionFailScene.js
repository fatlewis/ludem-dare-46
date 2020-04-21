import 'phaser';
import Button from '../Objects/Button';

export default class MissionFailScene extends Phaser.Scene {
  constructor() {
    super('MissionFail');
  }

  create() {
    const { config } = this.game;
    this.model = this.sys.game.globals.model;
    this.add.image(config.width / 2, config.height / 2, 'background-missionFail');
    this.retryButton = new Button(this, 450, 500, 'replayUp', 'replayDown', 'Game');
    this.menuButton = new Button(this, 650, 500, 'menuButton', 'menuButtonPressed', 'Title');

    const balloonBase = this.add.sprite(210, 455, 'balloons', this.model.colourFrame);
    const balloonFace = this.add.sprite(210, 455, 'face', this.model.faceFrame);
    const balloonAccessories = this.add.sprite(210, 455, 'accessories', this.model.accessoryFrame);
    const balloonHair = this.add.sprite(210, 455, 'hairstyles', this.model.hairFrame);

    this.sad = this.add.image(175, 285, 'sadFamily');
    this.flowers = this.add.image(190, 525, 'flowers');

    this.add.text(490, 295, this.model.heroName, { align: 'center', fontSize: '25px', fill: '#000' });

    if (this.model.soundOn === true) {
     	const failureSound = this.game.registry.get('failure');
    	failureSound.play();
     	if (this.model.bgMusicPlaying === true) {
     		const bgMusicSound = this.game.registry.get('bgMusic');
     		bgMusicSound.stop();
     		failureSound.once(Phaser.Sound.Events.COMPLETE, () => {
     			if (this.model.soundOn === true) {
     				bgMusicSound.play();
     			}
     		});
     	}
	}
  }
}

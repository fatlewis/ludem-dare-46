import 'phaser';
import Button from '../Objects/Button';
import Balloon from '../Objects/Balloon';
import Rope from '../Objects/Rope';

export default class InstructionsScene extends Phaser.Scene {
	create() {
	    const { config } = this.game;
	    this.model = this.sys.game.globals.model;

	    this.add.image(config.width / 2, config.height / 2, 'background-instructions');

	    this.menuButton = new Button(this, 480, config.height * 0.85, 'menuButton', 'menuButtonPressed', 'Title');
	    this.gameButton = new Button(this, 630, config.height * 0.85, 'playButton', 'playButtonPressed', 'Game', true);

    	const model = this.sys.game.globals.model;
    	this.add.text(50, 450, this.model.heroName, { align: 'center', fontSize: '25px', fill: '#000' });

    	const x = 170;
    	const y = 220;
	    const balloonContainer = new Balloon(this, x, y, undefined, { yGravity: -1 });
	    this.add.existing(balloonContainer);
	    this.balloon = balloonContainer.matterObject;

	    this.ropeAnchor = this.matter.add.image(x, y + 100, 'nametag', null, {
	      mass: 50000,
	      ignoreGravity: false,
	      frictionAir: 1,
	      fixedRotation: true,
	      isStatic: true,
	    });

	    this.rope = Rope.createBetweenObjects(this, this.balloon, this.ropeAnchor, 15, {
	      pointA: { x: -5, y: 70 },
	      pointB: { x: 0, y: -12 },
	    });
    	this.graphics = this.add.graphics();
	}

	update() {
		if (this.ropeAnchor.active) {
		  this.graphics.clear();
		  this.graphics.lineStyle(1, 0x000000, 1);
		  this.rope.drawCurve(this);
		}
	}
}

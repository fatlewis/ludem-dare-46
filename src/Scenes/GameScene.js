import 'phaser';
import Button from '../Objects/Button';

var player;
var cursors;
var playerSpeed;

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    create () {
        this.model = this.sys.game.globals.model;
        var config = this.game.config;
        var matter = this.matter
        matter.world.setBounds(0, 0, game.config.width, game.config.height);
        matter.add.mouseSpring();
        this.addBalloon();
    }

    addBalloon(matter) {
        var matter = this.matter

        var balloon = matter.add.image(400, 200, 'balloon', null, {
            shape: {type: 'circle',
                    radius: 32},
            mass: 0.1,
            ignorePointer: true,
            gravityScale: {y: -1}
        });
  
        var firstRopeSection = matter.add.image(400, 200, 'rope', null, {
            ignoreGravity: true,
            ignorePointer: true
        });
        matter.add.joint(balloon, firstRopeSection, 0, 1, {pointA: {x: 0, y: 35}});

        var prev = firstRopeSection;
        var segmentCount = 8
        for (var i = 0; i < segmentCount; i++) {
            var ropeSection = matter.add.image(400, 235 + (i * 15), 'rope', null, {
                ignoreGravity: true,
                ignorePointer: true
            });
            matter.add.joint(prev, ropeSection, 15);
            prev = ropeSection;
        }

        var lastRopeSection = matter.add.image(400, 235 + ((i + 1) * 15), 'rope', null, {
            mass: 50000,
            ignoreGravity: true,
            frictionAir: 1,
            fixedRotation: true
        });
        matter.add.joint(prev, lastRopeSection, 15);
    }

    update () {
        var config = this.game.config;
        this.model = this.sys.game.globals.model; 
    }
};

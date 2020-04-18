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
        var config = this.game.config;
        this.model = this.sys.game.globals.model;

        var matter = this.matter
        matter.world.setBounds(0, 0, game.config.width, game.config.height);

        var balloon = matter.add.image(400, 200, 'balloon', null, {
          shape: {type: 'circle',
                  radius: 32},
          mass: 0.1,
          ignorePointer: true,
          gravityScale: {x: 1, y: -1}
        });

        var firstRope = this.matter.add.sprite(400, 231.5, 'rope', null, {
          ignoreGravity: true,
          ignorePointer: true
        });
        matter.add.joint(balloon, firstRope, 35);

        var prev = firstRope;
        var i;
        for (i = 0; i < 10; i++) {
          var ropeSection = this.matter.add.image(400, 241.5 + (i * 10), 'rope', null, {
            ignoreGravity: true,
            ignorePointer: true
          });
          matter.add.joint(prev, ropeSection, 13);
          prev = ropeSection;
        }

        var lastRope = this.matter.add.image(400, 251.5 + (i * 10), 'rope', null, {
          mass: 50000,
          ignoreGravity: true,
          frictionAir: 1,
          fixedRotation: true
        });
        matter.add.joint(prev, lastRope, 20);

        matter.add.mouseSpring();
    }

    update () {
        var config = this.game.config;
        this.model = this.sys.game.globals.model; 
    }
};


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

        this.matter.world.setBounds();

        //player.setCollideWorldBounds(true);

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        playerSpeed = 200;

        this.menuButton = new Button(this, 250, 480, 'Button', 'ButtonPressed', 'Menu', 'Title');

        this.matter.add.imageStack('star', null, 0, 500, 50, 2, 0, 0, {
            mass: 0.5,
            ignorePointer: true //makes it undraggable
        });

        var sun = this.matter.add.image(400, 200, 'box', null, {
            shape: {
                type: 'circle',
                radius: 64
            },
            plugin: {
                attractors: [
                    function (bodyA, bodyB) {
                        return {
                            x: (bodyA.position.x - bodyB.position.x) * 0.000001,
                            y: (bodyA.position.y - bodyB.position.y) * 0.000001
                        };
                    }
                ]
            }
        });

        var fan = this.matter.add.image(100, 200, 'box', null, {
            attractors: [
                function (bodyA, BodyB) {
                    return {
                        x: (bodyB.position.x + 10)
                    }
                }]
        });

        this.matter.add.mouseSpring();

    /*
    Return a force ({x,y}), which will be applied to bodyB

function(bodyA, bodyB) {
    return {x, y}; // Force
}
bodyA : Attractor matter object.
bodyB : Other matter object.
Apply forece to bodies directly.

function(bodyA, bodyB) {
    bodyA.gameObject.applyForce({x, y});
    bodyB.gameObject.applyForce({x, y});
}
*/


    }

    update () {
        var config = this.game.config;
        this.model = this.sys.game.globals.model; 


        // if (cursors.left.isDown)
        // {
        //     player.setVelocityX(-playerSpeed);
        // }
        // else if (cursors.right.isDown)
        // {
        //     player.setVelocityX(playerSpeed);
        // }
        // else
        // {
        //     player.setVelocityX(0);
        // }

        // if (cursors.up.isDown)
        // {
        //     player.setVelocityY(-playerSpeed);
        // }
        // else if (cursors.down.isDown)
        // {
        //     player.setVelocityY(playerSpeed);
        // }
        // else
        // {
        //     player.setVelocityY(0);
        // }
    }
};


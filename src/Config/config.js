import 'phaser';

export default {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                scale: 0
            },
            plugins: {
                attractors: true
            }
        }
    }
};

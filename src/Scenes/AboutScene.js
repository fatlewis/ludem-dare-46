import 'phaser';
import Button from '../Objects/Button';

export default class AboutScene extends Phaser.Scene {
    constructor () {
        super('About');
    }


    create () {
        var config = this.game.config;
        this.model = this.sys.game.globals.model;

        this.add.image(config.width/2, config.height/2, 'background');

        this.add.text(config.width*0.1, config.height*0.11, 'About text.', { align: 'center', fontSize: '25px', fill: '#000' });
        this.menuButton = new Button(this, 400, 480, 'Button', 'ButtonPressed', 'Menu', 'Title');

    }

};

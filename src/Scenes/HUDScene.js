import 'phaser';
import Button from '../Objects/Button';

export default class HUDScene extends Phaser.Scene {
    constructor ()
    {
        super('HUD');
    }

    create ()
    {

      this.button = this.scene.scene.add.sprite(150, 550, 'Button').setInteractive({ useHandCursor: true });
      this.text = this.scene.scene.add.text(0, 0, 'Menu', { fontSize: '32px', fill: '#000' });
      Phaser.Display.Align.In.Center(this.text, this.button);

      const bgScene = this.scene.settings.data.backgroundScene;

      this.button.on('pointerdown', () => {
        bgScene.scene.stop();
        this.scene.start('Title');
      });

      this.button.on('pointerover', () => {
        this.button.setTexture('ButtonPressed');
      });

      this.button.on('pointerout', () => {
        this.button.setTexture('Button');
      });  


    }
}
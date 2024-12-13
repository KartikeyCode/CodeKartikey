import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');

        this.logo = this.add.image(512, 300, 'logo').setDepth(100);

        this.title = this.add.text(512, 500, 'PLAY', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        this.title.setInteractive();
        
        //hover effects
        this.title.on('pointerover', () => {
            this.tweens.add({
                targets: this.title,
                scale: 1.2,
                duration: 200,
                ease: 'Power2'
            });
        });
        
        this.title.on('pointerout', () => {
            this.tweens.add({
                targets: this.title,
                scale: 1,
                duration: 200,
                ease: 'Power2'
            });
        });

        //start the game
        this.title.on('pointerdown',()=>{
            this.scene.start('Game');
        })
        EventBus.emit('current-scene-ready', this);
    }
    
    

}

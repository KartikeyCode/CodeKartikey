import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    private racc!:Phaser.Physics.Arcade.Sprite
    cursors:Phaser.Types.Input.Keyboard.CursorKeys | undefined
    constructor ()
    {
        super('Game');
        
    }

    preload(){
        // tilemap images
        this.load.image("tilesPlant","assets/TX_Plant.png")
        this.load.image("tilesPlayer","assets/TX_Player.png")
        this.load.image("tilesProps","assets/TX_Props.png")
        this.load.image("tilesStruct","assets/TX_Struct.png")
        this.load.image("tilesGrass","assets/TX_Tileset_Grass.png")
        this.load.image("tilesStone","assets/TX_Tileset_Stone_Ground.png")
        this.load.image("tilesWall","assets/TX_Tileset_Wall.png")
        this.load.tilemapTiledJSON('map','assets/tilemap1.json')

        //player sprite
        this.load.atlas('racc','assets/texture.png','assets/texture.json')

      

    }

    create ()
    {
        //tilemap generation
        const map = this.make.tilemap({key:'map'})
        const plant_tileset = map.addTilesetImage('TX_Plant','tilesPlant')
        const player_tileset = map.addTilesetImage('TX_Player','tilesPlayer')
        const props_tileset = map.addTilesetImage('TX_Props','tilesProps')
        const struct_tileset = map.addTilesetImage('TX_Struct','tilesStruct')
        const grass_tileset = map.addTilesetImage('TX_Tileset_Grass','tilesGrass')
        const stone_tileset = map.addTilesetImage('TX_Tileset_Stone_Ground','tilesStone')
        const wall_tileset = map.addTilesetImage('TX_Tileset_Wall','tilesWall')
        const tilesetarr = [plant_tileset,player_tileset,props_tileset,struct_tileset,grass_tileset,stone_tileset,wall_tileset].filter(tileset => tileset !== null); //No null values allowed
    
        const tilelayer1 = map.createLayer('Tile Layer 1', tilesetarr);
        const objects = map.createLayer('objects',tilesetarr);
        const buildings = map.createLayer('buildings',tilesetarr);
        const roofs = map.createLayer('Roofs',tilesetarr);
        
        //adding player
        this.racc = this.physics.add.sprite(100,700,'racc','facedown');
        this.racc.setScale(0.25)
        this.createPlayerAnimations(this.racc) //Add animations to player
        this.racc.setCollideWorldBounds(true) //don't fall off the map lol

        //camera follow player
        this.cameras.main.setBounds(0,0,1024,768)
        this.cameras.main.setZoom(1.5)
        this.cameras.main.startFollow(this.racc)

        EventBus.emit('current-scene-ready', this);
    }

    //player animations method
    private createPlayerAnimations(player: Phaser.Physics.Arcade.Sprite){
        player.anims.create({
            key:'walkdown',
            frames: player.anims.generateFrameNames('racc',{
                start:1,
                end:8,
                prefix:'walkdown',
                suffix:'.gif'
            }),
            frameRate:10,
            repeat:-1
        })
        player.anims.create({
            key:'walkup',
            frames: player.anims.generateFrameNames('racc',{
                start:1,
                end:8,
                prefix:'walkup',
                suffix:'.gif'
            }),
            frameRate:10,
            repeat:-1
        })
        player.anims.create({
            key:'walkleft',
            frames: player.anims.generateFrameNames('racc',{
                start:1,
                end:8,
                prefix:'walkleft',
                suffix:'.gif'
            }),
            frameRate:10,
            repeat:-1
        })
        player.anims.create({
            key:'walkright',
            frames: player.anims.generateFrameNames('racc',{
                start:1,
                end:8,
                prefix:'walkright',
                suffix:'.gif'
            }),
            frameRate:10,
            repeat:-1
        })
        //idle:
        player.anims.create({
            key:'faceup',
            frames: [{key:'racc',frame:'faceup.gif'}]
        })
        player.anims.create({
            key:'facedown',
            frames: [{key:'racc',frame:'facedown.gif'}]
        })
        player.anims.create({
            key:'faceleft',
            frames: [{key:'racc',frame:'faceleft.gif'}]
        })
        player.anims.create({
            key:'faceright',
            frames: [{key:'racc',frame:'faceright.gif'}]
        })

        // keyboard input
         this.cursors = this.input.keyboard?.createCursorKeys()
        



    }

    update(time: number, delta: number): void {
        if(!this.cursors || !this.racc){
            return
        }
        const speed = 100
        if(this.cursors.left?.isDown){
            this.racc.anims.play('walkleft',true)
            this.racc.setVelocity(-speed,0)
        }
        else if(this.cursors.right?.isDown){
            this.racc.anims.play('walkright',true)
            this.racc.setVelocity(speed,0)
        }
        else if(this.cursors.down?.isDown){
            this.racc.anims.play('walkdown',true)
            this.racc.setVelocity(0,speed)
        }
        else if(this.cursors.up?.isDown){
            this.racc.anims.play('walkup',true)
            this.racc.setVelocity(0,-speed)
        }
        else{
            this.racc.anims.play('facedown')
            this.racc.setVelocity(0,0)
        }
    }

    
}

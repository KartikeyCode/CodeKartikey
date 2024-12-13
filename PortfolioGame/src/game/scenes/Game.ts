import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    preload(){
        this.load.image("tilesPlant","assets/TX_Plant.png")
        this.load.image("tilesPlayer","assets/TX_Player.png")
        this.load.image("tilesProps","assets/TX_Props.png")
        this.load.image("tilesStruct","assets/TX_Struct.png")
        this.load.image("tilesGrass","assets/TX_Tileset_Grass.png")
        this.load.image("tilesStone","assets/TX_Tileset_Stone_Ground.png")
        this.load.image("tilesWall","assets/TX_Tileset_Wall.png")
        this.load.tilemapTiledJSON('map','assets/tilemap1.json')

    }

    create ()
    {

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
        

        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}

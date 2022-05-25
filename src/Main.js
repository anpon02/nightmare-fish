//import SoundFadePlugin from './Assets/AudioFiles/soundfade-plugin.js';

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,

    scene: [ Menu, Day, Cloud, Rain, Night, Over, CutOne, AudioManager, CutTwo ]
}

//game declaration
let game = new Phaser.Game(config);

//reserve key vars
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE, keyESC, keyC, keySHIFT, keyENTER, keyN, keyR;

let gamewidth= game.config.width;
let gameheight= game.config.height;
let borderUISize= game.config.height / 15;
let borderPadding = borderUISize / 3;
let goback = 'dayScene';
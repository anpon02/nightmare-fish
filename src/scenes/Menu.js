class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    preload(){
        this.load.spritesheet('overlay', './Assets/overlay.png', {frameWidth: 480, frameHeight: 672, startFrame: 0, endFrame: 5});

        this.load.image('titleCard', './Assets/titlecard.png' );
        this.load.image('hills','./Assets/CutSceneOne/hills.png');
        this.load.image('sunrise','./Assets/CutSceneOne/sunrise.png');
        this.load.spritesheet('lake', './Assets/CutSceneOne/lake.png', {frameWidth: 1434, frameHeight: 885, startFrame: 0, endFrame: 2});

        this.load.audio('bgm_DriftWood', './Assets/AudioFiles/bgm_DriftWood.mp3');
        this.load.audio('bgm_ReelingFromCurrent', './Assets/AudioFiles/bgm_ReelingFromCurrent.wav');
        this.load.audio('bgm_ReelingFromFog', './Assets/AudioFiles/bgm_ReelingFromCurrent(Fog).mp3');
        this.load.audio('bgm_gameOver', './Assets/AudioFiles/bgm_gameOver.mp3');

        this.load.audio('sfx_startMenu', './Assets/AudioFiles/sfx_startMenu.wav');
        this.load.audio('sfx_lineReeling1', './Assets/AudioFiles/sfx_lineReeling1.mp3');
        this.load.audio('sfx_lineReeling2', './Assets/AudioFiles/sfx_lineReeling2.mp3');
        this.load.audio('sfx_lineReeling3', './Assets/AudioFiles/sfx_lineReeling3.mp3');
        this.load.audio('sfx_lineReeling4', './Assets/AudioFiles/sfx_lineReeling4.mp3');
        this.load.audio('sfx_lineReeling5', './Assets/AudioFiles/sfx_lineReeling5.mp3');
        this.load.audio('sfx_lineCast', './Assets/AudioFiles/sfx_lineCast.mp3');
        

        // Borrowed and edited free audio (ZapSplat):
        this.load.audio('bgsfx_rain', './Assets/AudioFiles/bgsfx_rain.mp3');
        this.load.audio('bgsfx_beach', './Assets/AudioFiles/bgsfx_beach.mp3');

        this.load.audio('sfx_lineCrack', './Assets/AudioFiles/sfx_lineCrack.mp3');
        this.load.audio('sfx_cicada1', './Assets/AudioFiles/sfx_cicada1.mp3');
        this.load.audio('sfx_cicada2', './Assets/AudioFiles/sfx_cicada2.mp3');
        this.load.audio('sfx_loseSplash', './Assets/AudioFiles/sfx_loseSplash.mp3');
    }

    create() {
        this.add.text(20, 20, "This is the menu!");

        this.anims.create({
            key: 'lake',
            frames: this.anims.generateFrameNumbers('lake', {start: 0, end: 2, first: 0}), frameRate: .5
        });

        this.anims.create({
            key: 'overlay',
            frames: this.anims.generateFrameNumbers('overlay', {start: 0, end: 5, first: 0}), frameRate: 6
        });

        //images
        this.sunrise = this.add.tileSprite(0, 0, 640, 480, 'sunrise').setOrigin(0, 0);
        this.lake = this.add.sprite(0,0,'lake').setOrigin(0,0);
        this.hills = this.add.sprite(0,0,'hills').setOrigin(0,0);
        this.titleCard = this.add.sprite(320,240,'titleCard').setOrigin(0.5,0.5);

        //overlay
        this.overlay = this.add.sprite(0, 0, 'overlay').setOrigin(0, 0);
        this.overlay.setBlendMode(Phaser.BlendModes.ADD);
        this.overlay.scaleX= 3;
        this.overlay.scaleY= 1.5;
        this.overlay.alpha= .25;

        //define key (use keyRight to switch scenes for now)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.fade= false;


        let backgroundConfig = {
            loop: true,
            volume: 1,
          }

        this.dayMusic = this.sound.add('bgm_DriftWood', backgroundConfig);
        this.beachSFX = this.sound.add('bgsfx_beach', backgroundConfig);
        //this.sound.play('bgsfx_beach');
        this.beachSFX.play();
        
    }

    update() {
        this.overlay.anims.play('overlay', 1, true);
        this.lake.anims.play('lake', 1, true);
        this.sunrise.tilePositionX -= .05;

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("Menu to Day");
            this.scene.start('cutoneScene');
            console.log("MOOS");
            this.game.sound.stopAll();
            this.dayMusic.play();
            //replace with cutscene ^
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            console.log("Begin Game");
            this.fade= true;
            this.sound.play('sfx_startMenu');
            this.beachTween = this.tweens.add({
                targets: this.beachSFX,
                volume: 0,
                duration: 3000
            });
            this.time.addEvent({delay: 5000, callback: () => {
                this.scene.start('cutoneScene');
                this.game.sound.stopAll();
                this.dayMusic.play();
            }, callbackScope: this, loop: false});
        }
        if(this.fade){
            this.titleCard.alpha-= .0025;
        }
    }
}
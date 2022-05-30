var text = ["Sailor: Goin' fishing?", "Sailor: Didn't'cha hear? Town's bein' evacuated on account'a all the people goin' missin'.",
 "Sailor: Nothin' worth risking your life for out on those waters.", "Sailor: ...",
 "Sailor: You got the look of someone who's made up their mind.", "Sailor: Well, I wish y'luck, friend.", "Sailor: Hope y'find whatch'er lookin' for.", 
 "Sailor: Just remember t' stay out of the water...", "Sailor: If y'wanna come back, that is."];

class CutTwo extends Phaser.Scene {
    constructor() {
      super("twoScene");
    }

    preload(){
        // load plugin
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');

        //load sprites
        this.load.image('cutsceneTwoBG','./Assets/CutSceneTwo/cutsceneTwoBackground.png');
        this.load.image('cutsceneTwoPier','./Assets/CutSceneTwo/cutsceneTwoPier.png');
        this.load.image('cutsceneTwoPlayer','./Assets/CutSceneTwo/cutsceneTwoPlayer.png');
        this.load.image('cutsceneTwoSailor','./Assets/CutSceneTwo/cutsceneTwoSailor.png');
        this.load.image('cutsceneTwoSunrise','./Assets/CutSceneTwo/cutsceneTwoSunrise.png');
        this.load.image('continueText','./Assets/CutSceneTwo/continueText.png');
        this.load.image('TextBox','./Assets/CutSceneTwo/TextBox.png'); 
        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
        this.load.bitmapFont('gothic', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/fonts/gothic.png',
         'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/fonts/gothic.xml'); 
    }

    create() {
        this.add.text(20, 20, "CUT SCENE");

        //place images
        this.TwoBackground = this.add.sprite(0,0,'cutsceneTwoBG').setOrigin(0,0);
        this.TwoSunrise = this.add.tileSprite(0, 0, 640, 480, 'cutsceneTwoSunrise').setOrigin(0, 0);
        this.TwoPier = this.add.sprite(0,0,'cutsceneTwoPier').setOrigin(0,0);
        this.TwoPlayer = this.add.sprite(440,250,'cutsceneTwoPlayer').setOrigin(0.5,1);
        this.TwoSailor = this.add.sprite(200,250,'cutsceneTwoSailor').setOrigin(0.5,1);
        this.textBox = this.add.sprite(0,280,'TextBox').setOrigin(0,0);
        this.continueText = this.add.sprite(game.config.width/2, game.config.height - 80, 'continueText').setOrigin(0.5, 0);

        
        this.t1 = this.rexUI.add.textBox({
            x: 30,
            y: 320,

            width: 200,
            height: 50,

            background: null,
            icon: null,
            iconMask: false,
            action: this.add.image(0, 0, 'nextPage').setTint(0x7B5E57).setVisible(false),
            actionMask: false,
            text: this.add.bitmapText(0, 0, 'gothic').setFontSize(30).setMaxWidth(600),

            space: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
        
                icon: 0,
                text: 0,
            },

            page: {
                pageBreak: '\f\n'
            },

            typing: { 
                wrap: false,
                speed: 333,    
            },

        }).setOrigin(0).layout();

        //overlay
        this.overlay = this.add.sprite(0, 0, 'overlay').setOrigin(0, 0);
        this.overlay.setBlendMode(Phaser.BlendModes.ADD);
        this.overlay.scaleX= 3;
        this.overlay.scaleY= 1.5;
        this.overlay.alpha= .25;

        //blackscreen
        this.blackScreen= this.add.sprite(0,0, 'blackScreen').setOrigin(0,0);

        this.fade= false;
        this.timer= 0;
        this.spacePressed= false;
        this.continueText.alpha= 0;

        //define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //
        this.count = 0;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("two to day");
            this.scene.start('dayScene');
            this.game.sound.stopAll();
        }
        if (this.count >= text.length && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.fade=true; 
            this.time.addEvent({delay: 4000, callback: () => {
                this.scene.start('dayScene');
                this.game.sound.stopAll();
            }, callbackScope: this, loop: false});
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.spacePressed =true;
            this.t1.start(text[this.count], 20);
            this.count++;
        }

        if(!this.spacePressed){
            this.continueText.alpha += .0025;
        }
        else{
            this.continueText.alpha -= .005;
        }

        if(!this.fade){
            this.blackScreen.alpha -= .005;
        }
        else{
            this.blackScreen.alpha += .005;
        }

        this.overlay.anims.play('overlay', 1, true);
    }
}
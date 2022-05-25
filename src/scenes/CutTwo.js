class CutTwo extends Phaser.Scene {
    constructor() {
      super("twoScene");
    }

    preload(){
        // load plugin
        //this.load.scenePlugin('rexplugin', './Assets/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');

        //load sprites
        this.load.image('cutsceneTwoBG','./Assets/CutSceneTwo/cutsceneTwoBackground.png');
        this.load.image('cutsceneTwoPier','./Assets/CutSceneTwo/cutsceneTwoPier.png');
        this.load.image('cutsceneTwoPlayer','./Assets/CutSceneTwo/cutsceneTwoPlayer.png');
        this.load.image('cutsceneTwoSailor','./Assets/CutSceneTwo/cutsceneTwoSailor.png');
        this.load.image('cutsceneTwoSunrise','./Assets/CutSceneTwo/cutsceneTwoSunrise.png');
        this.load.image('TextBox','./Assets/CutSceneTwo/TextBox.png'); 
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

        let textStyle = {
            color: '#aaa',
            wordWrap: {
                width: 500,
                callback: null,
                callbackScope: null,
                useAdvancedWrap: false
            }
        };
        console.log("Width is: " + textStyle.wordWrap.width);

        var textObj = this.add.text(10, 290, 'howre vgrth bgbyjnmuk ,kytrr gbnu6i76 u5yb5y6uj ik6u5y4t4ty uik6u5y4t 3retyh6ujuytrwdy', textStyle);

        // var textBox2 = this.rexUI.add.textBox({
        //     x: 280,
        //     y:0,

        //     width: 200,
        //     height: 50,

        //     text: textObj,

        //     space: {
        //         left: 0,
        //         right: 0,
        //         top: 0,
        //         bottom: 0,
        
        //         icon: 0,
        //         text: 0,
        //     },

        // });

        //overlay
        this.overlay = this.add.sprite(0, 0, 'overlay').setOrigin(0, 0);
        this.overlay.setBlendMode(Phaser.BlendModes.ADD);
        this.overlay.scaleX= 3;
        this.overlay.scaleY= 1.5;
        this.overlay.alpha= .25;

        //blackscreen
        this.blackScreen= this.add.sprite(0,0, 'blackScreen').setOrigin(0,0);

        this.timer= 0;

        //define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("two to day");
            this.scene.start('dayScene');
        }
        this.timer += .001;

        this.blackScreen.alpha -= .005;
        this.overlay.anims.play('overlay', 1, true);
    }


}
class CutTwo extends Phaser.Scene {
    constructor() {
      super("twoScene");
    }

    preload(){
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
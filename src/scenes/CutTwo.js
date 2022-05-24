class CutTwo extends Phaser.Scene {
    constructor() {
      super("twoScene");
    }

    create() {
        this.add.text(20, 20, "CUT SCENE");

        
        this.load.image('cutsceneTwoBG','./Assets/CutSceneTwo/cutsceneTwoBackground.png');
        this.load.image('cutsceneTwoPier','.Assets/CutSceneTwo/cutsceneTwoPier.png');
        this.load.image('cutsceneTwoPlayer','./Assets/CutSceneTwo/cutsceneTwoPlayer.png');
        this.load.image('cutsceneTwoSailor','./Assets/CutSceneTwo/cutsceneTwoSailor.png');
        this.load.image('cutsceneTwoSunrise','./Assets/CutSceneTwo/cutsceneTwoSunrise.png');
        this.load.image('TextBox','./Assets/CutSceneTwo/TextBox.png');

        //place images
        this.cutsceneTwoBackground = this.add.sprite(0,0,'cutsceneTwoBG').setOrigin(0,0);
        this.cutsceneTwoSunrise = this.add.tileSprite(0, 0, 640, 480, 'cutsceneTwoSunrise').setOrigin(0, 0);
        this.cutsceneTwoPier = this.add.sprite(0,0,'cutsceneTwoPier').setOrigin(0,0);
        this.cutsceneTwoPlayer = this.add.sprite(420,250,'cutsceneTwoPlayer').setOrigin(0,1);
        this.cutsceneTwoSailor = this.add.sprite(260,250,'cutsceneTwoSailor').setOrigin(0,1);


        //define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("two to day");
            this.scene.start('dayScene');
        }
    }


}
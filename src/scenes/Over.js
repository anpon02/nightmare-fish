class Over extends Phaser.Scene {
    constructor() {
      super("overScene");
    }
    preload(){
        this.load.image('gameoverHat', './Assets/gameover/gameover_hat.png');
        this.load.image('gameoverBG', './Assets/gameover/gameover_background.png');


    }


    create() {
        this.add.text(20, 20, "OVER SCENE");
        this.add.text(game.config.width/2, game.config.height/2, "PRESS 'R' TO RESTART 'ESC' TO MAIN MENU").setOrigin(0.5, 0);

        this.gameoverBG= this.add.sprite(-20,0, 'gameoverBG').setOrigin(0,0);
        this.gameoverHat= this.add.sprite(-20,0, 'gameoverHat').setOrigin(0,0);

        //define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //overlay
        this.overlay = this.add.sprite(0, 0, 'overlay').setOrigin(0, 0);
        this.overlay.setBlendMode(Phaser.BlendModes.ADD);
        this.overlay.scaleX= 1.5;
        this.overlay.alpha= .25;

        this.dayRestbgm = this.sound.add('bgm_DriftWood')
<<<<<<< HEAD
        this.game.sound.stopAll();
        this.sound.play('bgm_gameOver');
    }

    update() {
        
=======

        this.timer= 0;
    }

    update() {
        this.overlay.anims.play('overlay', 1, true);

        this.timer += .005;
        this.gameoverHat.y= 4* Math.sin(this.timer);
        
        this.game.sound.stopAll();
>>>>>>> 881df42f434ee679c98f265dc9915f8ebd85d5fb
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            console.log("Over to Day");
            this.scene.start(goback);
            if (goback == 'dayScene'){
                this.dayRestbgm.play();
            } 
        }

        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            console.log("Over to Menu");
            this.scene.start('menuScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('nightScene');
        }
    }
}
class Day extends Phaser.Scene {
    constructor() {
      super("dayScene");
    }

    preload() {
        this.load.image('hook', './assets/hook.png');
        this.load.image('cText', './assets/cText.png');
        this.load.image('spaceText', './assets/spaceText.png');
        this.load.image('caught', './assets/caughtMessage.png');
        this.load.image('barGreen', './assets/bar_green.png');
        this.load.image('barRed', './assets/bar_red.png');
        this.load.spritesheet('water', './assets/water.png', {frameWidth: 640, frameHeight: 120, startFrame: 0, endFrame: 11});
        this.load.image('boat', './assets/boat.png');
        this.load.image('player', './assets/player.png');
        this.load.image('trees', './assets/Trees.png');
        this.load.image('bg', './assets/background.png');
        this.load.spritesheet('overlay', './assets/overlay.png', {frameWidth: 480, frameHeight: 672, startFrame: 0, endFrame: 5});

    }

    create() {
        this.add.text(20, 20, "DAY SCENE!");

        this.anims.create({
            key: 'overlay',
            frames: this.anims.generateFrameNumbers('overlay', {start: 0, end: 5, first: 0}), frameRate: 6
        });

        this.anims.create({
            key: 'water',
            frames: this.anims.generateFrameNumbers('water', {start: 0, end: 11, first: 0}), frameRate: 3
        });

        //define key (use keyRight to switch scenes for now)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);


        //place spritesheets
        this.background = this.add.tileSprite(0, 0, gamewidth, gameheight, 'bg').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 0, gamewidth, gameheight, 'trees').setOrigin(0, 0);
        this.player = this.add.sprite(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,'player').setOrigin(0.5, 0);
        this.boat = this.add.sprite(game.config.width/2, game.config.height/1.5 - borderUISize - borderPadding,'boat').setOrigin(0.5, 0);
        this.water = this.add.sprite(game.config.width/2, game.config.height/1.15 - borderUISize - borderPadding,'water').setOrigin(0.5, 0);
        this.barRed = this.add.sprite(game.config.width/2, game.config.height/7 - borderUISize - borderPadding,'barRed').setOrigin(0.5, 0);
        this.barGreen = this.add.sprite(game.config.width/2, game.config.height/7 - borderUISize - borderPadding,'barGreen').setOrigin(0.5, 0);
        this.caughtSprite = this.add.sprite(game.config.width/2, game.config.height/4 - borderUISize - borderPadding,'caught').setOrigin(0.5, 0);
        this.hook = this.add.sprite(game.config.width/2, game.config.height/9 - borderUISize - borderPadding,'hook').setOrigin(0.5, 0);
        this.cText = this.add.sprite(game.config.width/2, game.config.height - 80, 'cText').setOrigin(0.5, 0);
        this.spaceText = this.add.sprite(game.config.width/2, game.config.height/2 - 140, 'spaceText').setOrigin(0.5, 0);

        

        //overlay
        this.overlay = this.add.sprite(0, 0, 'overlay').setOrigin(0, 0);
        this.overlay.setBlendMode(Phaser.BlendModes.ADD);
        this.overlay.scaleX= 1.5;
        this.overlay.alpha= .25;

        //alphas
        this.cText.alpha= 0;
        this.spaceText.alpha= 0;

        //hook variable
        this.hookX=0;

        //cast variables
        this.cast = false;
        this.castTimer = 6000;
        this.caughtSprite.alpha = 0;
        this.move = false;
        this.spacePressed= false;
        
    }

    update() {
        this.overlay.anims.play('overlay', 1, true);
        this.water.anims.play('water', 1, true);

        //temp
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("Day to Cloud");
            this.scene.start('cloudScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene');
        }

        //text manager
        
        if(!this.cast){
            this.cText.alpha += .005;
        }

        if(this.move && !this.spacePressed){
            this.spaceText.alpha += .005;
        }
        else{
            this.spaceText.alpha -= .005;
        }


        //cast mechanic
        if (this.cast && !this.move) {
            this.castTimer -= 25
            console.log("timer: " + this.castTimer);
            if(this.castTimer <= 0){
                this.caughtSprite.alpha = 1;
                //run function that says "CAUGHT!" or something on screen
                if(Phaser.Input.Keyboard.JustDown(keyC)){
                    this.caughtSprite.alpha = 0;
                    this.move= true;
                    console.log("start reeling");
                }
                else if (this.castTimer == -6000 && !this.move) {
                    //play death
                    this.scene.start('overScene');
                }
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.cText.alpha = 0;
            this.cast = true;
        }
        
        //UI movement
        if (this.move) { 
            this.hookX+=.01; //controls hook speed
            this.hook.x = (252* (Math.sin(this.hookX)) +320); //controls hook placement
        }
        //input checks
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.move) {
            //correct input
            this.spacePressed= true;
            
            if(this.hook.x <= this.barGreen.x + .5* this.barGreen.width && this.hook.x >= this.barGreen.x - .5* this.barGreen.width){
                this.player.x -= 15;
            }
            //incorrect input
            else{
                this.player.x += 40;
            }
        }

        //player moves towards the edge of the boat
        if (this.move) {
            this.player.x += .075;
        }

        //conditionals for winning and losing
        if(this.player.x + .5*this.player.width > this.boat.x + .5*this.boat.width){
            this.cast = false
            this.scene.start('overScene'); //lose
        }

        if(this.player.x - .5*this.player.width < this.boat.x - .5*this.boat.width){
            this.scene.start('cloudScene'); //win
        }
    }
}
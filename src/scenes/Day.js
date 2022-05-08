class Day extends Phaser.Scene {
    constructor() {
      super("dayScene");
    }

    preload() {
        this.load.image('hook', './assets/hook.png');
        this.load.image('barGreen', './assets/bar_green.png');
        this.load.image('barRed', './assets/bar_red.png');
        this.load.image('water', './assets/water.png');
        this.load.image('boat', './assets/boat.png');
        this.load.image('player', './assets/player.png');
        this.load.image('trees', './assets/Trees.png');
        this.load.image('bg', './assets/background.png');
    }

    create() {
        this.add.text(20, 20, "DAY SCENE!");

        //define key (use keyRight to switch scenes for now)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        //place spritesheets
        this.background = this.add.tileSprite(0, 0, gamewidth, gameheight, 'bg').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 0, gamewidth, gameheight, 'trees').setOrigin(0, 0);
        this.player = this.add.sprite(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,'player').setOrigin(0.5, 0);
        this.boat = this.add.sprite(game.config.width/2, game.config.height/1.5 - borderUISize - borderPadding,'boat').setOrigin(0.5, 0);
        this.water = this.add.sprite(game.config.width/2, game.config.height/1.15 - borderUISize - borderPadding,'water').setOrigin(0.5, 0);
        this.barRed = this.add.sprite(game.config.width/2, game.config.height/7 - borderUISize - borderPadding,'barRed').setOrigin(0.5, 0);
        this.barGreen = this.add.sprite(game.config.width/2, game.config.height/7 - borderUISize - borderPadding,'barGreen').setOrigin(0.5, 0);
        this.hook = this.add.sprite(game.config.width/2, game.config.height/9 - borderUISize - borderPadding,'hook').setOrigin(0.5, 0);

        this.hookX=0;
    }

    update() {
        //temp
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("Day to Cloud");
            this.scene.start('cloudScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene');
        }

        //UI movement 
        this.hookX+=.01; //controls hook speed
        this.hook.x = (252* (Math.sin(this.hookX)) +320); //controls hook placement

        //input checks
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            //correct input
            if(this.hook.x <= this.barGreen.x + .5* this.barGreen.width && this.hook.x >= this.barGreen.x - .5* this.barGreen.width){
                this.player.x -= 10;
            }
            //incorrect input
            else{
                this.player.x += 25;
            }
        }

        //player moves towards the edge of the boat
        this.player.x += .05;

        //conditionals for winning and losing
        if(this.player.x + .5*this.player.width > this.boat.x + .5*this.boat.width){
            this.scene.start('overScene'); //lose
        }

        if(this.player.x - .5*this.player.width < this.boat.x - .5*this.boat.width){
            this.scene.start('cloudScene'); //win
        }

    }
}
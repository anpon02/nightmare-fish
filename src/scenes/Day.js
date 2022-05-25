class Day extends Phaser.Scene {
    constructor() {
      super("dayScene");
    }

    preload() {

        this.load.image('hook', './Assets/hook.png');
        this.load.image('cText', './Assets/TutorialText/cText.png');
        this.load.image('spaceText', './Assets/TutorialText/spaceText.png');
        this.load.image('carefulText', './Assets/TutorialText/beCareful.png');
        this.load.image('fallText', './Assets/TutorialText/dontFallIn.png');
        this.load.image('mashText', './Assets/TutorialText/mashSpace.png');
        this.load.image('caught', './Assets/caughtMessage.png');
        this.load.image('barGreen', './Assets/bar_green.png');
        this.load.image('barRed', './Assets/bar_red.png');
        this.load.spritesheet('water', './Assets/water.png', {frameWidth: 640, frameHeight: 120, startFrame: 0, endFrame: 11});
        this.load.image('boat', './Assets/boat.png');
        this.load.image('player', './Assets/player.png');
        this.load.image('trees', './Assets/Trees.png');
        this.load.image('bg', './Assets/background.png');
        this.load.spritesheet('overlay', './Assets/overlay.png', {frameWidth: 480, frameHeight: 672, startFrame: 0, endFrame: 5});
        this.load.image('DayFish', './Assets/Fish/DayFish.png');
        
        //load json
        this.load.atlas('playerAtlas', './Assets/playerAtlas.png', './Assets/playermap.json');
    }

    create() {
        goback = 'dayScene';
        this.add.text(20, 20, "DAY SCENE!");

        //create animations
        this.anims.create({
            key: 'overlay',
            frames: this.anims.generateFrameNumbers('overlay', {start: 0, end: 5, first: 0}), frameRate: 6
        });

        this.anims.create({
            key: 'water',
            frames: this.anims.generateFrameNumbers('water', {start: 0, end: 11, first: 0}), frameRate: 3
        });

        //player idle
        this.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNames('playerAtlas', {
                prefix: 'player_idle_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 2,
            repeat: -1,
            yoyo: true,
        });

        //player cast
        this.anims.create({
            key: 'player_cast',
            frames: this.anims.generateFrameNames('playerAtlas', {
                prefix: 'player_cast_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 6,
            //repeat: -1,
        });

        //player reel
        this.anims.create({
            key: 'player_reel',
            frames: this.anims.generateFrameNames('playerAtlas', {
                prefix: 'player_reel_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 6,
            repeat: -1,
        });

        //player miss
        this.anims.create({
            key: 'player_miss',
            frames: this.anims.generateFrameNames('playerAtlas', {
                prefix: 'player_miss_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 6,
            repeat: -1,
            yoyo: true,
        });

        //player catch
        this.anims.create({
            key: 'player_catch',
            frames: this.anims.generateFrameNames('playerAtlas', {
                prefix: 'player_catch_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 6,
            repeat: -1,
            yoyo: true,
        });

        //define key (use keyRight to switch scenes for now)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);


        //place spritesheets
        this.background = this.add.tileSprite(0, 0, gamewidth, gameheight, 'bg').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 0, gamewidth, gameheight, 'trees').setOrigin(0, 0);
        this.player = this.add.sprite(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,'playerAtlas', 'player_idle').setOrigin(0.5, 0);
        this.boat = this.add.sprite(game.config.width/2, game.config.height/1.5 - borderUISize - borderPadding,'boat').setOrigin(0.5, 0);
        this.water = this.add.sprite(game.config.width/2, game.config.height/1.15 - borderUISize - borderPadding,'water').setOrigin(0.5, 0);
        this.barRed = this.add.sprite(game.config.width/2, game.config.height/7 - borderUISize - borderPadding,'barRed').setOrigin(0.5, 0);
        this.barGreen = this.add.sprite(game.config.width/2, game.config.height/7 - borderUISize - borderPadding,'barGreen').setOrigin(0.5, 0);
        this.caughtSprite = this.add.sprite(game.config.width/2, game.config.height/4 - borderUISize - borderPadding,'caught').setOrigin(0.5, 0);
        this.hook = this.add.sprite(game.config.width/2, game.config.height/9 - borderUISize - borderPadding,'hook').setOrigin(0.5, 0);
        this.cText = this.add.sprite(game.config.width/2, game.config.height - 80, 'cText').setOrigin(0.5, 0);
        this.spaceText = this.add.sprite(game.config.width/2, game.config.height/2 - 140, 'spaceText').setOrigin(0.5, 0);
        this.carefulText = this.add.sprite(game.config.width/2 + 200, game.config.height/2 -140 , 'carefulText').setOrigin(0.5, 0);
        this.fallText = this.add.sprite(game.config.width/2 + 200, game.config.height/2 - 40, 'fallText').setOrigin(0.5, 0);
        this.mashText = this.add.sprite(game.config.width/2, game.config.height/2 - 150, 'mashText').setOrigin(0.5, 0);
        //this.fish = this.add.sprite(game.config.width/2, 55,'DayFish').setOrigin(0.5, 0);
        this.fish = this.add.sprite(game.config.width/1.25, 350,'DayFish').setOrigin(0.5, 0);
        

        //overlay
        this.overlay = this.add.sprite(0, 0, 'overlay').setOrigin(0, 0);
        this.overlay.setBlendMode(Phaser.BlendModes.ADD);
        this.overlay.scaleX= 1.5;
        this.overlay.alpha= .25;

        //alphas
        this.cText.alpha= 0;
        this.spaceText.alpha= 0;
        this.carefulText.alpha = 0;
        this.mashText.alpha = 0;
        this.fallText.alpha = 0;
        this.fish.alpha = 0;

        //hook variable
        this.hookX=0;

        //cast variables
        this.cast = false;
        this.castTimer = 6000;
        this.caughtSprite.alpha = 0;
        this.move = false;
        this.spacePressed= false;
        this.spaceDelay = false;

        this.badInput= false;
        this.won = false;
        this.lost= false;

        this.timer= 0;

        this.casted = false;

        // Daytime Music
        this.dayMusic = this.sound.add('bgm_DriftWood');
        this.dayActionbgm = this.sound.add('bgm_ReelingFromCurrent');
        this.dayActionbgm.loop = true;
        this.dayActionbgm.volume = 0;
        this.dayMusic.play();

        this.actionOn = false;

        // line Reeling Sfx
        this.sfx_reel1 = this.sound.add('sfx_lineReeling1');

        // line fail sfx
        this.sfx_reelFail = this.sound.add('sfx_lineCrack');
    }

    update() {
        //animations
        this.overlay.anims.play('overlay', 1, true);
        this.water.anims.play('water', 1, true);

        this.timer += .005;
        this.boat.y= 4* Math.sin(this.timer) +278;

        //temp
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("Day to Cloud");
            this.scene.start('cloudScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('twoScene');
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

        if(this.spacePressed && !this.spaceDelay){
            this.time.addEvent({delay: 1500, callback: () => {
                this.mashText.alpha += .005;
            }, callbackScope: this, loop: false});
            this.time.addEvent({delay: 6500, callback: () => {
                this.spaceDelay = true;
            }, callbackScope: this, loop: false});
        }
        else{
            this.mashText.alpha -= .005;
        }

        if(this.badInput){
            this.carefulText.alpha += .005;
            this.time.addEvent({delay: 1500, callback: () => {
                if(this.badInput){
                    this.fallText.alpha += .005;
                }
            }, callbackScope: this, loop: false});
            this.time.addEvent({delay: 5000, callback: () => {
                this.badInput= false;
            }, callbackScope: this, loop: false});
        }
        else if(this.carefulText.alpha >0){
            this.carefulText.alpha -= .005;
            this.fallText.alpha -= .005;
        }

        //cast mechanic
        if (this.cast && !this.move && !this.won && !this.lost) {
            this.castTimer -= 25
            console.log("timer: " + this.castTimer);
            if(this.castTimer <= 0){
                this.caughtSprite.alpha = 1;
                //run function that says "CAUGHT!" or something on screen
                if(Phaser.Input.Keyboard.JustDown(keyC)){
                    this.caughtSprite.alpha = 0;
                    this.move= true;
                    console.log("start reeling");
                    this.player.anims.play('player_cast', false);
                    this.player.anims.play('player_reel', true);
                }
                else if (this.castTimer == -6000 && !this.move && !this.won) {
                    //play death
                    this.scene.start('overScene');
                    this.dayActionbgm.stop();
                }
            }
        }

        if (!this.cast&& !this.move && !this.won && !this.lost) {
            this.player.anims.play('player_idle', true);
        }

        //initial cast
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            if (!this.actionOn){
                this.actionOn = true;
                this.player.anims.play('player_idle', false);
                this.player.anims.play('player_cast', true);
                this.cText.alpha = 0;
                this.cast = true;
                this.sound.play('sfx_lineCast');
                this.tweens.add({
                    targets: this.dayMusic,
                    volume: 0,
                    duration: 2500
                });
                this.dayActionbgm.play();
                this.tweens.add({
                    targets: this.dayActionbgm,
                    volume: 1,
                    duration: 3000
                });
            }
        }

        
        //UI movement
        if (this.move) { 
            this.hookX+=.01; //controls hook speed
            this.hook.x = (252* (Math.sin(this.hookX)) +320); //controls hook placement
        }

        //input checks
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.move && !this.lost) {
            //correct input
            this.spacePressed= true;
            
            if(this.hook.x <= this.barGreen.x + .5* this.barGreen.width && this.hook.x >= this.barGreen.x - .5* this.barGreen.width){
                this.player.x -= 15;
                this.player.anims.play('player_reel', true);
                this.sfx_reel1.play();
            }
            //incorrect input
            else{
                this.badInput= true;
                this.player.anims.play('player_miss', true);
                this.player.x += 40;
                this.sfx_reelFail.play();
            }
        }   

        //player moves towards the edge of the boat
        if (this.move && !this.lost) {
            this.player.x += .075;

            //impliment random pulling to add sense of danger later

        }

        //conditionals for winning and losing
        if(this.player.x + .5*this.player.width + 15 > this.boat.x + .5*this.boat.width){
            this.cast = false;
            this.lost= true;
            //play death animation

            //stops music and goes to gameover scene, UPDATE delay to allow time for animation later
            this.time.addEvent({delay: 2000, callback: () => {
                this.dayActionbgm.stop();
                this.scene.start('overScene'); //lose
            }, callbackScope: this, loop: false});

        }

        if(this.player.x - .5*this.player.width - 15 < this.boat.x - .5*this.boat.width){
            this.fishCaught(this.fish);
        }

        if (Phaser.Input.Keyboard.JustDown(keyN) && this.won) {
            this.scene.start('cloudScene'); //win
            this.dayActionbgm.stop(); // replace with song ending later gio chan
        }
    }

    fishCaught(fish) {
        this.player.x = 280;
        this.fish.alpha = 1;
        this.won = true;
        this.move = false;
        this.player.anims.play('player_catch', true);
        //this.catch.anim.play();
        //math thing for fish sprite movement???????
        //play present fish anim
        //this.present.anim.play();

        //get rid of later
        this.time.addEvent({delay: 2000, callback: () => {
            this.dayActionbgm.stop();
            this.scene.start('cloudScene'); //lose
        }, callbackScope: this, loop: false});

      }
}
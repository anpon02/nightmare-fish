class Cloud extends Phaser.Scene {
    constructor() {
      super("cloudScene");
    }

    preload() {
        this.load.image('fog', './Assets/Fog/fog.png');
        this.load.image('lantern', './Assets/Fog/lantern.png');
        this.load.spritesheet('lanternglow', './Assets/Fog/lanternglow.png', {frameWidth: 200, frameHeight: 200, startFrame: 0, endFrame: 2});
        this.load.image('hook', './Assets/hook.png');
        this.load.image('lanternUI', './Assets/Fog/lanternUI.png');
        this.load.image('caught', './Assets/caughtMessage.png');
        this.load.image('barGreen', './Assets/bar_green.png');
        this.load.image('greenHoriz', './Assets/Fog/lanternGreen.png');
        this.load.image('barRed', './Assets/bar_red.png');
        this.load.image('redHoriz', './Assets/Fog/lanternBar.png');
        this.load.spritesheet('water', './Assets/water.png', {frameWidth: 640, frameHeight: 120, startFrame: 0, endFrame: 11});
        this.load.image('boat', './Assets/boat.png');
        this.load.image('player', './Assets/player.png');
        this.load.image('trees', './Assets/Trees.png');
        this.load.image('bg', './Assets/background.png');
        this.load.image('FogFish', './Assets/Fish/FogFish.png');
        this.load.spritesheet('overlay', './Assets/overlay.png', {frameWidth: 480, frameHeight: 672, startFrame: 0, endFrame: 5});
    }

    create() {
        goback = 'cloudScene';
        this.add.text(20, 20, "CLOUD SCENE!");

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

        this.anims.create({
            key: 'overlay',
            frames: this.anims.generateFrameNumbers('overlay', {start: 0, end: 5, first: 0}), frameRate: 6
        });

        this.anims.create({
            key: 'lanternglow',
            frames: this.anims.generateFrameNumbers('lanternglow', {start: 0, end: 2, first: 0}), frameRate: 2
        });

        this.anims.create({
            key: 'water',
            frames: this.anims.generateFrameNumbers('water', {start: 0, end: 11, first: 0}), frameRate: 3
        });

        //define key (use keyRight to switch scenes for now)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //speed for fog movement
        this.speed = 2;

        //place spritesheets
        this.background = this.add.tileSprite(0, 0, gamewidth, gameheight, 'bg').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 0, gamewidth, gameheight, 'trees').setOrigin(0, 0);
        this.lanternglow = this.add.sprite(130, game.config.height/2,'lanternglow').setOrigin(0.5, 0.5);
        this.lantern = this.add.sprite(130,game.config.height/2 -5,'lantern').setOrigin(0.5, 0.5);
        this.player = this.add.sprite(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,'playerAtlas', 'player_idle').setOrigin(0.5, 0);
        this.boat = this.add.sprite(game.config.width/2, game.config.height/1.5 - borderUISize - borderPadding,'boat').setOrigin(0.5, 0);
        this.water = this.add.sprite(game.config.width/2, game.config.height/1.15 - borderUISize - borderPadding,'water').setOrigin(0.5, 0);

        this.barRed = this.add.sprite(game.config.width/2, game.config.height/7 - borderUISize - borderPadding,'barRed').setOrigin(0.5, 0);
        this.redHoriz = this.add.sprite(game.config.width/17, game.config.height/2,'redHoriz').setOrigin(0.5, 0.5);
        this.barGreen = this.add.sprite(game.config.width/2, game.config.height/7 - borderUISize - borderPadding,'barGreen').setOrigin(0.5, 0);
        this.greenHoriz = this.add.sprite(game.config.width/17, game.config.height/2,'greenHoriz').setOrigin(0.5, 0.5);

        this.caughtSprite = this.add.sprite(game.config.width/2, game.config.height/4 - borderUISize - borderPadding,'caught').setOrigin(0.5, 0);
        this.hook = this.add.sprite(game.config.width/2, game.config.height/9 - borderUISize - borderPadding,'hook').setOrigin(0.5, 0);
        this.lanternUI = this.add.sprite(game.config.width/17, game.config.height/2,'lanternUI').setOrigin(0.5, 0.5);
        
        this.fish = this.add.sprite(700, 600,'FogFish').setOrigin(0.5, 0.5);
        
        this.fog = this.add.tileSprite(0, 0, gamewidth, gameheight, 'fog').setOrigin(0, 0);



        //overlay
        this.overlay = this.add.sprite(0, 0, 'overlay').setOrigin(0, 0);
        this.overlay.setBlendMode(Phaser.BlendModes.ADD);
        this.overlay.scaleX= 1.5;
        this.overlay.alpha= .25;
        this.fog.alpha = 0.25;

        this.lanternglow.setBlendMode(Phaser.BlendModes.ADD);
        this.lanternglow.alpha = 1- this.fog.alpha;

        //hook variable
        this.hookX=0;
        this.lanternY = 0;
        this.lanternglowY = 0;

        //cast variables
        this.cast = false;
        this.castTimer = 6000;
        this.caughtSprite.alpha = 1;
        this.move = false;

        this.timer=0;
        this.fishtimer= 430;

        this.actionOn = false;
        this.won = false;
        this.lost = false;

        let backgroundConfig = {
            loop: true,
            volume: 1,
          }

        this.dayMusic = this.sound.add('bgm_DriftWood', backgroundConfig);
        this.fogIntro = this.sound.add('bgm_RFFIntro');
        this.fogIntro.volume = 0;

        this.fogLoop = this.sound.add('bgm_RFFLoop');
                this.fogLoop.loop = true;

        // line Reeling Sfx
        this.sfx_reel1 = this.sound.add('sfx_lineReeling1');

        // line fail sfx
        this.sfx_reelFail = this.sound.add('sfx_lineCrack');

        //cicada sfx
        this.cicada1 = this.sound.add('sfx_cicada1');
        this.cicada1.volume = 0.05;
        this.cicada2 = this.sound.add('sfx_cicada2');
        this.cicada2.volume = 0.05;

        // random cicada audio events
        this.randCicadaSFX = this.time.addEvent({delay: 7000, callback: () => { this.randNum= Math.floor(Math.random()*3);
            if(this.randNum == 0){
                this.cicada1.play();
            }
            if(this.randNum == 1 ){
                this.cicada2.play();
            }
            if(this.randNum == 2){
                console.log('nothin');
            }
            console.log("CICADAPLAY:" + this.randNum);
          }, callbackScope: this, loop: true});
    }

    update() {
        //temp
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("Cloud to Rain");
            this.scene.start('rainScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('cloudScene');
        }

        this.fog.tilePositionX -= this.speed/4;

        
        //animations
        this.overlay.anims.play('overlay', 1, true);
        this.water.anims.play('water', 1, true);
        this.lanternglow.anims.play('lanternglow', 1, true);

        //console.log(this.lantern.y);
        this.timer += .005;
        this.boat.y= 4* Math.sin(this.timer) +278;
        this.lantern.y= 4* Math.sin(this.timer) +240;
        this.lanternglow.y= 4* Math.sin(this.timer) +240;
        this.boat.y = 4* Math.sin(this.timer) +278;

        if(this.won == true){
            if(this.fishtimer >= 135){
                this.fishtimer -= 3;
            }
            this.fish.x= this.fishtimer;
            this.fish.y= (1/100) * Math.pow(this.fishtimer -220 , 2) +100;
        }

        //cast mechanic
        if (this.cast && !this.move  && !this.won && !this.lost) {
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
                    this.game.sound.stopAll();
                    //this.fogActionbgm.play();
                }
                else if (this.castTimer == -6000 && !this.move) {
                    //play death
                    this.scene.start('overScene');
                    this.game.sound.stopAll();
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
            this.cast = true;
            //music stuff here
        }
    }
        
        //UI movement and fog increase
        if (this.move) { 
            this.hookX+=.01; //controls hook speed
            this.lanternY += .01;
            this.lanternglowY += .01;
            this.hook.x = (252* (Math.sin(this.hookX)) +320); //controls hook placement
            this.lanternUI.y = (140* (Math.sin(2* this.lanternY)) +240);
            this.fog.alpha += .001;
            this.lanternglow.alpha = 1- this.fog.alpha;
        }
        
        //input checks for hook
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

        //input checks lantern
        if (Phaser.Input.Keyboard.JustDown(keySHIFT) && this.move) {
            //correct input
            if(this.lanternUI.y <= this.greenHoriz.y + .5* this.greenHoriz.height && this.lanternUI.y >= this.greenHoriz.y - .5* this.greenHoriz.height ){
                this.fog.alpha -= .25;  
            }
            //incorrect input
            else{
                this.fog.alpha += .10;  
            }
        }

        //player moves towards the edge of the boat
        if (this.move && !this.lost) {
            this.player.x += .075;
        }

        //conditionals for winning and losing
        if(this.player.x + .5*this.player.width + 15 > this.boat.x + .5*this.boat.width){
            this.cast = false;
            this.lost= true;
            //play death animation

            //stops music and goes to gameover scene, UPDATE delay to allow time for animation later
            this.time.addEvent({delay: 2000, callback: () => {
                this.scene.start('overScene'); //lose
            }, callbackScope: this, loop: false});

        }

        if(this.player.x - .5*this.player.width -25 < this.boat.x - .5*this.boat.width){
            this.fishCaught(this.fish); //summon the fish
            this.player.x= (this.boat.x - .5*this.boat.width) + .5*this.player.width +25; //set player position
        }

        if (Phaser.Input.Keyboard.JustDown(keyN) && this.won) {
            this.scene.start('rainScene'); //win
            this.dayActionbgm.stop(); // replace with song ending later gio chan
        }
    }

    fishCaught(fish) {
        this.fish.alpha = 1;
        this.won = true;
        this.move = false;
        this.player.anims.play('player_catch', true);
    

        //get rid of later
        this.time.addEvent({delay: 4000, callback: () => {
            this.scene.start('rainScene'); //lose
        }, callbackScope: this, loop: false});

    }
}
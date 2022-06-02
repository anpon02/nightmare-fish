class Night extends Phaser.Scene {
    constructor() {
      super("nightScene");
    }


    preload() {
        this.load.image('fogRain', './Assets/Rain/fogRain.png');
        this.load.image('lantern', './Assets/Fog/lantern.png');
        this.load.spritesheet('lanternglow', './Assets/Fog/lanternglow.png', {frameWidth: 200, frameHeight: 200, startFrame: 0, endFrame: 2});
        this.load.image('hook', './Assets/hook.png');
        this.load.image('lanternUI', './Assets/Fog/lanternUI.png');
        this.load.image('bucket', './Assets/Rain/bucketUI.png');
        this.load.image('caught', './Assets/caughtMessage.png');
        this.load.image('barGreen', './Assets/bar_green.png');
        this.load.image('greenHoriz', './Assets/Fog/lanternGreen.png');
        this.load.image('barRed', './Assets/bar_red.png');
        this.load.image('redHoriz', './Assets/Fog/lanternBar.png');
        this.load.spritesheet('waterNight', './Assets/Night/waterNight.png', {frameWidth: 640, frameHeight: 120, startFrame: 0, endFrame: 11});
        this.load.image('boatNight', './Assets/Night/boatNight.png');
        this.load.image('player', './Assets/player.png');
        this.load.image('treesNight', './Assets/Night/treesNight.png');
        this.load.image('cloudsNight', './Assets/Night/cloudsNight.png');
        this.load.image('bgNight', './Assets/Night/backgroundNight.png');
        this.load.image('RainFish', './Assets/Fish/RainFish.png');
        this.load.spritesheet('overlay', './Assets/overlay.png', {frameWidth: 480, frameHeight: 672, startFrame: 0, endFrame: 5});
        this.load.image('overlayRain', './Assets/Rain/overlayRain.png');
        this.load.spritesheet('rainOverlay', './Assets/Rain/rainOverlay.png', {frameWidth: 200, frameHeight: 100, startFrame: 0, endFrame: 3});
    }

    create() {
        this.add.text(20, 20, "NIGHT SCENE");

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
                end: 4,
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

        //player pull in 
        this.anims.create({
            key: 'player_pull',
            frames: this.anims.generateFrameNames('playerAtlas', {
                prefix: 'player_catch_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 6,
            //repeat: -1,
            //yoyo: true,
        });

        //player catch
        this.anims.create({
            key: 'player_catch',
            frames: this.anims.generateFrameNames('playerAtlas', {
                prefix: 'player_catch_',
                start: 3,
                end: 5,
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
            key: 'rainOverlay',
            frames: this.anims.generateFrameNumbers('rainOverlay', {start: 0, end: 3, first: 0}), frameRate: 6
        });

        this.anims.create({
            key: 'lanternglow',
            frames: this.anims.generateFrameNumbers('lanternglow', {start: 0, end: 2, first: 0}), frameRate: 2
        });

        this.anims.create({
            key: 'waterNight',
            frames: this.anims.generateFrameNumbers('waterNight', {start: 0, end: 11, first: 0}), frameRate: 3
        });

        //define key (use keyRight to switch scenes for now)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //speed for fog movement
        this.speed = 2;

        //place spritesheets
        this.background = this.add.tileSprite(0, 0, gamewidth, gameheight, 'bgNight').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 0, gamewidth, gameheight, 'treesNight').setOrigin(0, 0);
        this.clouds = this.add.tileSprite(0, 0, gamewidth, gameheight, 'cloudsNight').setOrigin(0, 0);        
        this.lanternglow = this.add.sprite(130, game.config.height/2,'lanternglow').setOrigin(0.5, 0.5);
        this.lantern = this.add.sprite(130,game.config.height/2 -5,'lantern').setOrigin(0.5, 0.5);
        this.player = this.add.sprite(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,'playerAtlas', 'player_idle').setOrigin(0.5, 0);
        this.boat = this.add.sprite(game.config.width/2, game.config.height/1.5 - borderUISize - borderPadding,'boatNight').setOrigin(0.5, 0);
        this.water = this.add.sprite(game.config.width/2, game.config.height/1.15 - borderUISize - borderPadding,'waterNight').setOrigin(0.5, 0);
        this.playerDeath = this.add.sprite(game.config.width/2 +245, game.config.height/2- 65,'playerDeath').setOrigin(0.5, 0);

        this.enterText = this.add.sprite(game.config.width/2, game.config.height/2 - 160, 'enterText').setOrigin(0.5, 0);
        this.rainText = this.add.sprite(game.config.width/2, game.config.height - 110, 'rainText').setOrigin(0.5, 0);
        
        this.barRed = this.add.sprite(game.config.width/2, game.config.height/7 - borderUISize - borderPadding,'barRed').setOrigin(0.5, 0);
        this.redHoriz = this.add.sprite(game.config.width/17, game.config.height/2,'redHoriz').setOrigin(0.5, 0.5);
        this.redBucket = this.add.sprite(game.config.width- game.config.width/17, game.config.height/2,'redHoriz').setOrigin(0.5, 0.5);
        this.barGreen = this.add.sprite(game.config.width/2, game.config.height/7 - borderUISize - borderPadding,'barGreen').setOrigin(0.5, 0);
        this.greenHoriz = this.add.sprite(game.config.width/17, game.config.height/2,'greenHoriz').setOrigin(0.5, 0.5);
        this.greenBucket = this.add.sprite(game.config.width- game.config.width/17, game.config.height/2,'greenHoriz').setOrigin(0.5, 0.5);

        this.caughtSprite = this.add.sprite(game.config.width/2, game.config.height/4 - borderUISize - borderPadding,'caught').setOrigin(0.5, 0);
        this.hook = this.add.sprite(game.config.width/2, game.config.height/9 - borderUISize - borderPadding,'hook').setOrigin(0.5, 0);
        this.lanternUI = this.add.sprite(game.config.width/17, game.config.height/2,'lanternUI').setOrigin(0.5, 0.5);
        this.bucket = this.add.sprite(game.config.width- game.config.width/17, game.config.height/2,'bucket').setOrigin(0.5, 0.5);

        this.fish = this.add.sprite(700, 600,'RainFish').setOrigin(0.5, 0.5);
        
        this.fog = this.add.tileSprite(0, 0, gamewidth, gameheight, 'fogRain').setOrigin(0, 0);



        //overlay
        this.overlay = this.add.sprite(0, 0, 'overlay').setOrigin(0, 0);
        this.overlay.setBlendMode(Phaser.BlendModes.ADD);
        this.overlay.scaleX= 1.5;
        this.overlay.alpha= .25;
        this.fog.alpha = 0.25;
        this.rainOverlay = this.add.sprite(0, 0, 'rainOverlay').setOrigin(0, 0);
        this.rainOverlay.setBlendMode(Phaser.BlendModes.ADD);
        this.rainOverlay.scaleX= 4.8;
        this.rainOverlay.scaleY= 4.8;
        this.rainOverlay.alpha= .25;

        this.lanternglow.setBlendMode(Phaser.BlendModes.ADD);
        this.lanternglow.alpha = 1- this.fog.alpha;

        this.overlayRain = this.add.sprite(0, 0, 'overlayRain').setOrigin(0, 0);
        this.overlayRain.setBlendMode(Phaser.BlendModes.OVERLAY);
        this.overlayRain.alpha= .35;

        //blackscreen
        this.blackScreen= this.add.sprite(0,0, 'blackScreen').setOrigin(0,0);
        this.blackScreen.alpha= 1;

        //hook variable
        this.hookX=0;
        this.lanternY = 0;
        this.lanternglowY = 0;

        //cast variables
        this.cast = false;
        this.castTimer = 6000;
        this.caughtSprite.alpha = 0;
        this.move = false;
        this.enterText.alpha=0;
        this.rainText.alpha=0;
        this.movespeed= .075;
        this.playerDeath.alpha=0;

        this.timer=0;
        this.fishtimer= 430;

        this.actionOn = false;
        this.won = false;
        this.lost = false;
        this.fade= true;

        this.lostSound = false;

        let backgroundConfig = {
            loop: true,
            volume: 1,
          }

        this.dayMusic = this.sound.add('bgm_DriftWood', backgroundConfig);
        this.dayMusic.play();
        this.rainIntro = this.sound.add('bgm_RFRIntro');
        this.rainIntro.volume = 0;

        this.rainLoop = this.sound.add('bgm_RFRLoop');
                this.rainLoop.loop = true;

        // line Reeling Sfx
        this.sfx_reel1 = this.sound.add('sfx_lineReeling1');

        // line fail sfx
        this.sfx_reelFail = this.sound.add('sfx_lineCrack');

        // overboard sfx
        this.sfx_lose = this.sound.add('sfx_loseSplash');
        this.sfx_lose.volume = 0.2;

        // successful lantern lighting sfx
        this.sfx_lantern = this.sound.add('sfx_lantern');
        this.sfx_lantern.volume = 0.2;

        // successful bucket sfx
        this.sfx_bucket = this.sound.add('sfx_bucket');
        this.sfx_bucket.volume = 0.5;

        //cicada sfx
        this.cicada1 = this.sound.add('sfx_cicada1');
        this.cicada1.volume = 0.05;
        this.cicada2 = this.sound.add('sfx_cicada2');
        this.cicada2.volume = 0.05;

        // Rain background noise
        this.rainBG = this.sound.add('bgsfx_rain');
        this.rainBG.loop = true;
        this.rainBG.volume = 0.3;
        this.rainBG.play();

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

        //psychic attacks
        this.time.addEvent({delay: 5000, callback: () => {
            //AHHHHHHHHHHHHH
            this.barGreen.x = Phaser.Math.Between(63, 517);
            this.greenHoriz.y = Phaser.Math.Between(88.5, 391.5);
            this.greenBucket.y = Phaser.Math.Between(88.5, 391.5);
        }, callbackScope: this, loop: true});
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("Night to CutSix");
            this.scene.start('sixScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('fiveScene');
        }
        this.fog.tilePositionX -= this.speed/4;
        this.clouds.tilePositionX -= this.speed/32;
        if(this.fade){
            this.blackScreen.alpha -= .005;
        }
        else{
            this.blackScreen.alpha += .005;
        }

        //animations
        this.overlay.anims.play('overlay', 1, true);
        this.rainOverlay.anims.play('rainOverlay', 1, true);
        this.water.anims.play('waterNight', 1, true);
        this.lanternglow.anims.play('lanternglow', 1, true);
        if(this.pulled){
            this.player.anims.play('player_catch', true);
        }

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

        //text manager
        /*if(!this.cast && !this.win && !this.lose){
            this.rainText.alpha += .005;
        }*/

        if(this.move && !this.enterPressed){
            this.enterText.alpha += .005;
        }
        else{
            this.enterText.alpha -= .005;
        }


        //cast mechanic
        if (this.cast && !this.move  && !this.won && !this.lost) {
            this.castTimer -= 25;
            console.log("timer: " + this.castTimer);
            if(this.castTimer <= 0){
                //caught message
                this.caughtSprite.alpha = 1;
                this.caughtSprite.scaleX= .1 * Math.sin(10* this.timer) + .90;
                this.caughtSprite.scaleY= .1 * Math.sin(10* this.timer) + .90;

                if(Phaser.Input.Keyboard.JustDown(keyC)){
                    this.caughtSprite.alpha = 0;
                    this.move= true;
                    console.log("start reeling");
                    this.player.anims.play('player_cast', false);
                    this.player.anims.play('player_reel', true);
                    //this.fogActionbgm.play();
                }
                else if (this.castTimer == -6000 && !this.move) {
                    //losing from not biting
                    this.cast = false;
                    this.lost= true;
                    this.player.alpha=0;
                    this.playerDeath.alpha=1;
                    this.playerDeath.x= game.config.width/2;
                    this.playerDeath.y= game.config.height/2- 50;
                    this.playerDeath.anims.play('playerDeath', 1, true);
                    if (!this.lostSound){
                        this.time.addEvent({delay: 1000, callback: () => {
                            this.sfx_lose.play();
                        }, callbackScope: this, loop: false});    
                        
                        this.lostSound = true;
                    }

                    //stops music and goes to gameover scene, UPDATE delay to allow time for animation later
                    this.time.addEvent({delay: 2600, callback: () => {
                        this.scene.start('overScene'); //lose
                    }, callbackScope: this, loop: false});
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
            //this.caughtSprite.alpha = 0;
            this.player.anims.play('player_idle', false);
            this.player.anims.play('player_cast', true);
            this.rainText.alpha = 0;
            this.cast = true;
            //music stuff here
            this.sound.play('sfx_lineCast');
            this.tweens.add({
                targets: this.dayMusic,
                volume: 0,
                duration: 2500
            });
            this.rainIntro.play();
            this.tweens.add({
                targets: this.rainIntro,
                volume: 1,
                duration: 3000
            });
            this.loopTimer = this.time.delayedCall(5890, () => {this.rainLoop.play();}, null, this);
        }
    }
        
        //UI movement and fog increase
        if (this.move) { 
            this.hookX+=.01; //controls hook speed
            this.lanternY += .01;
            this.lanternglowY += .01;
            this.hook.x = (252* (Math.sin(this.hookX)) +320); //controls hook placement
            this.lanternUI.y = (140* (Math.sin(2* this.lanternY)) +240);
            this.bucket.y = (140* (Math.sin(1.5* this.lanternY)) +240);
            
            //fog
            this.fog.alpha += .001;
            this.lanternglow.alpha = 1- this.fog.alpha;

            //increasing movespeed over time
            if(this.movespeed < .15){
                this.movespeed += .0001;
            }
        }
        
        //input checks for hook
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.move && !this.lost) {
            //correct input            
            if(this.hook.x <= this.barGreen.x + .5* this.barGreen.width && this.hook.x >= this.barGreen.x - .5* this.barGreen.width){
                this.player.x -= 12;
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
                this.sfx_lantern.play(); 
            }
            //incorrect input
            else{
                this.fog.alpha += .10;  
            }
        }

        //input checks bucket
        if (Phaser.Input.Keyboard.JustDown(keyENTER) && this.move) {
            this.enterPressed= true;

            //correct input
            if(this.bucket.y <= this.greenBucket.y + .5* this.greenBucket.height && this.bucket.y >= this.greenBucket.y - .5* this.greenBucket.height ){
                if(this.movespeed > .075){
                    this.movespeed -= .025;
                }
                this.sfx_bucket.play();
            }
            //incorrect input
            else{
                if(this.movespeed < .15){
                    this.movespeed += .005;
                }
            }
        }

        //player moves towards the edge of the boat
        if (this.move && !this.lost) {
            this.player.x += this.movespeed;
        }

        //conditionals for winning and losing
        if(this.player.x + .5*this.player.width + 15 > this.boat.x + .5*this.boat.width){
            this.cast = false;
            this.lost= true;
            this.player.alpha=0;
            this.playerDeath.alpha=1;
            this.playerDeath.anims.play('playerDeath', 1, true);
            if (!this.lostSound){
                this.time.addEvent({delay: 1000, callback: () => {
                    this.sfx_lose.play();
                }, callbackScope: this, loop: false});    
                
                this.lostSound = true;
            }

            //stops music and goes to gameover scene, UPDATE delay to allow time for animation later
            this.time.addEvent({delay: 2600, callback: () => {
                this.scene.start('overScene'); //lose
            }, callbackScope: this, loop: false});

        }

        if(this.player.x - .5*this.player.width -25 < this.boat.x - .5*this.boat.width){
            this.fishCaught(this.fish); //summon the fish
            this.player.x= (this.boat.x - .5*this.boat.width) + .5*this.player.width +25; //set player position
            this.time.addEvent({delay: 2500, callback: () => {
                this.fade= false;
            }, callbackScope: this, loop: false});
        }

        if (Phaser.Input.Keyboard.JustDown(keyN) && this.won) {
            this.scene.start('sixScene'); //win
            this.dayActionbgm.stop(); // replace with song ending later gio chan
        }
    }

    fishCaught(fish) {
        this.fish.alpha = 1;
        this.won = true;
        this.move = false;
        if(!this.pulled){
            this.player.anims.play('player_pull', true);
        }
        this.time.addEvent({delay: 500, callback: () => {
            this.pulled= true;
        }, callbackScope: this, loop: false});    

        //get rid of later
        this.time.addEvent({delay: 4000, callback: () => {
            this.scene.start('sixScene'); //lose
        }, callbackScope: this, loop: false});

    }
}
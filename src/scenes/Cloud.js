class Cloud extends Phaser.Scene {
    constructor() {
      super("cloudScene");
    }

    preload() {
        this.load.image('shiftText', './Assets/Fog/pressShift.png');
        this.load.image('fogRolling', './Assets/Fog/fogRolling.png');
        this.load.image('fog', './Assets/Fog/fog.png');
        this.load.image('lantern', './Assets/Fog/lantern.png');
        this.load.spritesheet('lanternglow', './Assets/Fog/lanternglow.png', {frameWidth: 200, frameHeight: 200, startFrame: 0, endFrame: 2});
        this.load.image('lanternUI', './Assets/Fog/lanternUI.png');
        this.load.image('caught', './Assets/caughtMessage.png');
        this.load.image('greenHoriz', './Assets/Fog/lanternGreen.png');
        this.load.image('redHoriz', './Assets/Fog/lanternBar.png');
        this.load.spritesheet('waterFog', './Assets/Fog/waterFog.png', {frameWidth: 640, frameHeight: 120, startFrame: 0, endFrame: 11});
        this.load.image('treesFog', './Assets/Fog/treesFog.png');
        this.load.image('cloudsFog', './Assets/Fog/cloudsFog.png');
        this.load.image('bgFog', './Assets/Fog/backgroundFog.png');
        this.load.image('FogFish', './Assets/Fish/FogFish.png');
    }

    create() {
        goback = 'cloudScene';
        this.add.text(20, 20, "CLOUD SCENE!");
        

        this.anims.create({
            key: 'lanternglow',
            frames: this.anims.generateFrameNumbers('lanternglow', {start: 0, end: 2, first: 0}), frameRate: 2
        });

        this.anims.create({
            key: 'waterFog',
            frames: this.anims.generateFrameNumbers('waterFog', {start: 0, end: 11, first: 0}), frameRate: 3
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
        this.background = this.add.tileSprite(0, 0, gamewidth, gameheight, 'bgFog').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 0, gamewidth, gameheight, 'treesFog').setOrigin(0, 0);
        this.clouds = this.add.tileSprite(0, 0, gamewidth, gameheight, 'cloudsFog').setOrigin(0, 0);        
        this.lanternglow = this.add.sprite(130, game.config.height/2,'lanternglow').setOrigin(0.5, 0.5);
        this.lantern = this.add.sprite(130,game.config.height/2 -5,'lantern').setOrigin(0.5, 0.5);
        this.player = this.add.sprite(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,'playerAtlas', 'player_idle').setOrigin(0.5, 0);
        this.boat = this.add.sprite(game.config.width/2, game.config.height/1.5 - borderUISize - borderPadding,'boat').setOrigin(0.5, 0);
        this.water = this.add.sprite(game.config.width/2, game.config.height/1.15 - borderUISize - borderPadding,'waterFog').setOrigin(0.5, 0);
        this.playerDeath = this.add.sprite(game.config.width/2 +245, game.config.height/2- 65,'playerDeath').setOrigin(0.5, 0);

        this.shiftText = this.add.sprite(game.config.width/2, game.config.height/2 - 160, 'shiftText').setOrigin(0.5, 0);
        this.fogText = this.add.sprite(game.config.width/2, game.config.height - 100, 'fogRolling').setOrigin(0.5, 0);
        
        this.barRed = this.add.sprite(game.config.width/2, game.config.height/7 - borderUISize - borderPadding,'barRed').setOrigin(0.5, 0);
        this.redHoriz = this.add.sprite(game.config.width/17, game.config.height/2,'redHoriz').setOrigin(0.5, 0.5);
        this.barGreen = this.add.sprite(game.config.width/2, game.config.height/7 - borderUISize - borderPadding,'barGreen').setOrigin(0.5, 0);
        this.greenHoriz = this.add.sprite(game.config.width/17, game.config.height/2,'greenHoriz').setOrigin(0.5, 0.5);

        this.caughtSprite = this.add.sprite(game.config.width/2, game.config.height/4 - borderUISize - borderPadding,'caught').setOrigin(0.5, 0);
        this.hook = this.add.sprite(game.config.width/2, game.config.height/9 - borderUISize - borderPadding,'hook').setOrigin(0.5, 0);
        this.lanternUI = this.add.sprite(game.config.width/17, game.config.height/2,'lanternUI').setOrigin(0.5, 0.5);
        
        this.fish = this.add.sprite(700, 600,'FogFish').setOrigin(0.5, 0.5);

        this.fish.scaleX= .75;
        this.fish.scaleY= .75;
        
        this.fog = this.add.tileSprite(0, 0, gamewidth, gameheight, 'fog').setOrigin(0, 0);



        //overlay
        this.overlay = this.add.sprite(0, 0, 'overlay').setOrigin(0, 0);
        this.overlay.setBlendMode(Phaser.BlendModes.ADD);
        this.overlay.scaleX= 1.5;
        this.overlay.alpha= .25;
        this.fog.alpha = 0.25;

        this.lanternglow.setBlendMode(Phaser.BlendModes.ADD);
        this.lanternglow.alpha = 1- this.fog.alpha;

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
        this.shiftText.alpha=0;
        this.fogText.alpha=0;
        this.playerDeath.alpha=0;

        this.timer=0;
        this.fishtimer= 430;

        this.actionOn = false;
        this.won = false;
        this.lost = false;
        this.fade= true;

        let backgroundConfig = {
            loop: true,
            volume: 1,
          }

        this.dayMusic = this.sound.add('bgm_DriftWood', backgroundConfig);
        this.dayMusic.play();
        this.fogIntro = this.sound.add('bgm_RFFIntro');
        this.fogIntro.volume = 0;

        this.fogLoop = this.sound.add('bgm_RFFLoop');
                this.fogLoop.loop = true;

                // Press C again sfx
        this.sfx_pressC = this.sound.add('sfx_pressC');

        // line Reeling Sfx
        this.sfx_reel1 = this.sound.add('sfx_lineReeling1');

        // line fail sfx
        this.sfx_reelFail = this.sound.add('sfx_lineCrack');

        // successful lantern lighting sfx
        this.sfx_lantern = this.sound.add('sfx_lantern');
        this.sfx_lantern.volume = 0.2;

                // overboard sfx
        this.sfx_lose = this.sound.add('sfx_loseSplash');
        this.sfx_lose.volume = 0.2;

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
            this.scene.start('fourScene');
            this.game.sound.stopAll();
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('cloudScene');
            this.game.sound.stopAll();
        }

        this.fog.tilePositionX -= this.speed/4;
        this.clouds.tilePositionX -= this.speed/32;
        if(this.pulled){
            this.player.anims.play('player_catch', true);
        }

        if(this.fade){
            this.blackScreen.alpha -= .005;
        }
        else{
            this.blackScreen.alpha += .005;
        }
        
        //animations
        this.overlay.anims.play('overlay', 1, true);
        this.water.anims.play('waterFog', 1, true);
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

        //text manager
        if(!this.cast && !this.win && !this.lost){
            this.fogText.alpha += .005;
        }

        if(this.move && !this.shiftPressed){
            this.shiftText.alpha += .005;
        }
        else{
            this.shiftText.alpha -= .005;
        }


        //cast mechanic
        if (this.cast && !this.move  && !this.won && !this.lost) {
            this.castTimer -= 25;
            console.log("timer: " + this.castTimer);
            if(this.castTimer <= 0){
                if(this.castTimer == 0){
                    this.sfx_pressC.play();
                }
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
            this.fogText.alpha = 0;
            this.cast = true;
            //music stuff here
            this.sound.play('sfx_lineCast');
            this.tweens.add({
                targets: this.dayMusic,
                volume: 0,
                duration: 2500
            });
            this.fogIntro.play();
            this.tweens.add({
                targets: this.fogIntro,
                volume: 1,
                duration: 3000
            });
            this.loopTimer = this.time.delayedCall(5915, () => {this.fogLoop.play();}, null, this);
        }
    }
        
        //UI movement and fog increase
        if (this.move) { 
            this.hookX+=.01; //controls hook speed
            this.lanternY += .01;
            this.lanternglowY += .01;
            this.hook.x = (252* (Math.sin(this.hookX)) +320); //controls hook placement
            this.lanternUI.y = (140* (Math.sin(2* this.lanternY)) +240);
            this.fog.alpha += .0015;
            this.lanternglow.alpha = 1- this.fog.alpha;
        }
        
        //input checks for hook
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.move && !this.lost) {
            //correct input            
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
            this.shiftPressed= true;

            //correct input
            if(this.lanternUI.y <= this.greenHoriz.y + .5* this.greenHoriz.height && this.lanternUI.y >= this.greenHoriz.y - .5* this.greenHoriz.height ){
                this.fog.alpha -= .30;  
                this.sfx_lantern.play();
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
                this.fogLoop.stop();
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
            this.scene.start('fourScene'); //win
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
            this.scene.start('fourScene'); //win
        }, callbackScope: this, loop: false});

    }
}
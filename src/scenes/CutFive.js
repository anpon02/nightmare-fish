class CutFive extends Phaser.Scene {
    constructor() {
      super("fiveScene");
    }

    preload() {
        // load plugin
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
        this.load.bitmapFont('gothic', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/fonts/gothic.png',
         'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/fonts/gothic.xml');

    }

    create() {
        this.game.sound.stopAll();
        //remove later
        this.add.text(20, 20, "cut five, press space");

        //place images
        this.background = this.add.tileSprite(0, 0, gamewidth, gameheight-150, 'bgRain').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 0, gamewidth, gameheight-150, 'treesRain').setOrigin(0, 0);
        this.clouds = this.add.tileSprite(0, 0, gamewidth, gameheight-150, 'cloudsRain').setOrigin(0, 0);        
        this.lanternglow = this.add.sprite(130, game.config.height/2-150,'lanternglow').setOrigin(0.5, 0.5);
        this.lantern = this.add.sprite(130,game.config.height/2 -5-150,'lantern').setOrigin(0.5, 0.5);
        this.player = this.add.sprite(game.config.width/2, game.config.height/2 - borderUISize - borderPadding -150,'holdFish').setOrigin(0.5, 0);
        this.fish = this.add.sprite(game.config.width/2 + 100, game.config.height/2 - borderUISize - borderPadding-55,'RainFish').setOrigin(0.5, 0);
        this.boat = this.add.sprite(game.config.width/2, game.config.height/1.5 - borderUISize - borderPadding-150,'boat').setOrigin(0.5, 0);
        this.water = this.add.sprite(game.config.width/2, game.config.height/1.15 - borderUISize - borderPadding-150,'waterRain').setOrigin(0.5, 0);
        
        this.fish.angle= 90;
        this.fish.scaleX= .75;
        this.fish.scaleY= .75;

        this.fog = this.add.tileSprite(0, 0, gamewidth, gameheight, 'fogRain').setOrigin(0, 0);
        
        this.rainOverlay = this.add.sprite(0, 0, 'rainOverlay').setOrigin(0, 0);
        this.rainOverlay.setBlendMode(Phaser.BlendModes.ADD);
        this.rainOverlay.scaleX= 4.8;
        this.rainOverlay.scaleY= 4.8;
        this.rainOverlay.alpha= .25;
        this.overlayRain = this.add.sprite(0, 0, 'overlayRain').setOrigin(0, 0);
        this.overlayRain.setBlendMode(Phaser.BlendModes.OVERLAY);
        this.overlayRain.alpha= .35;

        this.textBox = this.add.sprite(0,280,'TextBox').setOrigin(0,0);
        
        //define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.text = ["Nightmarish Fish: ... I’m out?...", 

            "Nightmarish Fish: Finally... ",
            
            "Nightmarish Fish: ...", 
            
            "Nightmarish Fish: I was a diver commissioned to investigate the lake.", 
            
            "Nightmarish Fish: A boat took me out one night and I went to work, but...",
            
            "Nightmarish Fish: No matter how deep I swam, there never seemed to be a bottom.",
            
            "Nightmarish Fish: I can’t remember much, but… There was… Something down there.", 
            
            "Nightmarish Fish: It was changing me, turning me into one of those monsters.", 
            
            "Nightmarish Fish: I swam to the surface, but it caught up with me.",
            
            "Nightmarish Fish: That thing had me in its grasp, I felt my body changing-",
            
            "Nightmarish Fish: I reached above the water towards the sun-",
            
            "Nightmarish Fish: and for just a moment, in the light, I was myself again.",
            
            "Nightmarish Fish: ... It pulled me back under after that.",
            
            "Nightmarish Fish: ...",
            
            "Nightmarish Fish: Don’t try and save me now. It’s too late for me.",
            
            "Nightmarish Fish: But maybe not for the others...?"
            ];

        
        //initialize textbox
        this.t1 = this.rexUI.add.textBox({
            x: 30,
            y: 320,

            width: 200,
            height: 50,

            background: null,
            icon: null,
            iconMask: false,
            action: this.add.image(0, 0, 'nextPage').setTint(0x7B5E57).setVisible(false),
            actionMask: false,
            text: this.add.bitmapText(0, 0, 'gothic').setFontSize(30).setMaxWidth(600),

            space: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
        
                icon: 0,
                text: 0,
            },

            page: {
                pageBreak: '\f\n'
            },

            typing: { 
                wrap: false,
                speed: 333,    
            },

        }).setOrigin(0).layout();

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

        this.fade= false;
        this.timer= 0; 

        //textbox counter
        this.count = 0;
        this.time.addEvent({delay: 500, callback: () => {
            this.t1.start(this.text[this.count], 20);
        }, callbackScope: this, loop: false});

        this.dayMusic = this.sound.add('bgm_DriftWood');
        this.dayMusic.loop = true;
        this.dayMusic.play();
    }

    update() {
        //animations
        this.overlay.anims.play('overlay', 1, true);
        this.rainOverlay.anims.play('rainOverlay', 1, true);
        this.water.anims.play('waterRain', 1, true);
        this.lanternglow.anims.play('lanternglow', 1, true);
        this.player.anims.play('holdFish', 1, true);

        this.timer += .005;
        this.boat.y= 4* Math.sin(this.timer) +128;

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("five to night");
            this.scene.start('nightScene');
            this.game.sound.stopAll();
        }

        if (this.count >= this.text.length-1 && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.fade=true; 
            this.time.addEvent({delay: 4000, callback: () => {
                this.scene.start('nightScene');
                this.game.sound.stopAll();
            }, callbackScope: this, loop: false});
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            //this.spacePressed =true;
            this.count++;
            if(this.count< this.text.length){
                this.t1.start(this.text[this.count], 20);
            }
        }
        
        if(!this.fade){
            this.blackScreen.alpha -= .005;
        }
        else{
            this.blackScreen.alpha += .005;
        }

    }
}
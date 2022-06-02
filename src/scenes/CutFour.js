class CutFour extends Phaser.Scene {
    constructor() {
      super("fourScene");
    }

    preload() {
        // load plugin
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
        this.load.bitmapFont('gothic', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/fonts/gothic.png',
         'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/fonts/gothic.xml');

        this.load.image('playerCutFour', './Assets/CutSceneFour/playerCutFour.png');
    }

    create() {
        //remove later
        this.add.text(20, 20, "cut four, press space");
        //define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        //place images
        this.background = this.add.tileSprite(0, 0, gamewidth, gameheight -150, 'bgFog').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 0, gamewidth, gameheight -150, 'treesFog').setOrigin(0, 0);
        this.clouds = this.add.tileSprite(0, 0, gamewidth, gameheight -150, 'cloudsFog').setOrigin(0, 0);        
        this.lanternglow = this.add.sprite(130, game.config.height/2 -150,'lanternglow').setOrigin(0.5, 0.5);
        this.lantern = this.add.sprite(130,game.config.height/2 -5 -150,'lantern').setOrigin(0.5, 0.5);
        this.player = this.add.sprite(game.config.width/2, game.config.height/2 - borderUISize - borderPadding -150,'playerCutFour').setOrigin(0.5, 0);
        this.boat = this.add.sprite(game.config.width/2, game.config.height/1.5 - borderUISize - borderPadding -150,'boat').setOrigin(0.5, 0);
        this.water = this.add.sprite(game.config.width/2, game.config.height/1.15 - borderUISize - borderPadding -150,'waterFog').setOrigin(0.5, 0);

        this.fog = this.add.tileSprite(0, 0, gamewidth, gameheight, 'fog').setOrigin(0, 0);

        this.textBox = this.add.sprite(0,280,'TextBox').setOrigin(0,0);


        //textbox dialogue
        this.text = ["Ghostly Fish: ...",
            
            "Ghostly Fish: I was getting married today...",

            "Ghostly Fish: Or was it yesterday?",
            
            "Ghostly Fish: Married… to my sweet sailor boy. A wedding out on the water.",
            
            "Ghostly Fish: It was beautiful.",
            
            "Ghostly Fish: We had just said our vows when that storm blew in.",
            
            "Ghostly Fish: It was all so sudden, I hardly even remember how I came to fall over the side.",
            
            "Ghostly Fish: They threw a life preserver. I reached to grab it, but…",
            
            "Ghostly Fish: That thing...", 
            
            "Ghostly Fish: It had me by the ankle. I kicked and flailed but I couldn't break its slimy grasp-",
            
            "Ghostly Fish: It brought me deeper and deeper-",
            
            "Ghostly Fish: My skin turned to scales, I'd never felt more pain.",
            
            "Ghostly Fish: ...", 
            
            "Ghostly Fish: If you see my husband...",
            
            "Ghostly Fish: Tell him I love him, won't you?"
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
        this.water.anims.play('water', 1, true);
        this.lanternglow.anims.play('lanternglow', 1, true);

    
        this.timer += .005;
        this.boat.y= 4* Math.sin(this.timer) +128;

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("four to rain");
            this.scene.start('rainScene');
            this.game.sound.stopAll();
        }

        if (this.count >= this.text.length-1 && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.fade=true; 
            this.time.addEvent({delay: 4000, callback: () => {
                this.scene.start('rainScene');
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
class CutThree extends Phaser.Scene {
    constructor() {
      super("threeScene");
    }

    preload() {
        // load plugin
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
        this.load.bitmapFont('gothic', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/fonts/gothic.png',
         'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/fonts/gothic.xml');

         this.load.image('playerCutThree', './Assets/CutSceneThree/playerCutThree.png');
    }

    create() {
        //remove later
        this.add.text(20, 20, "cut three, press space");

        this.text = ["Little Fish: Where.. Am I?", 

            "Little Fish: Where was I?",
            
            "Little Fish: I was playing… by the water!",
            
            "Little Fish: Tommy and I were playing catch, I think.", 
            
            "Little Fish: But then he threw the ball too high... I couldn’t catch it...",
            
            "Little Fish: It landed in the lake. Mom said not to go in the lake, but...",
            
            "Little Fish: I swam out to get Tommy’s ball. It kept getting further away.",
            
            "Little Fish: So I kept swimming and it kept getting further away-",
            
            "Little Fish: and I kept swimming and it kept getting colder and it kept getting further away-",
            
            "Little Fish: and it kept getting darker and it kept getting colder-",
            
            "Little Fish: . . .",
            
            "Little Fish: Where... Am I?"
        ];

        //define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //place images
        this.background = this.add.tileSprite(0, 0, gamewidth, gameheight -150, 'bg').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 0, gamewidth, gameheight-150, 'trees').setOrigin(0, 0);
        this.player = this.add.sprite(game.config.width/2, game.config.height/2 - borderUISize - borderPadding-150,'playerCutThree').setOrigin(0.5, 0);
        this.boat = this.add.sprite(game.config.width/2, game.config.height/1.5 - borderUISize - borderPadding-150,'boat').setOrigin(0.5, 0);
        this.water = this.add.sprite(game.config.width/2, game.config.height/1.15 - borderUISize - borderPadding-150,'water').setOrigin(0.5, 0);

        this.textBox = this.add.sprite(0,280,'TextBox').setOrigin(0,0);

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
        this.overlay.scaleX= 3;
        this.overlay.scaleY= 1.5;
        this.overlay.alpha= .25;

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
    
        this.timer += .005;
        this.boat.y= 4* Math.sin(this.timer) +128;

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("three to cloud");
            this.scene.start('cloudScene');
            this.game.sound.stopAll();
        }

        if (this.count >= this.text.length-1 && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.fade=true; 
            this.time.addEvent({delay: 4000, callback: () => {
                this.scene.start('cloudScene');
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
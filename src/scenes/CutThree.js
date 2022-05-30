var text = ["hello", "welcome to cut three"];

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
    }

    create() {
        //remove later
        this.add.text(20, 20, "cut three, press space");
        //define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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

        //textbox counter
        this.count = 0;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("three to cloud");
            this.scene.start('cloudScene');
            this.game.sound.stopAll();
        }

        if (this.count >= text.length && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('cloudScene');
            this.game.sound.stopAll();
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            //this.spacePressed =true;
            this.t1.start(text[this.count], 20);
            this.count++;
        }

    }
}
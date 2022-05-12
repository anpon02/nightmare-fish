class CutOne extends Phaser.Scene {
    constructor() {
      super("cutoneScene");
    }

    preload(){
        this.load.image('background2', './Assets/CutSceneOne/background_openingscene.png');
        this.load.image('pole','./Assets/CutSceneOne/pole.png')
        this.load.spritesheet('overlay', './assets/overlay.png', {frameWidth: 480, frameHeight: 672, startFrame: 0, endFrame: 5});
        this.load.spritesheet('paperSheet', './Assets/CutSceneOne/paperSheet.png', {frameWidth: 1436, frameHeight: 887, startFrame: 0, endFrame: 3});
        this.load.spritesheet('paperWind', './Assets/CutSceneOne/paperWind.png', {frameWidth: 1434, frameHeight: 885, startFrame: 0, endFrame: 9});
        this.load.spritesheet('walk1', './Assets/CutSceneOne/walk.png', {frameWidth: 1434, frameHeight: 885, startFrame: 0, endFrame: 6});
        this.load.spritesheet('water1', './Assets/CutSceneOne/water.png', {frameWidth: 1434, frameHeight: 885, startFrame: 0, endFrame: 3});

    }

    create() {
        this.add.text(20, 20, "CUT SCENE");

        //camera
        this.cameras.main.setBounds(0, 0, 1438, 887);
        this.cameras.main.setZoom(1.0);
        this.cameras.main.setScroll(0, 0);

        //anims
        this.anims.create({
            key: 'overlay',
            frames: this.anims.generateFrameNumbers('overlay', {start: 0, end: 5, first: 0}), frameRate: 6
        });

        this.anims.create({
            key: 'paperSheet',
            frames: this.anims.generateFrameNumbers('paperSheet', {start: 0, end: 3, first: 0}), frameRate: 2
        });

        this.anims.create({
            key: 'paperWind',
            frames: this.anims.generateFrameNumbers('paperWind', {start: 0, end: 9, first: 0}), frameRate: .5
        });

        this.anims.create({
            key: 'walk1',
            frames: this.anims.generateFrameNumbers('walk1', {start: 0, end: 6, first: 0}), frameRate: .5
        });

        this.anims.create({
            key: 'water1',
            frames: this.anims.generateFrameNumbers('water1', {start: 0, end: 3, first: 0}), frameRate: 2
        });

        //define key (use keyRight to switch scenes for now)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //images
        this.background = this.add.sprite(0,0, 'background2').setOrigin(0, 0);
        this.walk1 = this.add.sprite(0, 0, 'walk1').setOrigin(0, 0);
        this.pole= this.add.sprite(0,0,'pole').setOrigin(0,0);
        this.paperSheet = this.add.sprite(0, 0, 'paperSheet').setOrigin(0, 0);
        this.paperWind = this.add.sprite(0, 0, 'paperWind').setOrigin(0, 0);
        this.water1= this.add.sprite(0,0, 'water1').setOrigin(0,0);

        //alphas
        this.paperWind.alpha=0;
        this.walk1.alpha=0;

        //overlay
        this.overlay = this.add.sprite(0, 0, 'overlay').setOrigin(0, 0);
        this.overlay.setBlendMode(Phaser.BlendModes.ADD);
        this.overlay.scaleX= 3;
        this.overlay.scaleY= 1.5;
        this.overlay.alpha= .25;

        
        this.firstpan = this.time.addEvent({delay: 10000, callback: () => {     
            this.walk1.alpha=1;
            this.walk1.anims.play('walk1', 1, true);
            
            this.time.addEvent({delay:4000, callback: () =>{
                this.paperSheet.alpha=0;
                this.paperWind.alpha=1;
                this.paperWind.anims.play('paperWind', 1, true);
                this.cameras.main.pan(
                    900,
                    0,
                    7000,
                    'Sine.easeOut'
                );

                this.time.addEvent({delay:7000, callback: () =>{
                    this.cameras.main.pan(
                        900,
                        610,
                        9000,
                        'Sine.easeOut'
                    );
                }, callbackScope: this, loop: false});

            }, callbackScope: this, loop: false});
              
        }, callbackScope: this, loop: false});
    }

    update() {
        //temp
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("Cut to Day");
            this.scene.start('dayScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene');
        }
        
        
        this.overlay.anims.play('overlay', 1, true);
        this.paperSheet.anims.play('paperSheet', 1, true);
        this.overlay.anims.play('overlay', 1, true);
        this.water1.anims.play('water1', 1, true);

    }

}
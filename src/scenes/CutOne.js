class CutOne extends Phaser.Scene {
    constructor() {
      super("cutoneScene");
    }

    preload(){
        this.load.image('hills','./Assets/CutSceneOne/hills.png');
        this.load.image('sunrise','./Assets/CutSceneOne/sunrise.png');
        this.load.spritesheet('lake', './Assets/CutSceneOne/lake.png', {frameWidth: 1434, frameHeight: 885, startFrame: 0, endFrame: 2});

        this.load.image('background2', './Assets/CutSceneOne/background_openingscene.png');
        this.load.image('pole','./Assets/CutSceneOne/pole.png')
        this.load.spritesheet('overlay', './assets/overlay.png', {frameWidth: 480, frameHeight: 672, startFrame: 0, endFrame: 5});
        this.load.spritesheet('paperSheet', './Assets/CutSceneOne/paperSheet.png', {frameWidth: 1436, frameHeight: 887, startFrame: 0, endFrame: 3});
        this.load.spritesheet('paperWind', './Assets/CutSceneOne/paperWind.png', {frameWidth: 1434, frameHeight: 885, startFrame: 0, endFrame: 9});
        this.load.spritesheet('walk1', './Assets/CutSceneOne/walk.png', {frameWidth: 1434, frameHeight: 885, startFrame: 0, endFrame: 6});
        this.load.spritesheet('water1', './Assets/CutSceneOne/water.png', {frameWidth: 1434, frameHeight: 885, startFrame: 0, endFrame: 3});

        this.load.image('background3', './Assets/CutSceneOne/background_dock.png');
        this.load.image('boat2','./Assets/CutSceneOne/the_boat.png');
        this.load.spritesheet('walk2', './Assets/CutSceneOne/dock_walk.png', {frameWidth: 1434, frameHeight: 885, startFrame: 0, endFrame: 5});


    }

    create() {
        this.add.text(20, 20, "CUT SCENE");
        this.timer= 0;
        //camera
        this.cameras.main.setBounds(0, 0, 1438, 887);
        this.cameras.main.setZoom(1.0);
        this.cameras.main.setScroll(0, 0);

        //anims
        this.anims.create({
            key: 'lake',
            frames: this.anims.generateFrameNumbers('lake', {start: 0, end: 2, first: 0}), frameRate: .5
        });

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

        this.anims.create({
            key: 'walk2',
            frames: this.anims.generateFrameNumbers('walk2', {start: 0, end: 5, first: 0}), frameRate: .5
        });

        //define key (use keyRight to switch scenes for now)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //images
        this.sunrise = this.add.tileSprite(0, 0, 640, 480, 'sunrise').setOrigin(0, 0);
        this.lake = this.add.sprite(0,0,'lake').setOrigin(0,0);
        this.hills = this.add.sprite(0,0,'hills').setOrigin(0,0);

    
        this.background = this.add.sprite(0,0, 'background2').setOrigin(0, 0);
        this.walk1 = this.add.sprite(0, 0, 'walk1').setOrigin(0, 0);
        this.pole= this.add.sprite(0,0,'pole').setOrigin(0,0);
        this.paperSheet = this.add.sprite(0, 0, 'paperSheet').setOrigin(0, 0);
        this.paperWind = this.add.sprite(0, 0, 'paperWind').setOrigin(0, 0);
        this.water1= this.add.sprite(0,0, 'water1').setOrigin(0,0); 

        this.backgrounddock= this.add.sprite(0,0,'background3').setOrigin(0,0);
        this.boat2= this.add.sprite(0,0,'boat2').setOrigin(0,0);
        this.walk2 = this.add.sprite(0, 0, 'walk2').setOrigin(0, 0);

        //alpha electric boogaloo
        this.background.alpha=0;
        this.pole.alpha=0;
        this.paperSheet.alpha=0;

        this.paperWind.alpha=0;
        this.walk1.alpha=0;

        this.backgrounddock.alpha=0;
        this.boat2.alpha=0;
        this.walk2.alpha=0;

        //overlay
        this.overlay = this.add.sprite(0, 0, 'overlay').setOrigin(0, 0);
        this.overlay.setBlendMode(Phaser.BlendModes.ADD);
        this.overlay.scaleX= 3;
        this.overlay.scaleY= 1.5;
        this.overlay.alpha= .25;


        //im sorry my code looks like this
        this.time.addEvent({delay: 5000, callback: () => {
            //opening shot to missing poster cut, changes alphas to transition to new scene
            this.background.alpha=1;
            this.pole.alpha=1;
            this.paperSheet.alpha=1;
            this.time.addEvent({delay: 10000, callback: () => { 
                //starts walking animation on screen    
                this.walk1.alpha=1;
                this.walk1.anims.play('walk1', 1, true);
                
                this.time.addEvent({delay:4000, callback: () =>{
                    //starts paper animation and begins camera movement
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
                        //pan down to follow paper as it comes to rest on the beach
                        this.cameras.main.pan(
                            900,
                            610,
                            9000,
                            'Sine.easeOut'
                        );
                    }, callbackScope: this, loop: false});
                }, callbackScope: this, loop: false});
            }, callbackScope: this, loop: false});
        }, callbackScope: this, loop: false});

        //new scene
        this.time.addEvent({delay: 40000, callback: () => {
            this.cameras.main.pan(
                0,
                0,
                0,
                'Linear'
            );
            this.backgrounddock.alpha=1;
            this.boat2.alpha=1;
            this.walk2.alpha=1;

            this.time.addEvent({delay: 3000, callback: () => {
                this.walk2.anims.play('walk2', 1, true); 
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
        this.timer += .001;

        //scene 1
        this.overlay.anims.play('overlay', 1, true);
        this.lake.anims.play('lake', 1, true);
        this.sunrise.tilePositionX -= .05;
        //scene 2
        this.paperSheet.anims.play('paperSheet', 1, true);
        this.water1.anims.play('water1', 1, true); 
        //scene 3
        this.backgrounddock.y= 10* Math.sin(2 * this.timer) - 10;
        this.boat2.y= 10* Math.sin(this.timer);

    }

}
class CutSix extends Phaser.Scene {
    constructor() {
      super("sixScene");
    }

    preload() {
      this.load.image('bg1','./Assets/CutsceneFinal/bg1.png');
      this.load.image('bg2','./Assets/CutsceneFinal/bg2.png');
      this.load.image('bg3','./Assets/CutsceneFinal/bg3.png');

      this.load.image('endboat1','./Assets/CutsceneFinal/boat1.png');
      this.load.image('endboat2','./Assets/CutsceneFinal/boat2.png');
      this.load.image('endboat3','./Assets/CutsceneFinal/boat3.png');
      this.load.image('endboat4','./Assets/CutsceneFinal/boat4.png');
      this.load.image('endboat5','./Assets/CutsceneFinal/boat5.png');

      this.load.spritesheet('finalClouds', './Assets/CutsceneFinal/finalClouds.png', {frameWidth: 700, frameHeight: 1000, startFrame: 0, endFrame: 3});

      this.load.spritesheet('playerSheet', './Assets/CutsceneFinal/playerSheet.png', {frameWidth: 700, frameHeight: 1000, startFrame: 0, endFrame: 5});
      
      this.load.image('playerAndFish','./Assets/CutsceneFinal/playerAndFish.png');

      this.load.spritesheet('playerReel', './Assets/CutsceneFinal/playerReel.png', {frameWidth: 700, frameHeight: 500, startFrame: 0, endFrame: 1});
      this.load.spritesheet('sitUp', './Assets/CutsceneFinal/sitUp.png', {frameWidth: 700, frameHeight: 1000, startFrame: 0, endFrame: 1});

      this.load.image('waterSplash', './Assets/CutsceneFinal/waterSplash.png');

      this.load.image('endScreen','./Assets/CutsceneFinal/endScreen.png');

    }

    create() {
        this.game.sound.stopAll();
        this.add.text(20, 20, "Hi vin!"); //hi ankie

        // moosic start
        this.bgm_end = this.sound.add('bgm_endCutscene');
        this.bgm_end.volume = 0;
        this.bgm_end.play()
        this.tweens.add({
          targets: this.bgm_end,
          volume: 1,
          duration: 3000
      });

        this.timer= 0;
        this.playeranims =0;
        this.simcameramovement= false;
        //camera
        this.cameras.main.setBounds(0, 0, 1500, 1000);
        this.cameras.main.setZoom(1.0);
        this.cameras.main.setScroll(0, 500);

        //anims
        this.anims.create({
            key: 'finalClouds',
            frames: this.anims.generateFrameNumbers('finalClouds', {start: 0, end: 3, first: 0}), frameRate: .5
        });

        this.anims.create({
          key: 'playerSheet1',
          frames: this.anims.generateFrameNumbers('playerSheet', {start: 0, end: 2, first: 0}), frameRate: .5
        });

        this.anims.create({
          key: 'playerSheet2',
          frames: this.anims.generateFrameNumbers('playerSheet', {start: 3, end: 3, first: 0}), frameRate: .5
        });

        this.anims.create({
          key: 'playerSheet3',
          frames: this.anims.generateFrameNumbers('playerSheet', {start: 3, end: 5, first: 0}), frameRate: .5
        });

        this.anims.create({
          key: 'playerReel',
          frames: this.anims.generateFrameNumbers('playerReel', {start: 0, end: 1, first: 0}), frameRate: 2
        });

        this.anims.create({
          key: 'sitUp',
          frames: this.anims.generateFrameNumbers('sitUp', {start: 0, end: 1, first: 0}), frameRate: .5
        });

        //images
        this.bg1 = this.add.sprite(0,500,'bg1').setOrigin(0,0);
        this.boat1 = this.add.sprite(0,500,'endboat1').setOrigin(0,0);
        this.playerReel = this.add.sprite(0,500,'playerReel').setOrigin(0,0);

        this.bg2 = this.add.sprite(0,0,'bg2').setOrigin(0,0);
        this.playerAndFish = this.add.sprite(0,500,'playerAndFish').setOrigin(0,0);
        this.boat2 = this.add.sprite(0,500,'endboat2').setOrigin(0,0);
        this.waterSplash = this.add.sprite(0,500,'waterSplash').setOrigin(0,0); 

        this.boat3 = this.add.sprite(0,500,'endboat3').setOrigin(0,0);
        this.sitUp = this.add.sprite(0,0,'sitUp').setOrigin(0,0);

        this.finalClouds = this.add.sprite(0,0,'finalClouds').setOrigin(0,0);
        this.bg3 = this.add.sprite(0,0,'bg3').setOrigin(0,0);
        this.playerSheet= this.add.sprite(0,0,'playerSheet').setOrigin(0,0);
        this.boat4 = this.add.sprite(0,0,'endboat4').setOrigin(0,0);


        //alpha electric boogaloo
        this.fadeout = false;

        this.bg2.alpha=0;
        this.playerAndFish.alpha=0;
        this.boat2.alpha=0;
        this.waterSplash.alpha=0; 

        this.boat3.alpha=0;
        this.sitUp.alpha=0;

        this.playerSheet.alpha=0;
        this.boat4.alpha=0; 
        this.bg3.alpha=0;
        this.finalClouds.alpha=0;

        //endscreen
        this.endScreen= this.add.sprite(0,0, 'endScreen').setOrigin(0,0);
        this.endScreen.alpha= 0;
        this.fadeEnd= false;

        //overlay
        this.overlay = this.add.sprite(0, 0, 'overlay').setOrigin(0, 0);
        this.overlay.setBlendMode(Phaser.BlendModes.ADD);
        this.overlay.scaleX= 3;
        this.overlay.scaleY= 1.5;
        this.overlay.alpha= .25;

        //booleans
        this.pullUp= false;
        this.sunrise= false;
        this.fade= true;

        //blackscreen
        this.blackScreen= this.add.sprite(0,0, 'blackScreen').setOrigin(0,0);       

        //if theres a better way to do this I'll learn it when I'm dead
        this.time.addEvent({delay:2000, callback: () =>{
          //reel2
          this.playerReel.anims.play('playerReel', 1, false);
          this.pullUp= true;

          this.time.addEvent({delay:2000, callback: () =>{
            //fish and player
            this.bg2.alpha=1;
            this.playerAndFish.alpha=1;
            this.boat2.alpha=1;
            this.waterSplash.alpha=1; 

            this.time.addEvent({delay:2500, callback: () =>{
              this.playerAndFish.alpha=0;
              this.boat2.alpha=0;
              this.waterSplash.alpha=0; 

              this.boat3.alpha=1;
              this.sitUp.alpha=1;
              this.sitUp.anims.play('sitUp', 1, false);

              this.time.addEvent({delay:3500, callback: () =>{
                //player hugging fish
                this.boat3.alpha=0;
                this.sitUp.alpha=0;

                this.playerSheet.alpha=1;
                this.boat4.alpha=1; 
                this.finalClouds.alpha=1;
                this.playerSheet.anims.play('playerSheet1', 1, false);

                this.time.addEvent({delay:6000, callback: () =>{
                  //pan up to clouds
                  this.cameras.main.pan(
                    0,
                    0,
                    3000,
                    'Sine.easeInOut'
                  );

                  this.time.addEvent({delay:3000, callback: () =>{
                    //clouds
                    this.finalClouds.anims.play('finalClouds', 1, false);

                    this.time.addEvent({delay:5000, callback: () =>{
                      this.sunrise= true;
                      this.time.addEvent({delay:1500, callback: () =>{
                        this.cameras.main.pan(
                          0,
                          700,
                          3000,
                          'Sine.easeInOut'
                        );
                        this.playerSheet.anims.play('playerSheet2', 1, false);

                        this.time.addEvent({delay:3000, callback: () =>{
                          this.playerSheet.anims.play('playerSheet3', 1, false);
                          this.time.addEvent({delay:6000, callback: () =>{
                            this.fade= false;
                            this.time.addEvent({delay:2000, callback: () =>{
                              this.cameras.main.pan(
                                0,
                                0,
                                0,
                                'Sine.easeInOut'
                              );
                              this.endScreen.alpha= 1;
                              this.fade= true;
                            }, callbackScope: this, loop: false});
                          }, callbackScope: this, loop: false});
                        }, callbackScope: this, loop: false});
                      }, callbackScope: this, loop: false});
                    }, callbackScope: this, loop: false});
                  }, callbackScope: this, loop: false});
                }, callbackScope: this, loop: false});
              }, callbackScope: this, loop: false});
            }, callbackScope: this, loop: false});
          }, callbackScope: this, loop: false});
        }, callbackScope: this, loop: false});

    }

    update() {
      this.timer += .005;
      this.boat1.y= 4* Math.sin(this.timer) +500;

      if(this.fade){
          this.blackScreen.alpha -= .005;
      }
      else{
          this.blackScreen.alpha += .005;
      }

      if(this.fadeEnd){
        this.endScreen.alpha += .005;
      }

      //scene 1
      this.overlay.anims.play('overlay', 1, true);
  
      if(this.pullUp){
        //this.playerReel.x -= .05;
      }

      if(this.sunrise){
        this.bg3.alpha += .0025;
      }
    }
}
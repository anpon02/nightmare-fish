class AudioManager extends Phaser.Scene {
    constructor() {
      super("audioManagerScene");
    }

    preload() {
        this.load.audio('bgm_DriftWood', './Assets/bgm_DriftWood.mp3');
        this.load.audio('bgm_ReelingFromCurrent', './Assets/bgm_ReelingFromCurrent.wav');
    }

    create() {

      let backgroundConfig = {
        loop: true,
        volume: 1,
      }

        // Day (1) Rest and 'Action' bgm
        this.dayRestbgm = this.sound.add('bgm_DriftWood', backgroundConfig);

        this.dayActionbgm = this.sound.add('bgm_ReelingFromCurrent');

        this.day1Check = false;
        this.castMusic = false;
    }

    update(){
        if (this.scene.isActive('cutoneScene') && !this.day1Check){
          console.log('PLAY DAY1 Song');
          this.dayRestbgm.play();
          this.day1Check = true;
        }

        if (this.day1Check && this.cast){
            console.log('Reel em!');
            this.dayActionbgm.play();
            this.castMusic = true;
        }
    }
}
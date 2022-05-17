class CutTwo extends Phaser.Scene {
    constructor() {
      super("twoScene");
    }

    create() {
        this.add.text(20, 20, "CUT SCENE");

        //define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("two to day");
            this.scene.start('dayScene');
        }
    }


}
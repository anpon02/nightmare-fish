class Cloud extends Phaser.Scene {
    constructor() {
      super("cloudScene");
    }

    create() {
        this.add.text(20, 20, "CLOUD SCENE!");

        //define key (use keyRight to switch scenes for now)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("Cloud to Rain");
            this.scene.start('rainScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('dayScene');
        }
    }
}
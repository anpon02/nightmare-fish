class Rain extends Phaser.Scene {
    constructor() {
      super("rainScene");
    }

    create() {
        this.add.text(20, 20, "RAIN SCENE");

        //define key (use keyRight to switch scenes for now)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("Rain to Night");
            this.scene.start('nightScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('cloudScene');
        }
    }
}
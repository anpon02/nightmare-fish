class Over extends Phaser.Scene {
    constructor() {
      super("overScene");
    }

    create() {
        this.add.text(20, 20, "OVER SCENE");

        //define key (use keyRight to switch scenes for now)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("Over to Menu");
            this.scene.start('menuScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('nightScene');
        }
    }
}
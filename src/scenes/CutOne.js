class CutOne extends Phaser.Scene {
    constructor() {
      super("cutoneScene");
    }

    create() {
        this.add.text(20, 20, "CUT SCENE");

        //define key (use keyRight to switch scenes for now)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("Cut to Day");
            this.scene.start('dayScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene');
        }
    }
}
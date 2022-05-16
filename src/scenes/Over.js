class Over extends Phaser.Scene {
    constructor() {
      super("overScene");
    }

    create() {
        this.add.text(20, 20, "OVER SCENE");
        this.add.text(game.config.width/2, game.config.height/2, "PRESS 'SPACE' TO RESTART 'ESC' TO MAIN MENU").setOrigin(0.5, 0);

        //define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            console.log("Over to Day");
            this.scene.start(goback);
        }

        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            console.log("Over to Menu");
            this.scene.start('menuScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('nightScene');
        }
    }
}
class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }

    create() {
        this.add.text(20, 20, "This is the menu!");

        //define key (use keyRight to switch scenes for now)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            console.log("Menu to Day");
            this.scene.start('cutoneScene');
            //replace with cutscene ^
        }
    }
}
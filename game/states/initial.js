var InitialState = new function() {
    var assets = {
        Backgrounds: [{
            path: 'assets/images/backgrounds/book.jpg',
            name: 'map'
        }],
        Sprites: [{
            path: 'assets/images/sprites/hugo-base.png',
            name: 'hugo-base'
        }, {
            path: 'assets/images/sprites/hugo-mouth-normal.png',
            name: 'hugo-mouth-normal'
        }, {
            path: 'assets/images/sprites/hugo-mouth-smile.png',
            name: 'hugo-mouth-smile'
        }, {
            path: 'assets/images/sprites/hugo-shadow.png',
            name: 'hugo-shadow'
        }, {
            path: 'assets/images/sprites/scuba_snorchel.png',
            name: 'hugo-snorchel'
        }, {
            path: 'assets/images/sprites/scuba_glasses.png',
            name: 'hugo-glasses'
        }]
    };

    this.preload = function() {
        Game.loadGenericAssets();
        Game.loadAssets(assets.Backgrounds, Game.AssetType.Sprite);
        Game.loadAssets(assets.Sprites, Game.AssetType.Sprite);
    }

    this.create = function() {
        Game.scaleMode(Phaser.ScaleManager.EXACT_FIT);
        Game.frameBased(true);
        Game.createGenericAssets();
        var background = Game.addSprite(0, 0, 'map', Game.WIDTH, Game.HEIGHT);

        var hugo = Game.addHugo(496, 775, 150, 241);

        var intro = Game.addText(Game.center().x, Game.center().y, "Zdravíčko, mé jméno je Hugo a budu Váš průvodce", 80);
        intro.inputEnabled = true;
        intro.state = 1;
        intro.input.useHandCursor = true;
        intro.addColor("#5C1F00", 23);
        intro.addColor("#000000", 27);
        intro.events.onInputOver.add(function() {
            intro.fontSize = 85;
        }, this);
        intro.events.onInputOut.add(function() {
            intro.fontSize = 80;
        }, this);
        intro.events.onInputDown.add(function() {
            if (intro.state == 1) {
                intro.clearColors();
                intro.text = "Doporučuji pomůcku používat na počítači";
                intro.addColor("#5C1F00", 31);
                intro.state = 2;
            }
            else if (intro.state == 2) {
                intro.clearColors();
                intro.text = "Pro nejlepší zážitek budete potřebovat sluchátka nebo reproduktor";
                intro.addColor("#5C1F00", 38);
                intro.addColor("#000000", 48);
                intro.addColor("#5C1F00", 54);
                intro.state = 3;
            }
            else {
                intro.destroy();

                var start = Game.addText(Game.center().x, Game.center().y, "Spustit", 80);
                start._effect = Game.Effects.pulsateText(start, 1200);
                start.inputEnabled = true;
                start.input.useHandCursor = true;
                start.events.onInputOver.add(function() {
                    start._effect.scaleUp.pause();
                    start._effect.scaleBack.pause();
                    start.fontSize = 100;
                }, this);
                start.events.onInputOut.add(function() {
                    start.fontSize = 80;
                    start._effect.scaleUp.resume();
                    start._effect.scaleBack.resume();
                }, this);
                start.events.onInputDown.add(function() {
                    Game.nextState('confirm', true);
                }, this);
            }
        }, this);
    }

    this.render = function() {
        //Game.debugInfo(32, 32);
    }
};
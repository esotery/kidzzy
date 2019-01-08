var StreamState = new function() {
    var assets = {
        Backgrounds: [{
            path: 'assets/images/backgrounds/stream.jpg',
            name: 'stream'
        }]
    };

    this.preload = function() {
        Game.loadGenericAssets();
        Game.loadAssets(assets.Backgrounds, Game.AssetType.Sprite);
    },

    this.create = function() {
        Game.scaleMode(Phaser.ScaleManager.EXACT_FIT);
        Game.createGenericAssets();
        var background = Game.addSprite(0, 0, 'stream',  Game.WIDTH, Game.HEIGHT);
        
        var question = Game.addText(Game.center().x, Game.center().y, "?", 140);
        Game.Effects.pulsateText(question, 1200, 80);
        setTimeout(function() {
            question.destroy();
            var header = Game.addChoice(Game.center().x, Game.center().y - 150, "Co vidíte na obrázku?", 70, 
                ['Jezero', 'Přehrada', 'Potok', 'Rybník', 'Řeka'], 'Potok', 60, function () {
                    Game.currentPhase((Game.currentPhase() | Game.Phase.StreamDone));
                    Game.nextState('passed'); 
                });
        }, 2000);
        
        Game.buildHUD([Game.HUD.BACK]);
    },
    
    this.render = function() {
        //Game.debugInfo(32, 32);
    }
};
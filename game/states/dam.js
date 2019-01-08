var DamState = new function() {
    var assets = {
        Backgrounds: [{
            path: 'assets/images/backgrounds/dam.jpg',
            name: 'dam'
        }]
    };

    this.preload = function() {
        Game.loadGenericAssets();
        Game.loadAssets(assets.Backgrounds, Game.AssetType.Sprite);
    },

    this.create = function() {
        Game.scaleMode(Phaser.ScaleManager.EXACT_FIT);
        Game.createGenericAssets();
        var background = Game.addSprite(0, 0, 'dam', Game.WIDTH, Game.HEIGHT);
        
        var question = Game.addText(Game.center().x, Game.center().y, "?", 140);
        Game.Effects.pulsateText(question, 1200, 80);
        setTimeout(function() {
            question.destroy();
            var header = Game.addChoice(Game.center().x, Game.center().y - 150, "Co vidíte na obrázku?", 70, 
                ['Jezero', 'Přehrada', 'Potok', 'Rybník', 'Řeka'], 'Přehrada', 60, function () {
                    Game.currentPhase((Game.currentPhase() | Game.Phase.DamDone));
                    Game.nextState('passed'); 
                });
        }, 2000);
        
        Game.buildHUD([Game.HUD.BACK]);
    },
    
    this.render = function() {
        //Game.debugInfo(32, 32);
    }
};
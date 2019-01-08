var PondState = new function() {
    var assets = {
        Backgrounds: [{
            path: 'assets/images/backgrounds/pond.jpg',
            name: 'pond'
        }],
        NavPoints: [{
            path: 'assets/images/sprites/dragonfly.png',
            name: 'dragonfly'
        },
        {
            path: 'assets/images/sprites/frog.png',
            name: 'frog'
        },
        {
            path: 'assets/images/sprites/heron.png',
            name: 'heron'
        },
        {
            path: 'assets/images/sprites/karp.png',
            name: 'karp'
        },
        {
            path: 'assets/images/sprites/waterlilly.png',
            name: 'waterlilly'
        },
        {
            path: 'assets/images/sprites/willow.png',
            name: 'willow'
        }]
    };

    this.preload = function() {
        Game.loadGenericAssets();
        Game.loadAssets(assets.Backgrounds, Game.AssetType.Sprite);
        Game.loadAssets(assets.NavPoints, Game.AssetType.Sprite);
    },

    this.create = function() {
        Game.scaleMode(Phaser.ScaleManager.EXACT_FIT);
        Game.createGenericAssets();
        var background = Game.addSprite(0, 0, 'pond', Game.WIDTH, Game.HEIGHT);
        
        var hugo = Game.addHugo(1300, 680, 40, 65, true, 0.5);
        hugo.body.events.onInputDown.add(function() {
            Game.nextState('snails');
        }, this);
        
        var dragonfly = Game.addPondEntity(1494, 1102, 'dragonfly', 'insects');
        var frog = Game.addPondEntity(325, 883, 'frog', 'amphbians');
        var heron = Game.addPondEntity(861, 764, 'heron', 'birds');
        var karp = Game.addPondEntity(565, 710, 'karp', 'fishes');
        var waterlilly = Game.addPondEntity(338, 799, 'waterlilly', 'waterPlants');
        var willow = Game.addPondEntity(0, 0, 'willow', 'plants');
        
        var plantsText = Game.addText(506, 324, 'Rostliny', 40);
        plantsText.fill = 'white';
        plantsText.alpha = 0.5;
        
        var waterPlantsText = Game.addText(415, 767, 'Vodní rostliny', 40);
        waterPlantsText.fill = 'white';
        waterPlantsText.alpha = 0.5;
        
        var insectsText = Game.addText(1560, 1230, 'Hmyz', 40);
        insectsText.fill = 'white';
        insectsText.alpha = 0.5;
        
        var amphbiansText = Game.addText(472, 909, 'Obojživelníci', 40);
        amphbiansText.fill = 'white';
        amphbiansText.alpha = 0.5;
        
        var fishesText = Game.addText(610, 679, 'Ryby', 40);
        fishesText.fill = 'white';
        fishesText.alpha = 0.5;
        
        var birdsText = Game.addText(1122, 1031, 'Ptáci', 40);
        birdsText.fill = 'white';
        birdsText.alpha = 0.5;
        
        var snailsText = Game.addText(1317, 647, 'Plži', 40);
        snailsText.fill = 'white';
        snailsText.alpha = 0.5;
        
        var headline = Game.addText(Game.center().x, 80, 'Rybník', 80);
        headline.fill = 'black';
        headline.alpha = 0.7;
        
        Game.buildHUD([Game.HUD.BACK]);
        
        Game.backButton.tint = 0x000000;
    },
    
    this.render = function() {
        //Game.debugInfo(32, 32);
    }
};
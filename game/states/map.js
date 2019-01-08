var MapState = new function() {
    var assets = {
        Backgrounds: [{
            path: 'assets/images/backgrounds/map.jpg',
            name: 'map'
        }],
        NavPoints: [{
            path: 'assets/images/sprites/badge-dam.png',
            name: 'badge-dam'
        },
        {
            path: 'assets/images/sprites/badge-lake.png',
            name: 'badge-lake'
        },
        {
            path: 'assets/images/sprites/badge-pond.png',
            name: 'badge-pond'
        },
        {
            path: 'assets/images/sprites/badge-river.png',
            name: 'badge-river'
        },
        {
            path: 'assets/images/sprites/badge-stream.png',
            name: 'badge-stream'
        }]
    };

    var navpoints = null;

    this.preload = function() {
        Game.loadGenericAssets();
        Game.loadAssets(assets.Backgrounds, Game.AssetType.Sprite);
        Game.loadAssets(assets.NavPoints, Game.AssetType.Sprite);
    },

    this.create = function() {
        Game.scaleMode(Phaser.ScaleManager.EXACT_FIT);
        Game.createGenericAssets();
        var background = Game.addSprite(0, 0, 'map', Game.WIDTH, Game.HEIGHT);
        
        
        navpoints = [];
        
        var riverDone = (Game.currentPhase() & Game.Phase.RiverDone) == Game.Phase.RiverDone;
        var damDone = (Game.currentPhase() & Game.Phase.DamDone) == Game.Phase.DamDone;
        var lakeDone = (Game.currentPhase() & Game.Phase.LakeDone) == Game.Phase.LakeDone;
        var streamDone = (Game.currentPhase() & Game.Phase.StreamDone) == Game.Phase.StreamDone;
        
        navpoints.push(Game.addNavpoint(1573, 641, 100, 100, 'badge-river', null, 'river', true, riverDone));
        navpoints.push(Game.addNavpoint(1213, 942, 100, 100, 'badge-dam', null, 'dam', riverDone, damDone));
        navpoints.push(Game.addNavpoint(1054, 377, 100, 100, 'badge-stream', null, 'stream', damDone, streamDone));
        navpoints.push(Game.addNavpoint(696, 921, 100, 100, 'badge-lake', null, 'lake', streamDone, lakeDone));
        navpoints.push(Game.addNavpoint(490 , 479, 100, 100, 'badge-pond', null, 'pond', lakeDone, false));
        
        Game.connectNavpoints(navpoints, background);
    },
    
    this.render = function() {
        //Game.debugInfo(32, 32);
    }
};
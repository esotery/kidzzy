var AssociationState = new function() {
    var assets = {
        Backgrounds: [{
            path: 'assets/images/backgrounds/pond.jpg',
            name: 'pond'
        }],
        NavPoints: [
        {
            path: 'assets/images/sprites/karp.png',
            name: 'karp'
        },
        {
            path: 'assets/images/sprites/willow.png',
            name: 'willow'
        }],
        PlantsParts:[
        {
            path: 'assets/images/sprites/plant1_leaves.png',
            name: 'plant1_leaves'
        },
        {
            path: 'assets/images/sprites/plant1_bloom.png',
            name: 'plant1_bloom'
        },
        {
            path: 'assets/images/sprites/plant1_fruit.png',
            name: 'plant1_fruit'
        },
        {
            path: 'assets/images/sprites/plant1_whip.png',
            name: 'plant1_whip'
        },
        {
            path: 'assets/images/sprites/plant2_root.png',
            name: 'plant2_root'
        },
        {
            path: 'assets/images/sprites/plant2_stalk_leaf.png',
            name: 'plant2_stalk_leaf'
        },
        {
            path: 'assets/images/sprites/plant2_bloom.png',
            name: 'plant2_bloom'
        },
        {
            path: 'assets/images/sprites/plant2_fruit.png',
            name: 'plant2_fruit'
        },
        {
            path: 'assets/images/sprites/plant2_reedbeeds.png',
            name: 'plant2_reedbeeds'
        },
        {
            path: 'assets/images/sprites/plant3_root.png',
            name: 'plant3_root'
        },
        {
            path: 'assets/images/sprites/plant3_leaves.png',
            name: 'plant3_leaves'
        },
        {
            path: 'assets/images/sprites/plant3_bloom.png',
            name: 'plant3_bloom'
        },
        {
            path: 'assets/images/sprites/plant3_fruit.png',
            name: 'plant3_fruit'
        },
        {
            path: 'assets/images/sprites/plant4_leaves.png',
            name: 'plant4_leaves'
        },
        {
            path: 'assets/images/sprites/plant4_bloom.png',
            name: 'plant4_bloom'
        },
        {
            path: 'assets/images/sprites/plant4_fruit.png',
            name: 'plant4_fruit'
        },
        {
            path: 'assets/images/sprites/plant5_bloom.png',
            name: 'plant5_bloom'
        },
        {
            path: 'assets/images/sprites/plant5_fruit.png',
            name: 'plant5_fruit'
        }]
    };
    
    var cursorKeys;

    this.preload = function() {
        Game.loadGenericAssets();
        Game.loadAssets(assets.Backgrounds, Game.AssetType.Sprite);
        Game.loadAssets(assets.NavPoints, Game.AssetType.Sprite);
        Game.loadAssets(assets.PlantsParts, Game.AssetType.Sprite);
    },

    this.create = function() {
        Game.scaleMode(Phaser.ScaleManager.EXACT_FIT);
        Game.createGenericAssets();
        var background = Game.addSprite(0, 0, 'pond', Game.BASE_WIDTH, Game.BASE_HEIGHT);
        Game.makeGray(background);
        
        var karp = Game.addPondEntity(1056, 1136, 'karp', 'fishes', false, false);
        var willow = Game.addPondEntity(0, 0, 'willow', 'plants', false, false);
        
        var headline = Game.addText(Game.center().x, 90, 'Hra', 80);
        //headline.fill = 'white';
        headline.alpha = 0.7;
        
        var mappings = [
            {text:'Vrba bílá', options:['plant1_bloom', 'plant1_fruit', 'plant1_leaves', 'plant1_whip']},
            {text:'Rákos obecný', options:['plant2_bloom', 'plant2_fruit', 'plant2_root', 'plant2_reedbeeds', 'plant2_stalk_leaf']},
            {text:'Orobinec úzkolistý', options:['plant3_bloom', 'plant3_fruit', 'plant3_leaves', 'plant3_root']},
            {text:'Olše lepkavá', options:['plant4_bloom', 'plant4_fruit', 'plant4_leaves']},
            {text:'Blatouch bahenní', options:['plant5_bloom', 'plant5_fruit']}];
        
        var hugo = Game.addHugo(150, 700, 200, 305, false, 0.5);
        
        var associations = Game.addAssociation(Game.center().x, 300, mappings, null);
        
        Game.worldBounds(0, 0, Game.BASE_WIDTH, Game.BASE_HEIGHT);
                        
        Game.buildHUD([Game.HUD.BACK], 0, 0);
    },
    this.render = function() {
        //Game.debugInfo(32, 32);
    }
};
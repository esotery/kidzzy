var PlantsState = new function() {
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
        Plants:[
        {
            path: 'assets/images/sprites/plant1.png',
            name: 'plant1'
        },
        {
            path: 'assets/images/sprites/plant2.png',
            name: 'plant2'
        },
        {
            path: 'assets/images/sprites/plant3.png',
            name: 'plant3'
        },
        {
            path: 'assets/images/sprites/plant4.png',
            name: 'plant4'
        },
        {
            path: 'assets/images/sprites/plant5.png',
            name: 'plant5'
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
        }],
        PlantsAudio:[
        {
            path: 'assets/sound/descriptions/plant1.ogg',
            name: 'plant1'
        },
        {
            path: 'assets/sound/descriptions/plant2.ogg',
            name: 'plant2'
        },
        {
            path: 'assets/sound/descriptions/plant3.ogg',
            name: 'plant3'
        },
        {
            path: 'assets/sound/descriptions/plant4.ogg',
            name: 'plant4'
        },
        {
            path: 'assets/sound/descriptions/plant5.ogg',
            name: 'plant5'
        }]
    };
    
    var cursorKeys;

    this.preload = function() {
        Game.loadGenericAssets();
        Game.loadAssets(assets.Backgrounds, Game.AssetType.Sprite);
        Game.loadAssets(assets.NavPoints, Game.AssetType.Sprite);
        Game.loadAssets(assets.Plants, Game.AssetType.Sprite);
        Game.loadAssets(assets.PlantsParts, Game.AssetType.Sprite);
        Game.loadAssets(assets.PlantsAudio, Game.AssetType.Audio);
    },

    this.create = function() {
        Game.scaleMode(Phaser.ScaleManager.EXACT_FIT);
        Game.createGenericAssets();
        var background = Game.addSprite(0, 0, 'pond', Game.BASE_WIDTH, Game.BASE_HEIGHT);
        Game.makeGray(background);
        
        var karp = Game.addPondEntity(1056, 1136, 'karp', 'fishes', false, false);
        var willow = Game.addPondEntity(0, 0, 'willow', 'plants', false, false);
        
        var headline = Game.addText(Game.center().x, 90, 'Rostliny u rybníku', 80);
        headline.alpha = 0.7;
        
        var toHide = [];
        var associationGame = Game.addText(Game.center().x, 1100, 'Hra!', 60);
        associationGame.inputEnabled = true;
        associationGame.input.useHandCursor = true;
        associationGame.events.onInputOver.add(function() {
            associationGame.fontSize = 80;
        }, this);
        associationGame.events.onInputOut.add(function() {
            associationGame.fontSize = 60;
        }, this);
        associationGame.events.onInputDown.add(function() {
            Game.nextState('game');        
        }, this);
        toHide.push(associationGame);
        
        Game.worldBounds(0, 0, Game.BASE_WIDTH, Game.BASE_HEIGHT);
        
        var hugo = Game.addHugo(150, 700, 200, 305, false, 0.5);
        hugo.visible = false;
        
        function hideHandler(soundIcon) {
            hugo.visible = true;
            hugo.speak();
            
            for (var i = 0; i < toHide.length; ++i) {
                if (soundIcon != toHide[i]) toHide[i].visible = false;
            }
        }
        
        function showHandler(soundIcon) {
            hugo.visible = false;
            hugo.shutup();
            
            for (var i = 0; i < toHide.length; ++i) {
                 if (soundIcon != toHide[i]) toHide[i].visible = true;
            }
        }
        
        toHide.push(Game.addSoundIcon(460, 610, 200, 200, 'plant1', 'Vrba\nbílá', 
            subtitles.plants.plant1, slides.plants.plant1, hideHandler, showHandler));
        toHide.push(Game.addSoundIcon(710, 610, 200, 200, 'plant2', 'Rákos\nobecný', 
            subtitles.plants.plant2, slides.plants.plant2, hideHandler, showHandler));
        toHide.push(Game.addSoundIcon(960, 610, 200, 200, 'plant3', 'Orobinec\núzkolistý', 
            subtitles.plants.plant3, slides.plants.plant3, hideHandler, showHandler));
        toHide.push(Game.addSoundIcon(1210, 610, 200, 200, 'plant4', 'Olše\nlepkavá', 
            subtitles.plants.plant4, slides.plants.plant4, hideHandler, showHandler));
        toHide.push(Game.addSoundIcon(1460, 610, 200, 200, 'plant5', 'Blatouch\nbahenní', 
            subtitles.plants.plant5, slides.plants.plant5, hideHandler, showHandler));
        
        Game.buildHUD([Game.HUD.BACK], 0, 0);
        
        Game.backButton.tint = 0x000000;
        toHide.push(Game.backButton);
    },
    this.render = function() {
        //Game.debugInfo(32, 32);
    }
};
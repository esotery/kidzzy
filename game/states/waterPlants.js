var WaterPlantsState = new function() {
    var assets = {
        Backgrounds: [{
            path: 'assets/images/backgrounds/pond.jpg',
            name: 'pond'
        }],
        NavPoints: [{
            path: 'assets/images/sprites/frog.png',
            name: 'frog'
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
        }],
        WaterPlants:[
        {
            path: 'assets/images/sprites/waterplants1.png',
            name: 'waterplant1'
        },
        {
            path: 'assets/images/sprites/waterplants2.png',
            name: 'waterplant2'
        },
        {
            path: 'assets/images/sprites/waterplants3.png',
            name: 'waterplant3'
        },
        {
            path: 'assets/images/sprites/waterplants4.png',
            name: 'waterplant4'
        },
        {
            path: 'assets/images/sprites/waterplants5.png',
            name: 'waterplant5'
        }],
        WaterPlantsParts:[
        {
            path: 'assets/images/sprites/waterplant1_stem.png',
            name: 'waterplant1_stem'
        },
        {
            path: 'assets/images/sprites/waterplant1_bloom.png',
            name: 'waterplant1_bloom'
        },
        {
            path: 'assets/images/sprites/waterplant1_buchanka.png',
            name: 'waterplant1_buchanka'
        },
        {
            path: 'assets/images/sprites/waterplant1_root.png',
            name: 'waterplant1_root'
        }, 
        {
            path: 'assets/images/sprites/waterplant2_stem.png',
            name: 'waterplant2_stem'
        },
        {
            path: 'assets/images/sprites/waterplant2_bloom.png',
            name: 'waterplant2_bloom'
        },
        {
            path: 'assets/images/sprites/waterplant2_leafs.png',
            name: 'waterplant2_leafs'
        },
        {
            path: 'assets/images/sprites/waterplant2_fruit.png',
            name: 'waterplant2_fruit'
        }, 
        {
            path: 'assets/images/sprites/waterplant3_leaves.png',
            name: 'waterplant3_leaves'
        },
        {
            path: 'assets/images/sprites/waterplant3_leaf_petiole.png',
            name: 'waterplant3_leaf_petiole'
        },
        {
            path: 'assets/images/sprites/waterplant3_bloom.png',
            name: 'waterplant3_bloom'
        },
        {
            path: 'assets/images/sprites/waterplant3_fruit.png',
            name: 'waterplant3_fruit'
        },
        {
            path: 'assets/images/sprites/waterplant3_root.png',
            name: 'waterplant3_root'
        }, 
        {
            path: 'assets/images/sprites/waterplant4_leaves.png',
            name: 'waterplant4_leaves'
        },
        {
            path: 'assets/images/sprites/waterplant4_root.png',
            name: 'waterplant4_root'
        },
        {
            path: 'assets/images/sprites/waterplant4_bloom.png',
            name: 'waterplant4_bloom'
        },
        {
            path: 'assets/images/sprites/waterplant4_fruit.png',
            name: 'waterplant4_fruit'
        },
        {
            path: 'assets/images/sprites/waterplant5_leaves.png',
            name: 'waterplant5_leaves'
        },
        {
            path: 'assets/images/sprites/waterplant5_bloom_fruit.png',
            name: 'waterplant5_bloom_fruit'
        },
        {
            path: 'assets/images/sprites/waterplant5_root.png',
            name: 'waterplant5_root'
        }],
        WaterPlantsAudio:[
        {
            path: 'assets/sound/descriptions/waterplant1.ogg',
            name: 'waterplant1'
        },
        {
            path: 'assets/sound/descriptions/waterplant2.ogg',
            name: 'waterplant2'
        },
        {
            path: 'assets/sound/descriptions/waterplant3.ogg',
            name: 'waterplant3'
        },
        {
            path: 'assets/sound/descriptions/waterplant4.ogg',
            name: 'waterplant4'
        },
        {
            path: 'assets/sound/descriptions/waterplant5.ogg',
            name: 'waterplant5'
        }]
    };
    
    var cursorKeys;

    this.preload = function() {
        Game.loadGenericAssets();
        Game.loadAssets(assets.Backgrounds, Game.AssetType.Sprite);
        Game.loadAssets(assets.NavPoints, Game.AssetType.Sprite);
        Game.loadAssets(assets.WaterPlants, Game.AssetType.Sprite);
        Game.loadAssets(assets.WaterPlantsParts, Game.AssetType.Sprite);
        Game.loadAssets(assets.WaterPlantsAudio, Game.AssetType.Audio);
    },

    this.create = function() {
        Game.scaleMode(Phaser.ScaleManager.EXACT_FIT);
        Game.createGenericAssets();
        var background = Game.addSprite(0, 0, 'pond', Game.BASE_WIDTH, Game.BASE_HEIGHT);
        Game.makeGray(background);
        
        var frog = Game.addPondEntity(611, 1414, 'frog', 'amphbians', false, false);
        var karp = Game.addPondEntity(1056, 1136, 'karp', 'fishes', false, false);
        var waterlilly = Game.addPondEntity(642, 1276, 'waterlilly', 'waterPlants', false, false);
        var willow = Game.addPondEntity(0, 0, 'willow', 'plants', false, false);
        
        var headline = Game.addText(Game.center().x, 536, 'Vodní rostliny', 80);
        //headline.fill = 'white';
        headline.alpha = 0.7;
        
        var toHide = [];
        
        var parachutistGame = Game.addText(Game.center().x, 1100 + 456, 'Zachraňte parašutistu!', 60);
        parachutistGame.inputEnabled = true;
        parachutistGame.input.useHandCursor = true;
        parachutistGame.events.onInputOver.add(function() {
            parachutistGame.fontSize = 80;
        }, this);
        parachutistGame.events.onInputOut.add(function() {
            parachutistGame.fontSize = 60;
        }, this);
        parachutistGame.events.onInputDown.add(function() {
            Game.nextState('game');        
        }, this);
        toHide.push(parachutistGame);
        
        Game.worldBounds(0, 0, Game.BASE_WIDTH, Game.BASE_HEIGHT);
        Game.camera(0, 456);
        
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
        
        toHide.push(Game.addSoundIcon(460, 610 + 456, 200, 200, 'waterplant1', 'Bublinatka\nobecná', 
            subtitles.waterPlants.waterplant1, slides.waterPlants.waterplant1, hideHandler, showHandler));
        toHide.push(Game.addSoundIcon(710, 610 + 456, 200, 200, 'waterplant2', 'Kotvice\nplovoucí', 
            subtitles.waterPlants.waterplant2, slides.waterPlants.waterplant2, hideHandler, showHandler));
        toHide.push(Game.addSoundIcon(960, 610 + 456, 200, 200, 'waterplant3', 'Leknín\nbílý', 
            subtitles.waterPlants.waterplant3, slides.waterPlants.waterplant3, hideHandler, showHandler));
        toHide.push(Game.addSoundIcon(1210, 610 + 456, 200, 200, 'waterplant4', 'Okřehek\nmenší', 
            subtitles.waterPlants.waterplant4, slides.waterPlants.waterplant4, hideHandler, showHandler));
        toHide.push(Game.addSoundIcon(1460, 610 + 456, 200, 200, 'waterplant5', 'Stulík\nžlutý', 
            subtitles.waterPlants.waterplant5, slides.waterPlants.waterplant5, hideHandler, showHandler));
        
        
        Game.buildHUD([Game.HUD.BACK], 0, 456);
        
        toHide.push(Game.backButton);
    },
    
    this.render = function() {
        //Game.debugInfo(32, 32);
    }
};
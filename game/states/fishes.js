var FishesState = new function() {
    var assets = {
        Backgrounds: [{
            path: 'assets/images/backgrounds/pond_underwater.jpg',
            name: 'pond_underwater'
        }],
        Fishes: [{
            path: 'assets/images/sprites/pike.png',
            name: 'fish1'
        },{
            path: 'assets/images/sprites/karpi.png',
            name: 'fish3'
        }, {
            path: 'assets/images/sprites/bream.png',
            name: 'fish2'
        }, {
            path: 'assets/images/sprites/crucian.png',
            name: 'fish4'
        }, {
            path: 'assets/images/sprites/bass.png',
            name: 'fish5'
        }, {
            path: 'assets/images/sprites/catfish.png',
            name: 'fish6'
        }, {
            path: 'assets/images/sprites/fish_fins.png',
            name: 'fish_fins'
        }, {
            path: 'assets/images/sprites/fish_bone.png',
            name: 'fish_bone'
        }, {
            path: 'assets/images/sprites/fish_bone_mask.png',
            name: 'fish_bone_mask'
        }],
        FishesParts: [{
            path: 'assets/images/sprites/fish1_feeding.png',
            name: 'fish1_feeding'
        },{
            path: 'assets/images/sprites/fish1_innature.png',
            name: 'fish1_innature'
        },{
            path: 'assets/images/sprites/fish1_teeth.png',
            name: 'fish1_teeth'
        },{
            path: 'assets/images/sprites/fish2_innature.png',
            name: 'fish2_innature'
        },{
            path: 'assets/images/sprites/fish2_inpond.png',
            name: 'fish2_inpond'
        },{
            path: 'assets/images/sprites/fish3_fishingpond.png',
            name: 'fish3_fishingpond'
        },{
            path: 'assets/images/sprites/fish3_innature.png',
            name: 'fish3_innature'
        },{
            path: 'assets/images/sprites/fish4_innature.png',
            name: 'fish4_innature'
        },{
            path: 'assets/images/sprites/fish5_hunting.png',
            name: 'fish5_hunting'
        },{
            path: 'assets/images/sprites/fish5_inpond.png',
            name: 'fish5_inpond'
        },{
            path: 'assets/images/sprites/fish6_eating.png',
            name: 'fish6_eating'
        },{
            path: 'assets/images/sprites/fish6_head.png',
            name: 'fish6_head'
        },{
            path: 'assets/images/sprites/fish6_inpond.png',
            name: 'fish6_inpond'
        }],
        FishesAudio:[
        {
            path: 'assets/sound/descriptions/fish1.ogg',
            name: 'fish1'
        },
        {
            path: 'assets/sound/descriptions/fish2.ogg',
            name: 'fish2'
        },
        {
            path: 'assets/sound/descriptions/fish3.ogg',
            name: 'fish3'
        },
        {
            path: 'assets/sound/descriptions/fish4.ogg',
            name: 'fish4'
        },
        {
            path: 'assets/sound/descriptions/fish5.ogg',
            name: 'fish5'
        },
        {
            path: 'assets/sound/descriptions/fish6.ogg',
            name: 'fish6'
        }
        ]
    };

    this.preload = function() {
        Game.loadGenericAssets();
        Game.loadAssets(assets.Backgrounds, Game.AssetType.Sprite);
        Game.loadAssets(assets.Fishes, Game.AssetType.Sprite);
        Game.loadAssets(assets.FishesParts, Game.AssetType.Sprite);
        Game.loadAssets(assets.FishesAudio, Game.AssetType.Audio);
    },

    this.create = function() {
        Game.scaleMode(Phaser.ScaleManager.EXACT_FIT);
        Game.createGenericAssets();
        var background = Game.addSprite(0, 0, 'pond_underwater', Game.WIDTH, Game.HEIGHT);

        var headline = Game.addText(Game.center().x, 80, 'Ryby', 80);
        //headline.fill = 'white';
        headline.alpha = 0.7;
        
        var toHide = [];
        var catchFishGame = Game.addText(Game.center().x, 1100, 'Pochytejte ryby!', 60);
        catchFishGame.inputEnabled = true;
        catchFishGame.input.useHandCursor = true;
        catchFishGame.events.onInputOver.add(function() {
            catchFishGame.fontSize = 80;
        }, this);
        catchFishGame.events.onInputOut.add(function() {
            catchFishGame.fontSize = 60;
        }, this);
        catchFishGame.events.onInputDown.add(function() {
            Game.nextState('game');        
        }, this);
        toHide.push(catchFishGame);
        
        var hugo = Game.addHugo(150, 700, 200, 305, false, 0);
        hugo.addScuba();
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
        
        toHide.push(Game.addSoundIcon(335, 385, 200, 200, 'fish1', 'Štika\nobecná', 
            subtitles.fishes.fish1, slides.fishes.fish1, hideHandler, showHandler));
        toHide.push(Game.addSoundIcon(585, 385, 200, 200, 'fish2', 'Cejn\nvelký', 
            subtitles.fishes.fish2, slides.fishes.fish2, hideHandler, showHandler));
        toHide.push(Game.addSoundIcon(835, 385, 200, 200, 'fish3', 'Kapr\nobecný', 
            subtitles.fishes.fish3, slides.fishes.fish3, hideHandler, showHandler));
        toHide.push(Game.addSoundIcon(1085, 385, 200, 200, 'fish4', 'Karas\nobecný', 
            subtitles.fishes.fish4, slides.fishes.fish4, hideHandler, showHandler));
        toHide.push(Game.addSoundIcon(1335, 385, 200, 200, 'fish5', 'Okoun\nříční', 
            subtitles.fishes.fish5, slides.fishes.fish5, hideHandler, showHandler));
        toHide.push(Game.addSoundIcon(1575, 385, 200, 200, 'fish6', 'Sumec\nvelký', 
            subtitles.fishes.fish6, slides.fishes.fish6, hideHandler, showHandler));
        toHide.push(Game.addRentgenIcon(835, 810, 200, 200, 'fish_bone', 'fish_bone_mask', 'Kostra\nryby', 
            hideHandler, showHandler));
        toHide.push(Game.addSimpleIcon(1085, 810, 200, 200, 'fish_fins', 'Ploutve\nryby', 
            hideHandler, showHandler));

        Game.buildHUD([Game.HUD.BACK], 0, 0);
        
        toHide.push(Game.backButton);
    },
    
    this.render = function() {
        //Game.debugInfo(32, 32);
    }
};
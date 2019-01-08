var BirdsState = new function() {
    var assets = {
        Backgrounds: [{
            path: 'assets/images/backgrounds/pond.jpg',
            name: 'pond'
        }],
        NavPoints: [{
            path: 'assets/images/sprites/heron.png',
            name: 'heron'
        }, {
            path: 'assets/images/sprites/dragonfly.png',
            name: 'dragonfly'
        }],
        Birds: [{
            path: 'assets/images/sprites/bird1.png',
            name: 'bird1'
        }, {
            path: 'assets/images/sprites/bird2.png',
            name: 'bird2'
        }, {
            path: 'assets/images/sprites/bird3.png',
            name: 'bird3'
        }, {
            path: 'assets/images/sprites/bird4.png',
            name: 'bird4'
        }, {
            path: 'assets/images/sprites/bird5.png',
            name: 'bird5'
        }],
        BirdsParts: [{
            path: 'assets/images/sprites/bird1_hunting.png',
            name: 'bird1_hunting'
        }, {
            path: 'assets/images/sprites/bird1_innature.png',
            name: 'bird1_innature'
        },{
            path: 'assets/images/sprites/bird1_inwater.png',
            name: 'bird1_inwater'
        },{
            path: 'assets/images/sprites/bird1_nesting.png',
            name: 'bird1_nesting'
        },{
            path: 'assets/images/sprites/bird1_wingspan.png',
            name: 'bird1_wingspan'
        },{
            path: 'assets/images/sprites/bird2_innature.png',
            name: 'bird2_innature'
        },{
            path: 'assets/images/sprites/bird2_nesting.png',
            name: 'bird2_nesting'
        },{
            path: 'assets/images/sprites/bird2_withbrood.png',
            name: 'bird2_withbrood'
        }, {
            path: 'assets/images/sprites/bird3_feeding.png',
            name: 'bird3_feeding'
        }, {
            path: 'assets/images/sprites/bird3_flock.png',
            name: 'bird3_flock'
        }, {
            path: 'assets/images/sprites/bird3_inwater.png',
            name: 'bird3_inwater'
        }, {
            path: 'assets/images/sprites/bird3_malefemale.png',
            name: 'bird3_malefemale'
        }, {
            path: 'assets/images/sprites/bird4_brood.png',
            name: 'bird4_brood'
        }, {
            path: 'assets/images/sprites/bird4_feeding.png',
            name: 'bird4_feeding'
        }, {
            path: 'assets/images/sprites/bird4_nest.png',
            name: 'bird4_nest'
        }, {
            path: 'assets/images/sprites/bird4_pair.png',
            name: 'bird4_pair'
        }, {
            path: 'assets/images/sprites/bird4_peoplefeeding.png',
            name: 'bird4_peoplefeeding'
        }, {
            path: 'assets/images/sprites/bird5_diving.png',
            name: 'bird5_diving'
        }, {
            path: 'assets/images/sprites/bird5_feeding.png',
            name: 'bird5_feeding'
        }, {
            path: 'assets/images/sprites/bird5_feet.png',
            name: 'bird5_feet'
        }, {
            path: 'assets/images/sprites/bird5_ontree.png',
            name: 'bird5_ontree'
        }],
        BirdsAudio: [{
            path: 'assets/sound/descriptions/bird1.ogg',
            name: 'bird1'
        }, {
            path: 'assets/sound/descriptions/bird2.ogg',
            name: 'bird2'
        }, {
            path: 'assets/sound/descriptions/bird3.ogg',
            name: 'bird3'
        }, {
            path: 'assets/sound/descriptions/bird4.ogg',
            name: 'bird4'
        }, {
            path: 'assets/sound/descriptions/bird5.ogg',
            name: 'bird5'
        }]
    };

    var cursorKeys;

    this.preload = function() {
            var pre = Game.addText(960, 600, 'Nacitam', 70);
            pre.fill = 0xFFFFFF;
            pre.anchor.set(0.5);

            Game.loadGenericAssets();
            Game.loadAssets(assets.Backgrounds, Game.AssetType.Sprite);
            Game.loadAssets(assets.NavPoints, Game.AssetType.Sprite);
            Game.loadAssets(assets.Birds, Game.AssetType.Sprite);
            Game.loadAssets(assets.BirdsParts, Game.AssetType.Sprite);
            Game.loadAssets(assets.BirdsAudio, Game.AssetType.Audio);
        },

        this.create = function() {
            Game.scaleMode(Phaser.ScaleManager.EXACT_FIT);
            Game.createGenericAssets();
            var background = Game.addSprite(0, 0, 'pond', Game.BASE_WIDTH, Game.BASE_HEIGHT);
            Game.makeGray(background);

            var heron = Game.addPondEntity(1614, 1222, 'heron', 'birds', false, false);
            var dragonfly = Game.addPondEntity(2801, 1763, 'dragonfly', 'insects', false, false);

            var headline = Game.addText(1500 + Game.center().x, 858, 'Ptáci u rybníku', 80);
            //headline.fill = 'white';
            headline.alpha = 0.7;
            //cursorKeys = Game.cursorKeys();

            Game.worldBounds(0, 0, Game.BASE_WIDTH, Game.BASE_HEIGHT);
            Game.camera(1500, 768);

            var hugo = Game.addHugo(2088, 1096, 200, 305, false, 0.5);
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

            var toHide = [];
            toHide.push(Game.addSoundIcon(1500 + 460, 768 + 610, 200, 200, 'bird1', 'Volavka\npopelavá',
                subtitles.birds.bird1, slides.birds.bird1, hideHandler, showHandler));
            toHide.push(Game.addSoundIcon(1500 + 710, 768 + 610, 200, 200, 'bird2', 'Potápka\nroháč',
                subtitles.birds.bird2, slides.birds.bird2, hideHandler, showHandler));
            toHide.push(Game.addSoundIcon(1500 + 960, 768 + 610, 200, 200, 'bird3', 'Kachna\ndivoká',
                subtitles.birds.bird3, slides.birds.bird3, hideHandler, showHandler));
            toHide.push(Game.addSoundIcon(1500 + 1210, 768 + 610, 200, 200, 'bird4', 'Labuť\nvelká',
                subtitles.birds.bird4, slides.birds.bird4, hideHandler, showHandler));
            toHide.push(Game.addSoundIcon(1500 + 1460, 768 + 610, 200, 200, 'bird5', 'Kormorán\nvelký',
                subtitles.birds.bird5, slides.birds.bird5, hideHandler, showHandler));


            Game.buildHUD([Game.HUD.BACK], 1500, 768);
            
            Game.backButton.tint = 0x000000;

            toHide.push(Game.backButton);
        },
        /*
        this.update = function() {
            if (cursorKeys.up.isDown)
            {
                Game.camera().y -= 4;
            }
            else if (cursorKeys.down.isDown)
            {
                Game.camera().y += 4;
            }
    
            if (cursorKeys.left.isDown)
            {
                Game.camera().x -= 4;
            }
            else if (cursorKeys.right.isDown)
            {
                Game.camera().x += 4;
            }
        }
        */
        this.render = function() {
            //Game.debugInfo(32, 32);
        }
};
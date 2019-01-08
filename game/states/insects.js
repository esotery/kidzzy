var InsectsState = new function() {
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
        Insects: [{
            path: 'assets/images/sprites/insect1.png',
            name: 'insect1'
        }, {
            path: 'assets/images/sprites/insect2.png',
            name: 'insect2'
        }, {
            path: 'assets/images/sprites/insect3.png',
            name: 'insect3'
        }, {
            path: 'assets/images/sprites/insect4.png',
            name: 'insect4'
        }],
        InsectsParts: [{
            path: 'assets/images/sprites/insect1_climbing_adult.png',
            name: 'insect1_climbing_adult'
        }, {
            path: 'assets/images/sprites/insect1_eggs.png',
            name: 'insect1_eggs'
        }, {
            path: 'assets/images/sprites/insect1_eye.png',
            name: 'insect1_eye'
        }, {
            path: 'assets/images/sprites/insect1_female_male.png',
            name: 'insect1_female_male'
        }, {
            path: 'assets/images/sprites/insect1_larva.png',
            name: 'insect1_larva'
        }, {
            path: 'assets/images/sprites/insect2_female_male.png',
            name: 'insect2_female_male'
        }, {
            path: 'assets/images/sprites/insect2_larva.png',
            name: 'insect2_larva'
        }, {
            path: 'assets/images/sprites/insect3_clapping.png',
            name: 'insect3_clapping'
        }, {
            path: 'assets/images/sprites/insect3_eggs.png',
            name: 'insect3_eggs'
        }, {
            path: 'assets/images/sprites/insect3_larva.png',
            name: 'insect3_larva'
        }, {
            path: 'assets/images/sprites/insect3_sucker.png',
            name: 'insect3_sucker'
        }, {
            path: 'assets/images/sprites/insect4_legs.png',
            name: 'insect4_legs'
        }, {
            path: 'assets/images/sprites/insect4_water.png',
            name: 'insect4_water'
        }],
        InsectsAudio: [{
            path: 'assets/sound/descriptions/insect1.ogg',
            name: 'insect1'
        }, {
            path: 'assets/sound/descriptions/insect2.ogg',
            name: 'insect2'
        }, {
            path: 'assets/sound/descriptions/insect3.ogg',
            name: 'insect3'
        }, {
            path: 'assets/sound/descriptions/insect4.ogg',
            name: 'insect4'
        }]
    };

    var cursorKeys;

    this.preload = function() {
            Game.loadGenericAssets();
            Game.loadAssets(assets.Backgrounds, Game.AssetType.Sprite);
            Game.loadAssets(assets.NavPoints, Game.AssetType.Sprite);
            Game.loadAssets(assets.Insects, Game.AssetType.Sprite);
            Game.loadAssets(assets.InsectsParts, Game.AssetType.Sprite);
            Game.loadAssets(assets.InsectsAudio, Game.AssetType.Audio);
        },

        this.create = function() {
            Game.scaleMode(Phaser.ScaleManager.EXACT_FIT);
            Game.createGenericAssets();
            var background = Game.addSprite(0, 0, 'pond', Game.BASE_WIDTH, Game.BASE_HEIGHT);
            Game.makeGray(background);

            var heron = Game.addPondEntity(1614, 1222, 'heron', 'birds', false, false);
            var dragonfly = Game.addPondEntity(2801, 1763, 'dragonfly', 'insects', false, false);

            var headline = Game.addText(1500 + Game.center().x, 858, 'Hmyz u rybníku', 80);
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
            toHide.push(Game.addSoundIcon(1500 + 560, 768 + 610, 200, 200, 'insect1', 'Vážka\nploská',
                subtitles.insects.insect1, slides.insects.insect1, hideHandler, showHandler));
            toHide.push(Game.addSoundIcon(1500 + 810, 768 + 610, 200, 200, 'insect2', 'Potápník\nvroubený',
                subtitles.insects.insect2, slides.insects.insect2, hideHandler, showHandler));
            toHide.push(Game.addSoundIcon(1500 + 1060, 768 + 610, 200, 200, 'insect3', 'Komár\npisklavý',
                subtitles.insects.insect3, slides.insects.insect3, hideHandler, showHandler));
            toHide.push(Game.addSoundIcon(1500 + 1310, 768 + 610, 200, 200, 'insect4', 'Bruslařka\nobecná',
                subtitles.insects.insect4, slides.insects.insect4, hideHandler, showHandler));

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
            //Game.debugInfo(1500 + 32, 768 + 32);
        }
};
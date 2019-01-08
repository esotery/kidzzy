var SnailsState = new function() {
    var assets = {
        Backgrounds: [{
            path: 'assets/images/backgrounds/pond.jpg',
            name: 'pond'
        }],
        NavPoints: [{
            path: 'assets/images/sprites/karp.png',
            name: 'karp'
        }, {
            path: 'assets/images/sprites/willow.png',
            name: 'willow'
        }],
        Snails: [{
            path: 'assets/images/sprites/snail1.png',
            name: 'snail1'
        }, {
            path: 'assets/images/sprites/snail2.png',
            name: 'snail2'
        }, {
            path: 'assets/images/sprites/snail3.png',
            name: 'snail3'
        }],
        SnailsParts: [{
            path: 'assets/images/sprites/snail1_leaf.png',
            name: 'snail1_leaf'
        },{
            path: 'assets/images/sprites/snail1_conch.png',
            name: 'snail1_conch'
        }, {
            path: 'assets/images/sprites/snail2_leaf.png',
            name: 'snail2_leaf'
        }, {
            path: 'assets/images/sprites/snail2_conch.png',
            name: 'snail2_conch'
        }, {
            path: 'assets/images/sprites/snail3_anatomy.png',
            name: 'snail3_anatomy'
        }, {
            path: 'assets/images/sprites/snail3_evolution.png',
            name: 'snail3_evolution'
        }, {
            path: 'assets/images/sprites/snail3_inunderwater.png',
            name: 'snail3_inunderwater'
        }, {
            path: 'assets/images/sprites/snail3_larva.png',
            name: 'snail3_larva'
        }],
        SnailsAudio: [{
            path: 'assets/sound/descriptions/snail1.ogg',
            name: 'snail1'
        }, {
            path: 'assets/sound/descriptions/snail2.ogg',
            name: 'snail2'
        }, {
            path: 'assets/sound/descriptions/snail3.ogg',
            name: 'snail3'
        }]
    };

    var cursorKeys;

    this.preload = function() {
            Game.loadGenericAssets();
            Game.loadAssets(assets.Backgrounds, Game.AssetType.Sprite);
            Game.loadAssets(assets.NavPoints, Game.AssetType.Sprite);
            Game.loadAssets(assets.Snails, Game.AssetType.Sprite);
            Game.loadAssets(assets.SnailsParts, Game.AssetType.Sprite);
            Game.loadAssets(assets.SnailsAudio, Game.AssetType.Audio);
        },

        this.create = function() {
            Game.scaleMode(Phaser.ScaleManager.EXACT_FIT);
            Game.createGenericAssets();
            var background = Game.addSprite(0, 0, 'pond', Game.BASE_WIDTH, Game.BASE_HEIGHT);
            Game.makeGray(background);

            //var heron = Game.addPondEntity(1614, 1222, 'heron', 'snails', false, false);
            //var dragonfly = Game.addPondEntity(2801, 1763, 'dragonfly', 'insects', false, false);

            var headline = Game.addText(1680 + Game.center().x, 474, 'Plži, mlži', 80);
            //headline.fill = 'white';
            headline.alpha = 0.7;
            //cursorKeys = Game.cursorKeys();

            Game.worldBounds(0, 0, Game.BASE_WIDTH, Game.BASE_HEIGHT);
            Game.camera(1680, 384);

            var hugo = Game.addHugo(2000, 680, 200, 305, false, 0.5);
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
            toHide.push(Game.addSoundIcon(1680 + 710, 384 + 610, 200, 200, 'snail1', 'Okružák\nploský',
                subtitles.snails.snail1, slides.snails.snail1, hideHandler, showHandler));
            toHide.push(Game.addSoundIcon(1680 + 960, 384 + 610, 200, 200, 'snail2', 'Bahenka\nživorodá',
                subtitles.snails.snail2, slides.snails.snail2, hideHandler, showHandler));
            toHide.push(Game.addSoundIcon(1680 + 1210, 384 + 610, 200, 200, 'snail3', 'Škeble\nrybničná',
                subtitles.snails.snail3, slides.snails.snail3, hideHandler, showHandler));
            
            for (var i = 0; i < toHide.length; ++i) {
                if (toHide[i]["_subtitle"] != undefined) {
                    toHide[i]["_subtitle"].fill = 'black';
                }
            }
            
            Game.buildHUD([Game.HUD.BACK], 1680, 384);

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
            //Game.debugInfo(1680 + 32, 384 + 32);
        }
};
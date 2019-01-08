var AmphbiansState = new function() {
    var assets = {
        Backgrounds: [{
            path: 'assets/images/backgrounds/pond_underwater.jpg',
            name: 'pond_underwater'
        }],
        Gregor: [{
            path: 'assets/images/sprites/gregor.png',
            name: 'gregor'
        }, {
            path: 'assets/images/sprites/gregor_mouth.png',
            name: 'gregor_mouth'
        }],
        Amphs: [{
            path: 'assets/images/sprites/amph1.png',
            name: 'amph1'
        }, {
            path: 'assets/images/sprites/amph2.png',
            name: 'amph2'
        }, {
            path: 'assets/images/sprites/amph3.png',
            name: 'amph3'
        }, {
            path: 'assets/images/sprites/amph4.png',
            name: 'amph4'
        }, {
            path: 'assets/images/sprites/amph5.png',
            name: 'amph5'
        }, {
            path: 'assets/images/sprites/amph6.png',
            name: 'amph6'
        }, {
            path: 'assets/images/sprites/amph7.png',
            name: 'amph7'
        }, {
            path: 'assets/images/sprites/frogevo.png',
            name: 'frogevo'
        }],
        AmphsParts: [{
            path: 'assets/images/sprites/amph1_nature.png',
            name: 'amph1_nature'
        }, {
            path: 'assets/images/sprites/amph2_eggs.png',
            name: 'amph2_eggs'
        }, {
            path: 'assets/images/sprites/amph2_nature.png',
            name: 'amph2_nature'
        }, {
            path: 'assets/images/sprites/amph3_leaf.png',
            name: 'amph3_leaf'
        }, {
            path: 'assets/images/sprites/amph3_leg.png',
            name: 'amph3_leg'
        }, {
            path: 'assets/images/sprites/amph3_stick.png',
            name: 'amph3_stick'
        }, {
            path: 'assets/images/sprites/amph3_throat.png',
            name: 'amph3_throat'
        }, {
            path: 'assets/images/sprites/amph3_tree.png',
            name: 'amph3_tree'
        }, {
            path: 'assets/images/sprites/amph4_eggs.png',
            name: 'amph4_eggs'
        }, {
            path: 'assets/images/sprites/amph4_legs.png',
            name: 'amph4_legs'
        }, {
            path: 'assets/images/sprites/amph4_tadpole_wlegs.png',
            name: 'amph4_tadpole_wlegs'
        }, {
            path: 'assets/images/sprites/amph4_tadpole_wolegs.png',
            name: 'amph4_tadpole_wolegs'
        }, {
            path: 'assets/images/sprites/amph4_nature.png',
            name: 'amph4_nature'
        }, {
            path: 'assets/images/sprites/amph5_eggs.png',
            name: 'amph5_eggs'
        }, {
            path: 'assets/images/sprites/amph5_nature.png',
            name: 'amph5_nature'
        }, {
            path: 'assets/images/sprites/amph6_baby.png',
            name: 'amph6_baby'
        }, {
            path: 'assets/images/sprites/amph6_eggs.png',
            name: 'amph6_eggs'
        }, {
            path: 'assets/images/sprites/amph6_head.png',
            name: 'amph6_head'
        }, {
            path: 'assets/images/sprites/amph6_nature.png',
            name: 'amph6_nature'
        }, {
            path: 'assets/images/sprites/amph6_skin.png',
            name: 'amph6_skin'
        }, {
            path: 'assets/images/sprites/amph7_eggs.png',
            name: 'amph7_eggs'
        }, {
            path: 'assets/images/sprites/amph7_larva.png',
            name: 'amph7_larva'
        }, {
            path: 'assets/images/sprites/amph7_underwater.png',
            name: 'amph7_underwater'
        }],
        Evo: [{
            path: 'assets/images/sprites/fevo1.jpg',
            name: 'fevo1'
        }, {
            path: 'assets/images/sprites/fevo2.jpg',
            name: 'fevo2'
        }, {
            path: 'assets/images/sprites/fevo3.jpg',
            name: 'fevo3'
        }, {
            path: 'assets/images/sprites/fevo4.jpg',
            name: 'fevo4'
        }, {
            path: 'assets/images/sprites/fevo5.jpg',
            name: 'fevo5'
        }, {
            path: 'assets/images/sprites/fevo6.jpg',
            name: 'fevo6'
        }, {
            path: 'assets/images/sprites/fevo7.jpg',
            name: 'fevo7'
        }, {
            path: 'assets/images/sprites/fevo8.jpg',
            name: 'fevo8'
        }, {
            path: 'assets/images/sprites/fevo9.jpg',
            name: 'fevo9'
        }, {
            path: 'assets/images/sprites/fevog1.jpg',
            name: 'fevog1'
        }, {
            path: 'assets/images/sprites/fevog2.jpg',
            name: 'fevog2'
        }, {
            path: 'assets/images/sprites/fevobck.png',
            name: 'fevobck'
        }],
        AmphsAudio: [{
            path: 'assets/sound/descriptions/amph1.ogg',
            name: 'amph1'
        }, {
            path: 'assets/sound/descriptions/amph2.ogg',
            name: 'amph2'
        }, {
            path: 'assets/sound/descriptions/amph3.ogg',
            name: 'amph3'
        }, {
            path: 'assets/sound/descriptions/amph4.ogg',
            name: 'amph4'
        }, {
            path: 'assets/sound/descriptions/amph5.ogg',
            name: 'amph5'
        }, {
            path: 'assets/sound/descriptions/amph6.ogg',
            name: 'amph6'
        }, {
            path: 'assets/sound/descriptions/amph7.ogg',
            name: 'amph7'
        }]
    };

    this.preload = function() {
            Game.loadGenericAssets();
            Game.loadAssets(assets.Backgrounds, Game.AssetType.Sprite);
            Game.loadAssets(assets.Gregor, Game.AssetType.Sprite);
            Game.loadAssets(assets.Amphs, Game.AssetType.Sprite);
            Game.loadAssets(assets.AmphsParts, Game.AssetType.Sprite);
            Game.loadAssets(assets.Evo, Game.AssetType.Sprite);
            Game.loadAssets(assets.AmphsAudio, Game.AssetType.Audio);
        },

        this.create = function() {
            Game.scaleMode(Phaser.ScaleManager.EXACT_FIT);
            Game.createGenericAssets();
            var background = Game.addSprite(0, 0, 'pond_underwater', Game.WIDTH, Game.HEIGHT);

            var headline = Game.addText(Game.center().x, 80, 'Obojživelníci', 80);
            //headline.fill = 'white';
            headline.alpha = 0.7;

            var toHide = [];
            var pexesoGame = Game.addText(Game.center().x, 1100, 'Pexeso!', 60);
            pexesoGame.inputEnabled = true;
            pexesoGame.input.useHandCursor = true;
            pexesoGame.events.onInputOver.add(function() {
                pexesoGame.fontSize = 80;
            }, this);
            pexesoGame.events.onInputOut.add(function() {
                pexesoGame.fontSize = 60;
            }, this);
            pexesoGame.events.onInputDown.add(function() {
                Game.nextState('game');
            }, this);
            toHide.push(pexesoGame);

            var hugo = Game.addHugo(150, 700, 200, 305, false, 0);
            hugo.addScuba();
            hugo.visible = false;

            var gregor = Game.addGregor(150, 600, 300, 303);
            gregor.visible = false;

            function hideHandler(soundIcon) {
                if (soundIcon._name == 'amph7') {
                    gregor.visible = true;
                    gregor.speak();
                }
                else {
                    hugo.visible = true;
                    hugo.speak();
                }
                for (var i = 0; i < toHide.length; ++i) {
                    if (soundIcon != toHide[i]) toHide[i].visible = false;
                }
            }

            function showHandler(soundIcon) {
                hugo.visible = false;
                hugo.shutup();
                
                gregor.visible = false;
                gregor.shutup();

                for (var i = 0; i < toHide.length; ++i) {
                    if (soundIcon != toHide[i]) toHide[i].visible = true;
                }
            }

            toHide.push(Game.addSoundIcon(210, 385, 200, 200, 'amph6', 'Užovka\nobojková',
                subtitles.amphs.amph6, slides.amphs.amph6, hideHandler, showHandler));
            toHide.push(Game.addSoundIcon(460, 385, 200, 200, 'amph1', 'Mlok\nskvrnitý',
                subtitles.amphs.amph1, slides.amphs.amph1, hideHandler, showHandler));
            toHide.push(Game.addSoundIcon(710, 385, 200, 200, 'amph2', 'Ropucha\nobecná',
                subtitles.amphs.amph2, slides.amphs.amph2, hideHandler, showHandler));
            toHide.push(Game.addSoundIcon(960, 385, 200, 200, 'amph3', 'Rosnička\nzelená',
                subtitles.amphs.amph3, slides.amphs.amph3, hideHandler, showHandler));
            toHide.push(Game.addSoundIcon(1210, 385, 200, 200, 'amph4', 'Skokan\nhnědý',
                subtitles.amphs.amph4, slides.amphs.amph4, hideHandler, showHandler));
            toHide.push(Game.addSoundIcon(1460, 385, 200, 200, 'amph5', 'Skokan\nzelený',
                subtitles.amphs.amph5, slides.amphs.amph5, hideHandler, showHandler));
            toHide.push(Game.addSoundIcon(1710, 385, 200, 200, 'amph7', 'Čolek\nobecný',
                subtitles.amphs.amph7, slides.amphs.amph7, hideHandler, showHandler));
            toHide.push(Game.addEvoIcon(960, 810, 200, 200, 'frogevo', 'fevobck', 'Vývoj\nžáby',
                subtitles.frogevo, slides.frogevo, hideHandler, showHandler));

            Game.buildHUD([Game.HUD.BACK], 0, 0);

            toHide.push(Game.backButton);
        },

        this.render = function() {
            //Game.debugInfo(32, 32);
        }
};
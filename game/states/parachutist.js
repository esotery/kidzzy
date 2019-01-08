var ParachutistState = new function() {
    var assets = {
        Backgrounds: [{
            path: 'assets/images/backgrounds/pond.jpg',
            name: 'pond'
        }],
        NavPoints: [{
            path: 'assets/images/sprites/frog.png',
            name: 'frog'
        }, {
            path: 'assets/images/sprites/karp.png',
            name: 'karp'
        }, {
            path: 'assets/images/sprites/waterlilly.png',
            name: 'waterlilly'
        }, {
            path: 'assets/images/sprites/willow.png',
            name: 'willow'
        }],
        Parachutist: [{
            path: 'assets/images/sprites/parachute-c.png',
            name: 'parachute'
        }, {
            path: 'assets/images/sprites/parachutist-body.png',
            name: 'parachutist-body'
        }, {
            path: 'assets/images/sprites/parachutist-head1.png',
            name: 'parachutist-head1'
        }, {
            path: 'assets/images/sprites/parachutist-head2.png',
            name: 'parachutist-head2'
        }, {
            path: 'assets/images/sprites/parachutist-head3.png',
            name: 'parachutist-head3'
        }, {
            path: 'assets/images/sprites/parachutist-head4.png',
            name: 'parachutist-head4'
        }]
    };

    var cursorKeys;

    this.preload = function() {
            Game.loadGenericAssets();
            Game.loadAssets(assets.Backgrounds, Game.AssetType.Sprite);
            Game.loadAssets(assets.NavPoints, Game.AssetType.Sprite);
            Game.loadAssets(assets.Parachutist, Game.AssetType.Sprite);
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

            var headline = Game.addText(Game.center().x, 536, 'Zachraňte parašutistu', 80);
            headline.fill = 'white';
            headline.alpha = 0.7;
            //cursorKeys = Game.cursorKeys();

            var lock = false;

            var hugo = Game.addHugo(150, 700, 200, 305, false, 0.5);

            Game.worldBounds(0, 0, Game.BASE_WIDTH, Game.BASE_HEIGHT);
            Game.camera(0, 456);

            var options = [{
                t: 'Leknín bílý',
                _t: 'Leknin bily'
            }, {
                t: 'Bublinatka obecná',
                _t: 'Bublinatka obecna'
            }, {
                t: 'Stulík žlutý',
                _t: 'Stulik zluty'
            }, {
                t: 'Kotvice plovoucí',
                _t: 'Kotvice plovouci'
            }, {
                t: 'Okřehek menší',
                _t: 'Okrehek mensi'
            }];

            var start = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
            var index = start;

            function generateNext(index) {

                var parachutist = Game.addParachutist(1300, 600, background, 'parachute', 'parachutist-body', 'parachutist-head');

                var placeholder = Game.addTextPlaceholder(960, 900 + 456, options[index].t);
                placeholder.x -= placeholder.width / 2;
                var separatedText = Game.addSeparatedText(placeholder.x + 25, 880 + 456, options[index].t, options[index]._t);

                var alphabet = Game.addAlphabet(50, 1100 + 456, function(l, c) {
                    if (!lock) {
                        if (separatedText.contains(c)) {
                            separatedText.revail(c);
                            if (separatedText.isComplete()) {
                                separatedText.makeComplete();
                                setTimeout(function() {
                                    ++index;
                                    if (index > 4) {
                                        index = 0;
                                    }
                                    if (index != start) {
                                        parachutist.kill();
                                        placeholder.kill();
                                        separatedText.kill();
                                        alphabet.kill();
                                        generateNext(index);
                                    }
                                    else {
                                        Game.nextState('done');
                                    }
                                }, 600);
                            }
                        }
                        else {
                            l.fill = 'red';
                            l.inputEnabled = false;
                            parachutist.looseRope();
                            if (parachutist._ropesCount <= 0) {
                                lock = true;
                                setTimeout(function() {
                                    
                                    Game.nextState('back');
                                }, 600);
                            }
                        }
                    }
                });
            }

            generateNext(start);

            Game.buildHUD([Game.HUD.BACK], 0, 456);
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
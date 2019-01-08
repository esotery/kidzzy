var CatchFishState = new function() {
    var assets = {
        Backgrounds: [{
            path: 'assets/images/backgrounds/pond.jpg',
            name: 'pond'
        }],
        NavPoints: [{
            path: 'assets/images/sprites/dragonfly.png',
            name: 'dragonfly'
        }, {
            path: 'assets/images/sprites/frog.png',
            name: 'frog'
        }, {
            path: 'assets/images/sprites/heron.png',
            name: 'heron'
        }, {
            path: 'assets/images/sprites/karp.png',
            name: 'karp'
        }, {
            path: 'assets/images/sprites/waterlilly.png',
            name: 'waterlilly'
        }, {
            path: 'assets/images/sprites/willow.png',
            name: 'willow'
        }, {
            path: 'assets/images/sprites/fisherman.png',
            name: 'fisherman'
        }, {
            path: 'assets/images/sprites/buoy.png',
            name: 'buoy'
        }, {
            path: 'assets/images/sprites/riples.png',
            name: 'riples'
        }],
        Fishes: [{
            path: 'assets/images/sprites/pike.png',
            name: 'pike'
        }, {
            path: 'assets/images/sprites/shoe.png',
            name: 'shoe'
        }, {
            path: 'assets/images/sprites/karpi.png',
            name: 'karpi'
        }, {
            path: 'assets/images/sprites/tire.png',
            name: 'tire'
        }, {
            path: 'assets/images/sprites/bream.png',
            name: 'bream'
        }, {
            path: 'assets/images/sprites/undies.png',
            name: 'undies'
        }, {
            path: 'assets/images/sprites/crucian.png',
            name: 'crucian'
        }, {
            path: 'assets/images/sprites/duckie.png',
            name: 'duckie'
        }, {
            path: 'assets/images/sprites/bass.png',
            name: 'bass'
        }, {
            path: 'assets/images/sprites/catfish.png',
            name: 'catfish'
        }]
    };

    this.preload = function() {
            Game.loadGenericAssets();
            Game.loadAssets(assets.Backgrounds, Game.AssetType.Sprite);
            Game.loadAssets(assets.NavPoints, Game.AssetType.Sprite);
            Game.loadAssets(assets.Fishes, Game.AssetType.Sprite);
        },

        this.create = function() {
            Game.scaleMode(Phaser.ScaleManager.EXACT_FIT);
            Game.createGenericAssets();
            var background = Game.addSprite(0, 0, 'pond', Game.WIDTH, Game.HEIGHT);

            var stopShake = false;

            var fishesToCatch = ['pike', 'shoe', 'karpi', 'tire', 'bream', 'undies', 'crucian', 'duckie', 'bass', 'catfish'];
            var fishesMapping = {
                pike: 'Štika obecná',
                karpi: 'Kapr obecný',
                bream: 'Cejn velký',
                crucian: 'Karas obecný',
                bass: 'Okoun říční',
                catfish: 'Sumec velký'
            };
            var baits = ['shoe', 'tire', 'undies', 'duckie'];

            var fish = Game.addSprite(600, 855, 'pike', 0, 0);
            fish.visible = false;
            fish.anchor.set(0.5);
            var next = 0;

            function generatePosibilities(right) {
                var choice = Game.addChoice(Game.center().x, Game.center().y + 200, "Co vidíte na obrázku?", 70, ['Kapr obecný', 'Cejn velký', 'Karas obecný', 'Okoun říční', 'Štika obecná', 'Sumec velký'], right, 60, function() {
                    choice.killAll();
                    fishesToCatch.splice(next, 1);
                    putToBasket();
                }, function() {
                    choice.killAll();
                    returnFish();
                });
            }

            function returnFish() {
                Game.Effects.moveTo(fish, 500, 600, 855, function() {});
                Game.Effects.scaleTo(fish, 500, 0, 0, function() {
                    fish.visible = false;
                    stopShake = false;
                    shakeBuoy();
                });
            }
            
            function putToBasket() {
                Game.Effects.moveTo(fish, 500, 1700, 680, function() {});
                Game.Effects.scaleTo(fish, 500, 0, 0, function() {
                    fish.visible = false;
                    stopShake = false;
                    shakeBuoy();
                });
                
                if (fishesToCatch.length == 4)
                {
                    Game.nextState('done');
                }
            }

            function generateNext() {
                stopShake = true;
                next = Math.floor(Math.random() * ((fishesToCatch.length - 1) - 0 + 1)) + 0;

                fish.visible = true;
                fish.loadTexture(fishesToCatch[next]);
                fish.x = 600;
                fish.y = 855;
                fish.width = 0;
                fish.height = 0;

                Game.Effects.moveTo(fish, 500, Game.center().x, Game.center().y - 100, function() {});
                Game.Effects.scaleTo(fish, 500, 400, 400, function() {
                    if (baits.indexOf(fishesToCatch[next]) != -1) {
                        setTimeout(function() {
                            returnFish();
                        }, 2000);
                    }
                    else {
                        generatePosibilities(fishesMapping[fishesToCatch[next]]);
                    }
                });
            }

            var hugo = Game.addHugo(1300, 680, 40, 65, false, 0.5);

            var dragonfly = Game.addPondEntity(1494, 1102, 'dragonfly', 'insects');
            dragonfly.inputEnabled = false;
            var frog = Game.addPondEntity(325, 883, 'frog', 'amphbians');
            frog.inputEnabled = false;
            var heron = Game.addPondEntity(861, 764, 'heron', 'birds');
            heron.inputEnabled = false;
            var karp = Game.addPondEntity(565, 710, 'karp', 'fishes');
            karp.inputEnabled = false;
            var waterlilly = Game.addPondEntity(338, 799, 'waterlilly', 'waterPlants');
            waterlilly.inputEnabled = false;
            var willow = Game.addPondEntity(0, 0, 'willow', 'plants');
            willow.inputEnabled = false;

            var fisherman = Game.addSprite(1350, 200, 'fisherman', 518, 557);

            var riples = Game.addSprite(600, 883, 'riples');
            riples.anchor.set(0.5);
            var buoy = Game.addSprite(600, 855, 'buoy');
            buoy.anchor.set(0.5);
            buoy.inputEnabled = true;
            buoy.input.useHandCursor = true;
            buoy.events.onInputDown.add(function() {
                if (!stopShake) {
                    generateNext()
                }
            }, this);

            var fishingline = Game.addLine(1368, 214, 605, 837, 2);

            var headline = Game.addText(Game.center().x, 80, 'Pochytejte ryby', 80);
            headline.fill = 'black';
            headline.alpha = 0.7;

            function shakeBuoy() {
                if (!stopShake) {
                    setTimeout(function() {
                        Game.Effects.shake(buoy, shakeBuoy);
                    }, 1000);
                }
            }

            shakeBuoy();
            fish.bringToTop();
            Game.buildHUD([Game.HUD.BACK]);
        },

        this.render = function() {
            //Game.debugInfo(32, 32);
        }
};
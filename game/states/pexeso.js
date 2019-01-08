var PexesoState = new function() {
    var assets = {
        Backgrounds: [{
            path: 'assets/images/backgrounds/pond_underwater.jpg',
            name: 'pond_underwater'
        }],
        PexesoPieces: [{
            path: 'assets/images/sprites/pexeso1.jpg',
            name: 'pexeso1'
        }, {
            path: 'assets/images/sprites/pexeso2.jpg',
            name: 'pexeso2'
        }, {
            path: 'assets/images/sprites/pexeso3.jpg',
            name: 'pexeso3'
        }, {
            path: 'assets/images/sprites/pexeso4.jpg',
            name: 'pexeso4'
        }, {
            path: 'assets/images/sprites/pexeso5.jpg',
            name: 'pexeso5'
        }, {
            path: 'assets/images/sprites/pexeso6.jpg',
            name: 'pexeso6'
        }, {
            path: 'assets/images/sprites/pexeso7.jpg',
            name: 'pexeso7'
        }, {
            path: 'assets/images/sprites/pexeso8.jpg',
            name: 'pexeso8'
        }, {
            path: 'assets/images/sprites/pexeso9.jpg',
            name: 'pexeso9'
        }, {
            path: 'assets/images/sprites/pexeso_blank.png',
            name: 'pexeso_blank'
        }]
    };

    this.preload = function() {
            Game.loadGenericAssets();
            Game.loadAssets(assets.Backgrounds, Game.AssetType.Sprite);
            Game.loadAssets(assets.PexesoPieces, Game.AssetType.Sprite);
        },

        this.create = function() {
            Game.scaleMode(Phaser.ScaleManager.EXACT_FIT);
            Game.createGenericAssets();
            var background = Game.addSprite(0, 0, 'pond_underwater', Game.WIDTH, Game.HEIGHT);

            var headline = Game.addText(Game.center().x, 80, 'Pexeso', 80);
            //headline.fill = 'white';
            headline.alpha = 0.7;

            var mappings = [{
                image: 'pexeso1',
                text: 'Čolek'
            }, {
                image: 'pexeso2',
                text: 'Mlok'
            }, {
                image: 'pexeso3',
                text: 'Ropucha'
            }, {
                image: 'pexeso4',
                text: 'Rosnička\nzelená'
            }, {
                image: 'pexeso5',
                text: 'Skokan\nhnědý'
            }, {
                image: 'pexeso6',
                text: 'Skokan\nzelený'
            }, {
                image: 'pexeso7',
                text: 'Užovka'
            }, {
                image: 'pexeso8',
                text: 'Pulec'
            }, {
                image: 'pexeso9',
                text: 'Pulec\nse všemi\nkončetinami'
            }, {
                image: 'smiley',
                text: '☺'
            }];
            
            var pexeso = Game.addPexeso(Game.center().x - 400, Game.center().y - 300, mappings, 'pexeso_blank', null)

            Game.buildHUD([Game.HUD.BACK]);
        },

        this.render = function() {
            //Game.debugInfo(32, 32);
        }
};
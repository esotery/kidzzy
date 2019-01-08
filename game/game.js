var Game = new function() {
    var self = this;

    this.WIDTH = 1920;
    this.HEIGHT = 1280;

    this.BASE_WIDTH = 3600;
    this.BASE_HEIGHT = 2048;

    this.HUD = {
        BACK: 1,
        MENU: 2
    };

    this.Phase = {
        Initial: 1,
        RiverDone: 2,
        DamDone: 4,
        LakeDone: 16,
        StreamDone: 32,
        WaterPlantsDone: 64,
        PlantsDone: 128,
        AmphbiansDone: 256,
        BirdsDone: 512,
        SnailsDone: 1024,
        InsectsDone: 2048,
    };

    this.AssetType = {
        Sprite: 'Sprite',
        SpriteSheet: 'SpriteSheet',
        Audio: 'Audio'
    };

    var _game = null;
    var _gray = null;
    var _labelStyle = {
        font: "15px Arial",
        fill: "#ffffff",
        align: "center"
    };
    var _stateMachine = {
        initial: {
            confirm: 'map'
        },
        map: {
            navPoint_river: 'river',
            navPoint_dam: 'dam',
            navPoint_lake: 'lake',
            navPoint_stream: 'stream',
            navPoint_pond: 'pond',
        },
        river: {
            back: 'map',
            passed: 'map'
        },
        dam: {
            back: 'map',
            passed: 'map'
        },
        lake: {
            back: 'map',
            passed: 'map'
        },
        stream: {
            back: 'map',
            passed: 'map'
        },
        pond: {
            back: 'map',
            waterPlants: 'waterPlants',
            plants: 'plants',
            amphbians: 'amphbians',
            birds: 'birds',
            snails: 'snails',
            insects: 'insects',
            fishes: 'fishes'
        },
        waterPlants: {
            back: 'pond',
            game: 'parachutist'
        },
        plants: {
            back: 'pond',
            game: 'association'
        },
        birds: {
            back: 'pond',
            game: 'parachutist'
        },
        insects: {
            back: 'pond',
            game: 'parachutist'
        },
        snails: {
            back: 'pond',
            game: 'parachutist'
        },
        fishes: {
            back: 'pond',
            game: 'catchfish'
        },
        amphbians: {
            back: 'pond',
            game: 'pexeso'
        },
        parachutist: {
            back: 'waterPlants',
            done: 'waterPlants'
        },
        association: {
            back: 'plants',
            done: 'plants'
        },
        pexeso: {
            back: 'amphbians',
            done: 'amphbians'
        },
        catchfish: {
            back: 'fishes',
            done: 'fishes'
        }
    };
    var _currentState = null;
    var _createdStates = [];

    var _currentPhase = null;

    function scaleUp(sprite) {
        sprite.width = sprite._baseWidth * 1.2;
        sprite.height = sprite._baseHeight * 1.2;
    }

    function scaleBack(sprite) {
        sprite.width = sprite._baseWidth;
        sprite.height = sprite._baseHeight;
    }

    function scaleUpText(text) {
        text.fontSize = text._baseFontSize * 1.2;
    }

    function scaleBackText(text) {
        text.fontSize = text._baseFontSize
    }

    function navpointOver(sprite) {
        sprite.width = sprite._baseWidth * 1.2;
        sprite.height = sprite._baseHeight * 1.2;

        if (sprite._text != undefined && sprite._text != null) {
            sprite._label = window.game.add.text(sprite.x + 30, sprite.y - 7, sprite._text, _labelStyle);
        }
    }

    function navpointOut(sprite) {
        sprite.width = sprite._baseWidth;
        sprite.height = sprite._baseHeight;

        if (sprite._label != undefined) {
            sprite._label.destroy();
        }
    }

    function navpointDown(sprite, state) {
        navpointOut(sprite);

        Game.nextState('navPoint_' + state);
    }

    this.currentPhase = function(phase) {
        if (phase != undefined) {
            _currentPhase = phase;
        }

        return _currentPhase;
    }

    this.created = function(name) {
        _createdStates.push(name);
    }

    this.isCreated = function(name) {
        return _createdStates.indexOf(name) >= 0;
    }

    this.nextState = function(reason, fullscreen) {
        var possibleStates = _stateMachine[_currentState];

        if (possibleStates[reason] != undefined) {
            if (fullscreen) {
                this.goFull();
            }

            _game.world.setBounds(0, 0, Game.WIDTH, Game.HEIGHT);
            _game.camera.x = 0;
            _game.camera.y = 0;

            _currentState = possibleStates[reason];
            _game.state.start(possibleStates[reason]);
        }
    }

    this.buildHUD = function(elements, xOffset, yOffset) {
        if (elements.indexOf(this.HUD.BACK) >= 0) {
            var back = this.addSprite(50 + (xOffset != undefined ? xOffset : 0), 50 + (yOffset != undefined ? yOffset : 0), 'back', 60, 60);
            back.alpha = 0.7;
            back.tint = 0x000000;
            back.inputEnabled = true;
            back.input.useHandCursor = true;
            back.anchor.set(0.5);
            back.events.onInputOver.add(function() {
                scaleUp(back);
            }, this);
            back.events.onInputOut.add(function() {
                scaleBack(back);
            }, this);
            back.events.onInputDown.add(function() {
                this.nextState('back');
            }, this);

            this.backButton = back;
        }
    }

    this.loadGenericAssets = function(assets, type) {
        _game.load.image('back', 'assets/images/sprites/back.png');
        _game.load.image('sound', 'assets/images/sprites/sound.png');
        _game.load.script('gray', 'https://cdn.rawgit.com/photonstorm/phaser-ce/master/filters/Gray.js');
    }

    this.loadAssets = function(assets, type) {
        for (var i = 0; i < assets.length; ++i) {
            var asset = assets[i];

            switch (type) {
                case self.AssetType.Sprite:
                    _game.load.image(asset.name, asset.path);

                    break;
                case self.AssetType.SpriteSheet:
                    _game.load.spritesheet(asset.name, asset.path, asset.width, asset.height, asset.frameCount);

                    break;
                case self.AssetType.Audio:
                    _game.load.audio(asset.name, [asset.path]);

                    break;
            }

        }
    }

    this.createGenericAssets = function(assets, type) {
        _gray = new Phaser.Filter.Gray();
    }

    this.addLine = function(x1, y1, x2, y2, thickness, color) {
        var self = _game.add.graphics(0, 0);

        self.lineStyle(thickness, color == undefined ? 0x000000 : color);

        self.moveTo(x1, y1);
        self.lineTo(x2, y2);

        return self;
    }

    this.addSprite = function(x, y, name, width, height) {
        var self = _game.add.sprite(x, y, name);

        if (width != undefined && height != undefined) {
            self.width = self._baseWidth = width;
            self.height = self._baseHeight = height;
        }
        else {
            self._baseWidth = self.width;
            self._baseHeight = self.height;
        }

        self._baseX = x;
        self._baseY = y;

        return self;
    }

    this.makeSprite = function(x, y, name, width, height) {
        var self = _game.make.sprite(x, y, name);

        if (width != undefined && height != undefined) {
            self.width = self._baseWidth = width;
            self.height = self._baseHeight = height;
        }
        else {
            self._baseWidth = self.width;
            self._baseHeight = self.height;
        }

        return self;
    }

    this.addText = function(x, y, text, size) {
        var self = _game.add.text(x, y, text);
        self.anchor.setTo(0.5);

        self.font = 'Amatic SC';
        self.fontSize = self._baseFontSize = size;

        return self;
    }

    this.makeText = function(x, y, text, size) {
        var self = _game.make.text(x, y, text);
        self.anchor.setTo(0.5);

        self.font = 'Amatic SC';
        self.fontSize = self._baseFontSize = size;

        return self;
    }

    this.addHugo = function(x, y, width, height, showHand, shadowAlpha) {
        var self = _game.add.sprite(x, y, 'hugo-base');

        self.shadow = _game.make.sprite(299, 335, 'hugo-shadow');
        self.shadow.alpha = shadowAlpha == undefined ? 1 : shadowAlpha;
        self.addChild(self.shadow);
        self.body = _game.make.sprite(0, 0, 'hugo-base');
        self.addChild(self.body);
        self.normalMouth = _game.make.sprite(230, 335, 'hugo-mouth-normal');
        self.normalMouth.anchor.setTo(0.5);
        self.addChild(self.normalMouth);
        self.smileMouth = _game.make.sprite(230, 335, 'hugo-mouth-smile');
        self.smileMouth.anchor.setTo(0.5);
        self.addChild(self.smileMouth);
        self.smileMouth.visible = false;
        self._isSpeaking = true;

        function changeMouth() {
            if (self._isSpeaking) {
                if (self.normalMouth.visible) {
                    self.normalMouth.visible = false;
                    self.smileMouth.visible = true;
                }
                else {
                    self.smileMouth.visible = false;
                    self.normalMouth.visible = true;
                }

                setTimeout(changeMouth, 350);
            }
        }

        self.body.inputEnabled = true;
        if (showHand) {
            self.body.input.useHandCursor = true;
        }
        self.body.events.onInputOver.add(function() {
            self.normalMouth.visible = false;
            self.smileMouth.visible = true;
        }, this);
        self.body.events.onInputOut.add(function() {
            self.normalMouth.visible = true;
            self.smileMouth.visible = false;
        }, this);
        self.speak = function() {
            self._isSpeaking = true;
            changeMouth();
        };
        self.addScuba = function() {
            self.snorchel = _game.make.sprite(320, 170, 'hugo-snorchel');
            self.snorchel.anchor.setTo(0.5);
            self.addChild(self.snorchel);

            self.glasses = _game.make.sprite(220, 50, 'hugo-glasses');
            self.glasses.anchor.setTo(0.5);
            self.addChild(self.glasses);
        };
        self.shutup = function() {
            self._isSpeaking = false;
        };

        if (width != undefined && height != undefined) {
            self.width = self._baseWidth = width;
            self.height = self._baseHeight = height;
        }
        else {
            self._baseWidth = self.width;
            self._baseHeight = self.height;
        }

        return self;
    }

    this.addGregor = function(x, y, width, height) {
        var self = _game.add.sprite(x, y, 'gregor');
        self._isSpeaking = false;

        self.mouth = _game.make.sprite(30, 145, 'gregor_mouth');
        self.mouth.visible = false;
        self.addChild(self.mouth);

        function changeMouth() {
            if (self._isSpeaking) {
                if (self.mouth.visible) {
                    self.mouth.visible = false;
                }
                else {
                    self.mouth.visible = true;
                }

                setTimeout(changeMouth, 350);
            }
        }

        if (width != undefined && height != undefined) {
            self.width = self._baseWidth = width;
            self.height = self._baseHeight = height;
        }
        else {
            self._baseWidth = self.width;
            self._baseHeight = self.height;
        }
        self.speak = function() {
            self._isSpeaking = true;
            changeMouth();
        };
        self.shutup = function() {
            self._isSpeaking = false;
        };

        return self;
    }

    this.addPexeso = function(x, y, mappings, blank, handler) {
        var self = [];
        self._flippedCount = 0;
        self._firstFlipped = null;
        self._secondFlipped = null;
        self._lock = false;

        var xOffset = 0;
        var yOffset = 0;

        for (var i = 0; i < (mappings.length * 2); ++i) {
            if (i != 0 && i % 5 == 0) {
                xOffset = 0;
                yOffset += 200 + 10;
            }

            var piece = this.addSprite(x + xOffset, y + yOffset, blank, 200, 200);
            piece._flipped = false;
            piece._name = '';
            piece.inputEnabled = true;
            piece.input.useHandCursor = true;
            piece.events.onInputDown.add(function(e) {
                if (!self._lock && !e._flipped && self._flippedCount < 2) {
                    self._lock = true;
                    ++self._flippedCount;

                    if (self._flippedCount == 1) {
                        self._firstFlipped = e;
                    }
                    else if (self._flippedCount == 2) {
                        self._secondFlipped = e;
                    }

                    e._flipped = true;

                    Game.Effects.flip(e, 200, function(e) {
                        if (e._flipped) {
                            self._lock = false;
                            e._otherSide.visible = true;

                            if (self._firstFlipped != null && self._secondFlipped != null && self._firstFlipped._idx == self._secondFlipped._idx) {
                                if (self._firstFlipped._isText) {
                                    self._firstFlipped.tint = 0x94FF70;
                                }
                                else {
                                    self._firstFlipped._otherSide.tint = 0x94FF70;
                                }
                                if (self._secondFlipped._isText) {
                                    self._secondFlipped.tint = 0x94FF70;
                                }
                                else {
                                    self._secondFlipped._otherSide.tint = 0x94FF70;
                                }

                                setTimeout(function() {
                                    self.splice(self.indexOf(self._firstFlipped), 1);
                                    self.splice(self.indexOf(self._secondFlipped), 1);
                                    self._firstFlipped.kill();
                                    self._secondFlipped.kill();
                                    self._firstFlipped = null;
                                    self._secondFlipped = null

                                    self._flippedCount = 0;

                                    if (self.length == 0) {
                                        Game.nextState('done');
                                    }
                                }, 800);
                            }
                            else if (self._firstFlipped != null && self._secondFlipped != null) {
                                if (self._firstFlipped._isText) {
                                    self._firstFlipped.tint = 0xFF4545;
                                }
                                else {
                                    self._firstFlipped._otherSide.tint = 0xFF4545;
                                }
                                if (self._secondFlipped._isText) {
                                    self._secondFlipped.tint = 0xFF4545;
                                }
                                else {
                                    self._secondFlipped._otherSide.tint = 0xFF4545;
                                }

                                setTimeout(function() {
                                    self._firstFlipped.tint = 0xFFFFFF;
                                    self._secondFlipped.tint = 0xFFFFFF;
                                    self._firstFlipped._otherSide.tint = 0xFFFFFF;
                                    self._secondFlipped._otherSide.tint = 0xFFFFFF;

                                    self._firstFlipped._otherSide.visible = false;
                                    self._secondFlipped._otherSide.visible = false;

                                    Game.Effects.flip(self._firstFlipped, 200, function() {
                                        self._firstFlipped._flipped = false;
                                        self._firstFlipped = null;
                                    });
                                    Game.Effects.flip(self._secondFlipped, 200, function() {
                                        self._secondFlipped._flipped = false;
                                        self._secondFlipped = null;
                                        self._flippedCount = 0;
                                    });
                                }, 800);
                            }
                        }
                    });
                }
            }, this);
            piece.anchor.set(0.5);
            xOffset += 200 + 10;
            self.push(piece);
        }

        var slots = [];

        function freeSlot(slot) {
            var index = slot + 1 < self.length ? slot + 1 : 0;

            while (slots.indexOf(index) != -1) {
                ++index;

                if (index == self.length) {
                    index = 0;
                }
            }

            return index;
        }

        for (var i = 0; i < mappings.length; ++i) {
            var slot = i + Math.floor(Math.random() * (4 - 0 + 1)) + 0;
            var otherSlot = i + Math.floor(Math.random() * (9 - 5 + 1)) + 5;

            if (slots.indexOf(slot) != -1) {
                slot = freeSlot(slot);
            }
            slots.push(slot);
            if (slots.indexOf(otherSlot) != -1) {
                otherSlot = freeSlot(otherSlot);
            }
            slots.push(otherSlot);

            self[slot]._idx = i;
            self[slot]._isText = mappings[i].image == 'smiley' ? true : false;
            self[slot]._otherSide = mappings[i].image == 'smiley' ?
                this.makeText(0, 0, '☺', 100) :
                this.makeSprite(0, 0, mappings[i].image, 400, 400);
            self[slot]._otherSide.anchor.set(0.5);
            self[slot]._otherSide.scale.y *= -1;
            self[slot]._otherSide.visible = false;
            self[slot].addChild(self[slot]._otherSide);
            self[slot]._name = mappings[i].image;

            self[otherSlot]._idx = i;
            self[otherSlot]._isText = true;
            self[otherSlot]._otherSide = this.makeText(0, 0, mappings[i].text, 100);
            self[otherSlot]._otherSide.anchor.set(0.5);
            self[otherSlot]._otherSide.scale.y *= -1;
            self[otherSlot]._otherSide.visible = false;
            self[otherSlot].addChild(self[otherSlot]._otherSide);
            self[otherSlot]._name = mappings[i].image;
        }

        return self;
    }

    this.addAssociation = function(x, y, mapping, handler) {
        var self = {};
        self.hits = [];
        self.texts = [];
        self._asocCount = 0;

        var xOffset = 0;
        var yOffset = 0;
        var _y = y;

        function enableDrag(image, hit, text) {
            image._hit = hit;
            image._text = text;
            image.inputEnabled = true;
            image.input.useHandCursor = true;
            image.input.enableDrag();
            image.events.onDragStop.add(function(e) {
                var inter = Phaser.Rectangle.intersects(e.getBounds(), e._hit.getBounds());

                if (inter) {
                    ++e._text._counter;

                    e.tint = 0x94FF70;

                    setTimeout(function() {
                        if (e._text._counter == 2) {
                            e._text.fill = 'green';
                            ++self._asocCount;

                            if (self._asocCount == mapping.length) {
                                Game.nextState('done');
                            }
                        }

                        e.kill();
                    }, 400);
                }
                else {
                    e.tint = 0xFF4545;

                    setTimeout(function() {
                        e.tint = 0xFFFFFF;
                        e.x = e._baseX;
                        e.y = e._baseY;
                    }, 400);
                }
            }, this);
        }

        for (var i = 0; i < mapping.length; ++i) {
            var text = this.addText(x - 800, y + yOffset, mapping[i].text, 60);
            text.anchor.x = 0;
            text.anchor.y = 0;
            text._counter = 0;
            var hit = _game.add.sprite(x - 800, y + yOffset);
            hit.alpha = 0;
            hit.width = text.width;
            hit.height = 60;

            self.texts.push(text);
            self.hits.push(hit);

            yOffset += 180;
        }

        for (var i = 0; i < mapping.length; ++i) {
            if (i % 2 == 0 && i != 0) {
                xOffset = 0;
                _y += 200 + 20;
            }

            var start = Math.floor(Math.random() * (mapping[i].options.length - 1 - 0 + 1)) + 0;
            var other = start + 1 == mapping[i].options.length ? start - 1 : start + 1;

            var image1 = this.addSprite(x - 100 + xOffset, _y, mapping[i].options[start], 200, 200);
            xOffset += 200 + 20;
            var image2 = this.addSprite(x - 100 + xOffset, _y, mapping[i].options[other], 200, 200);
            enableDrag(image1, self.hits[i], self.texts[i]);
            enableDrag(image2, self.hits[i], self.texts[i]);

            xOffset += 200 + 20;
        }

        return self;
    }

    this.addAlphabet = function(x, y, handler) {
        var self = [];

        for (var i = 65; i < 91; ++i) {
            var char = String.fromCharCode(i);
            var letter = this.addText(x, y, char, 130);
            letter.inputEnabled = true;
            letter.input.useHandCursor = true;
            letter._char = char;
            letter.events.onInputOver.add(function(e) {
                scaleUpText(e);
            }, this);
            letter.events.onInputOut.add(function(e) {
                scaleBackText(e);
            }, this);
            if (handler != undefined) {
                letter.events.onInputDown.add(function(e) {
                    handler(e, e._char);
                }, this);
            }
            x += 72;
            self.push(letter);
        }

        self.kill = function() {
            for (var i = 0; i < self.length; ++i) {
                self[i].kill();
            }
        };

        return self;
    }

    this.addSeparatedText = function(x, y, text, textWithoutDia) {
        var self = [];
        self._chars = [];
        self.contains = function(letter) {
            return self._chars.indexOf(letter) != -1;
        };
        self.revail = function(letter) {
            var indexes = [];
            var index = 0;

            var foundIndex = self._chars.indexOf(letter, index)

            while (foundIndex != -1) {
                index = foundIndex + 1;

                indexes.push(foundIndex);
                foundIndex = self._chars.indexOf(letter, index);
            }

            for (var i = 0; i < indexes.length; ++i) {
                self[indexes[i]].visible = true;
                self[indexes[i]]._visible = true;
            }
        };
        self.isComplete = function() {
            var complete = true;

            for (var i = 0; i < self.length; ++i) {
                complete = complete && self[i]._visible;
            }

            return complete;
        };
        self.makeComplete = function() {
            for (var i = 0; i < self.length; ++i) {
                self[i].fill = 'green';
            }
        };
        self.kill = function() {
            for (var i = 0; i < self.length; ++i) {
                self[i].kill();
            }
        };

        for (var i = 0; i < text.length; ++i) {
            if (text[i] == ' ') {
                var txt = this.addText(x, y, text[i], 120);
                txt._visible = true;
                self.push(txt);
                x += 68;
            }
            else {
                var txt = this.addText(x, y, text[i], 120);
                txt._visible = false;
                self.push(txt);
                x += 92;
            }

            self._chars.push(textWithoutDia[i].toUpperCase());
        }

        for (var i = 0; i < self.length; ++i) {
            self[i].visible = false;
        }

        return self;
    }

    this.addTextPlaceholder = function(x, y, text) {
        var placeholder = '';

        for (var i = 0; i < text.length; ++i) {
            if (text[i] == ' ') {
                placeholder += '    ';
            }
            else {
                placeholder += '_  ';
            }
        }

        var self = this.addText(x, y, placeholder, 120);
        self.anchor.x = 0;

        return self;
    }

    this.addParachutist = function(x, y, background, parachute, parachutistBody, parachutistHeadPh) {
        var self = this.addSprite(x, y, parachute);
        self.anchor.x = 0.5;

        self._body = this.makeSprite(0, 400, parachutistBody);
        self._body.anchor.x = 0.5;

        self._head = this.makeSprite(6, 320, parachutistHeadPh + '1');
        self._head.anchor.x = 0.5;

        var ropes = [{
            x: -220,
            y: 145
        }, {
            x: 108,
            y: 130
        }, {
            x: -115,
            y: 132
        }, {
            x: 155,
            y: 144
        }, {
            x: -55,
            y: 120
        }, {
            x: 230,
            y: 168
        }, {
            x: 0,
            y: 110
        }, {
            x: 56,
            y: 120
        }, {
            x: -167,
            y: 140
        }, {
            x: 195,
            y: 155
        }];

        self._ropes = _game.make.graphics(0, 0);

        function buildRopes(number) {
            self._ropes.clear();
            self._ropes.lineStyle(6, 0x000000);

            var length = number == undefined ? ropes.length : number;

            for (var i = 0; i < length; ++i) {
                self._ropes.moveTo(ropes[i].x, ropes[i].y);
                self._ropes.lineTo(0, 440);
            }

            if (number == 0) {
                self._head.loadTexture(parachutistHeadPh + '4');
            }
            else if (number <= 4) {
                self._head.loadTexture(parachutistHeadPh + '3');
            }
            else if (number <= 7) {
                self._head.loadTexture(parachutistHeadPh + '2');
            }
        }

        buildRopes();

        self.addChild(self._ropes);
        self.addChild(self._body);
        self.addChild(self._head);

        self._ropesCount = 10;

        self.looseRope = function() {
            var ret = false;

            if (self._ropesCount > 0) {
                --self._ropesCount;
                ret = true;
            }

            buildRopes(self._ropesCount);

            return true;
        };

        return self;
    }

    this.addRentgenIcon = function(x, y, width, height, name, mask, text, preHandler, postHandler) {
        var self = this.addSprite(x, y, name, width, height);
        self._back = this.addSprite(960 + _game.camera.x, 640 + _game.camera.y, mask, 500, 500);
        self._back.anchor.set(0.5);
        self._back.visible = false;

        self.anchor.set(0.5);

        self.inputEnabled = true;
        self.input.useHandCursor = true;
        self.events.onInputOver.add(scaleUp, this);
        self.events.onInputOut.add(scaleBack, this);
        self.events.onInputDown.add(function() {
            preHandler(self);
            self.inputEnabled = false;
            self._text.visible = false;
            self._close.visible = true;
            this.Effects.moveTo(self, 150, 960 + _game.camera.x, 640 + _game.camera.y, function() {
                Game.Effects.scaleTo(self, 150, 500, 500, function() {
                    self._back.visible = true;

                    var mask = _game.add.graphics(0, 0);
                    mask.beginFill(0x000000);
                    mask.drawCircle(960 + _game.camera.x, 640 + _game.camera.y, 100);
                    mask.inputEnabled = true;
                    mask.input.enableDrag();

                    self._back.mask = mask;
                });
            });
        }, this);

        self._text = this.makeText(0, 470, text, 150);
        self._text.fill = 'white';
        self._text.alpha = 0.7;

        self._close = this.makeText(300, -350, '×', 150);
        self._close.fill = 'white';
        self._close.alpha = 0.7;
        self._close.visible = false;
        self._close.inputEnabled = true;
        self._close.input.useHandCursor = true;
        self._close.events.onInputOver.add(scaleUpText, this);
        self._close.events.onInputOut.add(scaleBackText, this);
        self._close.events.onInputDown.add(function() {
            self.inputEnabled = true;
            self.input.useHandCursor = true;
            self._text.visible = true;
            self._close.visible = false;
            self.x = self._baseX;
            self.y = self._baseY;
            self.width = self._baseHeight;
            self.height = self._baseHeight;
            self._back.mask.kill();
            self._back.visible = false;

            if (postHandler != undefined) postHandler(self);
        }, this);

        self.addChild(self._text);
        self.addChild(self._close);

        return self;
    }

    this.addSimpleIcon = function(x, y, width, height, name, text, preHandler, postHandler) {
        var self = this.addSprite(x, y, name, width, height);

        self.anchor.set(0.5);

        self.inputEnabled = true;
        self.input.useHandCursor = true;
        self.events.onInputOver.add(scaleUp, this);
        self.events.onInputOut.add(scaleBack, this);
        self.events.onInputDown.add(function() {
            preHandler(self);
            self.inputEnabled = false;
            self._text.visible = false;
            self._close.visible = true;
            this.Effects.moveTo(self, 150, 960 + _game.camera.x, 640 + _game.camera.y, function() {
                Game.Effects.scaleTo(self, 150, 500, 500, function() {

                });
            });
        }, this);

        self._text = this.makeText(0, 470, text, 150);
        self._text.fill = 'white';
        self._text.alpha = 0.7;

        self._close = this.makeText(300, -350, '×', 150);
        self._close.fill = 'white';
        self._close.alpha = 0.7;
        self._close.visible = false;
        self._close.inputEnabled = true;
        self._close.input.useHandCursor = true;
        self._close.events.onInputOver.add(scaleUpText, this);
        self._close.events.onInputOut.add(scaleBackText, this);
        self._close.events.onInputDown.add(function() {
            self.inputEnabled = true;
            self.input.useHandCursor = true;
            self._text.visible = true;
            self._close.visible = false;
            self.x = self._baseX;
            self.y = self._baseY;
            self.width = self._baseHeight;
            self.height = self._baseHeight;

            if (postHandler != undefined) postHandler(self);
        }, this);

        self.addChild(self._text);
        self.addChild(self._close);

        return self;
    }

    this.addSoundIcon = function(x, y, width, height, name, text, subtitles, slides, preHandler, postHandler) {
        var self = this.addSprite(x, y, name, width, height);
        self._name = name;

        self._subIterator = -1;
        self._slideIterator = -1;

        function nextSub() {
            ++self._subIterator;
            if (self._subIterator < subtitles.length) {
                var sub = subtitles[self._subIterator];

                if (self._subIterator == 0) {
                    self._subtitle.visible = true;
                    self._subtitle.text = sub.text;

                    setTimeout(nextSub, sub.duration - 350);
                }
                else {
                    Game.Effects.fadeOutfadeInSub(self._subtitle, 350, sub.text, function() {
                        setTimeout(nextSub, sub.duration - 350);
                    });
                }
            }
        }

        function nextSlide() {
            ++self._slideIterator;
            if (self._slideIterator < slides.length) {
                var slide = slides[self._slideIterator];

                if (self._slideIterator == 0) {
                    self.loadTexture(slide.sprite);

                    setTimeout(nextSlide, slide.duration - 350);
                }
                else {
                    Game.Effects.fadeOutfadeIn(self, 350, slide.sprite, function() {
                        setTimeout(nextSlide, slide.duration - 350);
                    });
                }
            }
        }

        self.anchor.set(0.5);

        self.inputEnabled = true;
        self.input.useHandCursor = true;
        self.events.onInputOver.add(scaleUp, this);
        self.events.onInputOut.add(scaleBack, this);
        self.events.onInputDown.add(function() {
            preHandler(self);
            self.inputEnabled = false;
            self._sound.visible = false;
            self._text.visible = false;
            this.Effects.moveTo(self, 150, 960 + _game.camera.x, 640 + _game.camera.y, function() {
                Game.Effects.scaleTo(self, 150, 500, 500, function() {
                    var des = _game.add.audio(name);

                    des.play();
                    des.onStop.add(function() {
                        self._slideIterator = -1;
                        self._subIterator = -1;

                        self.loadTexture(name);
                        self.inputEnabled = true;
                        self.input.useHandCursor = true;
                        self._subtitle.visible = false;
                        self._text.visible = true;
                        self._sound.visible = true;
                        self.x = self._baseX;
                        self.y = self._baseY;
                        self.width = self._baseHeight;
                        self.height = self._baseHeight;

                        if (postHandler != undefined) postHandler(self);
                    }, this);

                    nextSlide();
                    nextSub();
                });
            });
        }, this);

        self._sound = this.makeSprite(0, -400, 'sound', 150, 150);
        self._sound.alpha = 0.7;
        self._sound.anchor.set(0.5);

        self._text = this.makeText(0, 470, text, 150);
        self._text.fill = 'white';
        self._text.alpha = 0.7;

        self._subtitle = this.addText(960 + _game.camera.x, _game.camera.y + 640 + 480, '', 75);
        self._subtitle.fill = 'white';
        self._subtitle.alpha = 0.9;
        self._subtitle.visible = false;

        self.addChild(self._sound);
        self.addChild(self._text);

        return self;
    }

    this.addEvoIcon = function(x, y, width, height, name, bck, text, subtitles, slides, preHandler, postHandler) {
        var self = this.addSprite(x, y, name, width, height);

        self._subIterator = -1;
        self._slideIterator = -1;

        function nextSub() {
            ++self._subIterator;
            if (self._subIterator < subtitles.length) {
                var sub = subtitles[self._subIterator];

                if (self._subIterator == 0) {
                    self._subtitle.visible = true;
                    self._subtitle.text = sub.text;

                    setTimeout(nextSub, sub.duration - 350);
                }
                else {
                    Game.Effects.fadeOutfadeInSub(self._subtitle, 350, sub.text, function() {
                        setTimeout(nextSub, sub.duration - 350);
                    });
                }
            }
        }

        function nextSlide() {
            ++self._slideIterator;
            if (self._slideIterator < slides.length) {
                var slide = slides[self._slideIterator];

                if (self._slideIterator == 0) {
                    self.evoStage = Game.addSprite(960 + _game.camera.x, 640 + _game.camera.y, slide.sprite);
                    self.evoStage.anchor.set(0.5);
                    setTimeout(nextSlide, slide.duration - 500);
                }
                else {
                    var newSlide = Game.addSprite(960 + _game.camera.x, 640 + _game.camera.y, slide.sprite);
                    newSlide.anchor.set(0.5);
                    newSlide.alpha = 0;

                    Game.Effects.fadeOutfadeInSprite(self.evoStage, 500, newSlide, function() {
                        self.evoStage.kill();
                        self.evoStage = newSlide;
                        setTimeout(nextSlide, slide.duration - 500);
                    }, true);
                }
            }
            else {
                self._slideIterator = -1;
                self._subIterator = -1;

                self.evoBck.visible = false;
                self.evoBck.alpha = 0;
                self.evoStage.kill();
                self.evoStage = null;

                self.visible = true;
                self.alpha = 1;
                self.inputEnabled = true;
                self.input.useHandCursor = true;
                self._subtitle.visible = false;
                self._text.visible = true;
                self.x = self._baseX;
                self.y = self._baseY;
                self.width = self._baseHeight;
                self.height = self._baseHeight;

                if (postHandler != undefined) postHandler(self);
            }
        }

        self.evoStage = null;

        self.evoBck = this.addSprite(960 + _game.camera.x, 640 + _game.camera.y, bck);
        self.evoBck.anchor.set(0.5);
        self.evoBck.visible = false;
        self.evoBck.alpha = 0;

        self.anchor.set(0.5);

        self.inputEnabled = true;
        self.input.useHandCursor = true;
        self.events.onInputOver.add(scaleUp, this);
        self.events.onInputOut.add(scaleBack, this);
        self.events.onInputDown.add(function() {
            preHandler(self);
            self.inputEnabled = false;
            self._text.visible = false;
            this.Effects.moveTo(self, 150, 960 + _game.camera.x, 640 + _game.camera.y, function() {
                self.evoBck.visible = true;
                Game.Effects.fadeOutfadeInSprite(self, 300, self.evoBck, function() {
                    /*var des = _game.add.audio(name);

                    des.play();
                    des.onStop.add(function() {
                        
                    }, this);*/

                    nextSlide();
                    //nextSub();
                }, true, false);
            });
        }, this);


        self._text = this.makeText(0, 470, text, 150);
        self._text.fill = 'white';
        self._text.alpha = 0.7;

        self._subtitle = this.addText(960 + _game.camera.x, _game.camera.y + 640 + 480, '', 65);
        self._subtitle.fill = 'white';
        self._subtitle.alpha = 0.9;
        self._subtitle.visible = false;

        self.addChild(self._text);

        return self;
    }

    this.addPondEntity = function(x, y, name, state, enabled, scale) {
        var xRatio = this.WIDTH / this.BASE_WIDTH;
        var yRatio = this.HEIGHT / this.BASE_HEIGHT;

        var self = _game.add.sprite(x, y, name);
        /*
        self.inputEnabled = true;
        self.input.enableDrag();
        self.events.onInputOver.add(function() {
                    console.log(self.x);console.log(self.y);
                }, this);
                */
        if (scale == undefined || scale) {
            self.width = self.width * xRatio;
            self.height = self.height * yRatio;
        }
        if (enabled == undefined || enabled) {
            self.inputEnabled = true;
            self.input.useHandCursor = true;
            self.events.onInputOver.add(function() {
                self._highlight.visible = true;
            }, this);
            self.events.onInputOut.add(function() {
                self._highlight.visible = false;
            }, this);
            self.events.onInputDown.add(function() {
                this.nextState(state);
            }, this);
            self._highlight = _game.add.sprite(x, y, name);
            if (scale == undefined || scale) {
                self._highlight.width = self._highlight.width * xRatio;
                self._highlight.height = self._highlight.height * yRatio;
            }
            self._highlight.alpha = 0.5;
            self._highlight.blendMode = PIXI.blendModes.ADD;
            self._highlight.visible = false;
        }
        else {
            self.filters = [_gray];
        }

        return self;
    }

    this.addChoice = function(x, y, header, headerSize, choices, rightChoice, choiceSize, handler, wrongHandler, color) {
        var self = _game.add.text(x, y, header);
        if (color != undefined) {
            self.fill = color;
        }

        self.anchor.setTo(0.5);

        self.font = 'Amatic SC';
        self.fontSize = self._baseFontSize = headerSize;

        self.choices = [];

        var _y = y + headerSize;

        for (var i = 0; i < choices.length; ++i) {
            var choice = _game.add.text(x, _y, choices[i]);
            if (color != undefined) {
                choice.fill = color;
            }
            choice.inputEnabled = true;
            choice.input.useHandCursor = true;
            choice.events.onInputOver.add(scaleUpText, this);
            choice.events.onInputOut.add(scaleBackText, this);
            choice.events.onInputDown.add(function(evt) {
                if (evt._text == rightChoice) {
                    evt._text = evt._text + ' ✓'
                    evt.fill = 'green';

                    if (handler != undefined) {
                        setTimeout(handler, 500);
                    }
                }
                else {
                    evt._text = evt._text + ' ✗';
                    evt.fill = 'red';

                    if (wrongHandler != undefined && wrongHandler != null) {
                        setTimeout(wrongHandler, 500);
                    }
                }
            }, this);


            choice.anchor.setTo(0.5);

            choice.font = 'Amatic SC';
            choice.fontSize = choice._baseFontSize = choiceSize;

            self.choices.push(choice);

            _y += choiceSize;
        }

        self.killAll = function() {
            for (var i = 0; i < self.choices.length; ++i) {
                self.choices[i].kill();
            }

            self.kill();
        }

        return self;
    }

    this.addNavpoint = function(x, y, width, height, sprite, text, state, enabled, done) {
        var self = _game.add.sprite(x, y, sprite);

        self._text = text;
        self._enabled = enabled;
        self.anchor.set(0.5);

        self.width = self._baseWidth = width;
        self.height = self._baseHeight = height;

        if (enabled && !done) {
            self.inputEnabled = true;
            self.input.useHandCursor = true;
            self.events.onInputOver.add(navpointOver, this);
            self.events.onInputOut.add(navpointOut, this);
            self.events.onInputDown.add(function() {
                navpointDown(this, state);
            }, this);
        }
        else if (done) {
            self._tick = this.makeText(0, 0, '✓', 240);
            self._tick.fill = 'green';

            self.addChild(self._tick);
        }
        else {
            var disabled = _gray;

            self.filters = [disabled];
        }

        return self;
    }

    this.connectNavpoints = function(navpoints, background) {
        var graphics = _game.add.graphics(0, 0);

        graphics.clear();
        graphics.lineStyle(6, 0xFFFF4A, 0.7);

        for (var i = 0; i < navpoints.length; ++i) {
            var sprite = navpoints[i];

            if (i + 1 < navpoints.length) {
                var nextSprite = navpoints[i + 1];

                if (sprite._enabled) {
                    graphics.lineStyle(6, 0xFFFF4A, 0.7);
                }
                else {
                    graphics.lineStyle(6, 0x9E9E9E, 0.7);
                }

                graphics.moveTo(sprite.x, sprite.y);
                graphics.lineTo(nextSprite.x, nextSprite.y);
            }
        }

        _game.world.sendToBack(graphics);
        _game.world.sendToBack(background);
    }

    this.makeGray = function(sprite) {
        sprite.filters = [_gray];
    }

    this.debugInfo = function(x, y) {
        _game.debug.inputInfo(x, y);
        _game.debug.cameraInfo(_game.camera, x, y + 100);
    }

    this.cursorKeys = function() {
        var self = _game.input.keyboard.createCursorKeys();

        return self;
    }

    this.worldBounds = function(x, y, width, height) {
        _game.world.setBounds(x, y, width, height);
    }

    this.camera = function(x, y) {
        if (x != undefined && y != undefined) {
            _game.camera.x = x;
            _game.camera.y = y;
        }

        return _game.camera;
    }

    this.size = function(width, height) {
        if (width != undefined && height != undefined) {
            _game.width = width;
            _game.height = height;
        }
        return {
            width: _game.width,
            height: _game.height
        };
    }

    this.center = function() {
        return {
            x: _game.world.centerX,
            y: _game.world.centerY
        }
    }

    this.scaleMode = function(mode) {
        _game.scale.scaleMode = mode;
    }

    this.frameBased = function(value) {
        _game.tweens.frameBased = value;
    }

    this.goFull = function() {
        if (_game.scale.isFullScreen) {
            _game.scale.stopFullScreen();
        }
        else {
            _game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            _game.scale.startFullScreen();
        }
    }

    this.init = function() {
        _game = new Phaser.Game(this.WIDTH, this.HEIGHT, Phaser.AUTO, '');
        _game.state.add('initial', InitialState);
        _game.state.add('map', MapState);
        _game.state.add('river', RiverState);
        _game.state.add('dam', DamState);
        _game.state.add('lake', LakeState);
        _game.state.add('stream', StreamState);
        _game.state.add('pond', PondState);
        _game.state.add('waterPlants', WaterPlantsState);
        _game.state.add('plants', PlantsState);
        _game.state.add('birds', BirdsState);
        _game.state.add('insects', InsectsState);
        _game.state.add('snails', SnailsState);
        _game.state.add('fishes', FishesState);
        _game.state.add('amphbians', AmphbiansState);
        _game.state.add('parachutist', ParachutistState);
        _game.state.add('association', AssociationState);
        _game.state.add('pexeso', PexesoState);
        _game.state.add('catchfish', CatchFishState);

        _currentState = 'initial';
        _currentPhase = Game.Phase.Initial;
        _game.state.start('initial');
    }

    this.Effects = {
        pulsateText: function(text, duration, delta) {
            var self = {
                scaleUp: _game.add.tween(text),
                scaleBack: _game.add.tween(text)
            };

            var _duration = duration != undefined ? duration / 2 : 400;

            self.scaleUp.to({
                fontSize: text._baseFontSize + (delta != undefined ? delta : 10)
            }, _duration, Phaser.Easing.Linear.None, false);
            self.scaleUp.onStart.add(function() {
                self.delay = 0;
            }, this);
            self.scaleUp.chain(self.scaleBack);

            self.scaleBack.to({
                fontSize: text._baseFontSize
            }, _duration, Phaser.Easing.Linear.None, false);
            self.scaleUp.onStart.add(function() {
                self.delay = 0;
            }, this);
            self.scaleBack.chain(self.scaleUp);

            self.scaleUp.start();

            return self;
        },
        moveTo: function(sprite, duration, x, y, handler) {
            var _duration = duration != undefined ? duration : 400;

            var tween = _game.add.tween(sprite);
            tween.to({
                x: x,
                y: y
            }, _duration, Phaser.Easing.Linear.None, false);
            tween.onComplete.add(function() {
                if (handler != undefined) handler();
            }, this);

            tween.start();
        },
        scaleTo: function(sprite, duration, width, height, handler) {
            var _duration = duration != undefined ? duration : 400;

            var tween = _game.add.tween(sprite);
            tween.to({
                width: width,
                height: height
            }, _duration, Phaser.Easing.Linear.None, false);
            tween.onComplete.add(function() {
                if (handler != undefined) handler();
            }, this);

            tween.start();
        },
        fadeOutfadeIn: function(sprite, duration, newTexture, handler) {
            var self = {
                fadeOut: _game.add.tween(sprite),
                fadeIn: _game.add.tween(sprite)
            };

            var _duration = duration != undefined ? duration / 2 : 400;

            self.fadeOut.to({
                alpha: 0
            }, _duration, Phaser.Easing.Linear.None, false);
            self.fadeOut.chain(self.fadeIn);

            self.fadeIn.to({
                alpha: 1
            }, _duration, Phaser.Easing.Linear.None, false);
            self.fadeIn.onStart.add(function(e) {
                if (newTexture != undefined) {
                    sprite.loadTexture(newTexture);
                }
            }, this);
            self.fadeIn.onComplete.add(handler, this);

            self.fadeOut.start();

            return self;
        },
        fadeOutfadeInSprite: function(sprite, duration, newSprite, handler) {
            var self = {
                fadeOut: _game.add.tween(sprite),
                fadeIn: _game.add.tween(newSprite)
            };

            var _duration = duration != undefined ? duration / 2 : 400;

            self.fadeOut.to({
                alpha: 0
            }, _duration, Phaser.Easing.Linear.None, false);
            self.fadeOut.chain(self.fadeIn);

            self.fadeIn.to({
                alpha: 1
            }, _duration, Phaser.Easing.Linear.None, false);
            self.fadeIn.onComplete.add(handler, this);

            self.fadeOut.start();

            return self;
        },
        fadeOutfadeInSub: function(sprite, duration, newText, handler) {
            var self = {
                fadeOut: _game.add.tween(sprite),
                fadeIn: _game.add.tween(sprite)
            };

            var alpha = sprite.alpha;

            var _duration = duration != undefined ? duration / 2 : 400;

            self.fadeOut.to({
                alpha: 0
            }, _duration, Phaser.Easing.Linear.None, false);
            self.fadeOut.chain(self.fadeIn);

            self.fadeIn.to({
                alpha: alpha
            }, _duration, Phaser.Easing.Linear.None, false);
            self.fadeIn.onStart.add(function() {
                if (newText != undefined) {
                    sprite.text = newText;
                }
            }, this);
            self.fadeIn.onComplete.add(handler, this);

            self.fadeOut.start();

            return self;
        },
        flip: function(sprite, duration, handler) {
            var self = _game.add.tween(sprite.scale);

            var y = sprite.scale.y * -1;

            self.to({
                y: y
            }, duration, Phaser.Easing.Linear.None, false);
            self.onComplete.add(function() {
                handler(sprite);
            }, this);

            self.start();

            return self;
        },
        shake: function(sprite, handler) {
            var self = [_game.add.tween(sprite), _game.add.tween(sprite), _game.add.tween(sprite),
                _game.add.tween(sprite), _game.add.tween(sprite), _game.add.tween(sprite),
                _game.add.tween(sprite), _game.add.tween(sprite), _game.add.tween(sprite)
            ];

            for (var i = 0; i < self.length - 1; ++i) {
                self[i].to({
                    angle: (i % 2 == 0) ? 5 : -5
                }, 80, Phaser.Easing.Linear.None, false);
                self[i].chain(self[i + 1]);
            }

            self[self.length - 1].to({
                angle: 0
            }, 80, Phaser.Easing.Linear.None, false);
            self[self.length - 1].onComplete.add(handler, this);

            self[0].start();

            return self;
        }
    }
}
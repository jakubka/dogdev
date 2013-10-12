(function(w) {
    'use strict';

    var P = w.P,
        ko = w.ko,
        creatures = P.creaturesList,
        marian = new P.Player(),
        compass = P.compass,
        shot = P.shot,
        settings = P.settings,
        soundManager = P.soundManager,
        game = {};

    var calculateCreatureAngle = function(c) {
        var result = c.orientation() - marian.orientation();
        if (result < -180) {
            result += 360;
        }
        if (result > 180) {
            result -= 360;
        }

        return result;
    };

    var creatureRelativePositionChanged = function(c) {
        soundManager.changeCreatureNoise(c.id, calculateCreatureAngle(c), c.distanceFromPlayer());
    };

    marian.orientation.subscribe(function(newOrientation) {
        ko.utils.arrayForEach(creatures(), function(c) {
            creatureRelativePositionChanged(c);
        });
    });

    creatures.onCreatureDied = function(c) {
        setTimeout(function() {
            creatures.generateCreature();
        }, settings.timeToRecreateCreature() * 1000);
        marian.fragsCount(marian.fragsCount() + 1);
        soundManager.playCreatureDie();
        soundManager.stopCreatureNoise(c.id);
    };

    creatures.onCreatureSpawned = function(c) {
        P.soundManager.startCreatureNoise(c.id, calculateCreatureAngle(c), c.distanceFromPlayer());
    };

    creatures.onCreatureMoved = function(c) {
        creatureRelativePositionChanged(c);
    };

    creatures.onCreatureHitPlayer = function(c) {
        marian.takeDamage();
        soundManager.playCreatureHit();
        soundManager.stopCreatureNoise();
    };

    marian.isAlive.subscribe(function(isAlive) {
        if (!isAlive) {
            game.stop();
        }
    });

    game.started = ko.observable(false);

    game.shoot = function() {
        shot.shoot(marian.orientation(), creatures);
        soundManager.playShot();
    };

    game.start = function() {
        marian.init("Marian", 111);
        creatures.init();

        soundManager.startBackgroundMusic();
        game.started(true);
    };

    game.stop = function() {
        soundManager.stopAll();
        // TODO play game over
        creatures.stop();
        game.started(false);
    };

    game.restart = function() {
        marian.restart();
        creatures.restart();
        settings.restart();

        soundManager.stopAll();
        soundManager.startBackgroundMusic();
    };

    game.changePlayerOrientation = function(orientation) {
        marian.orientation(orientation);
    };

    game.creatures = creatures;
    game.currentPlayer = marian;

    // expose module
    P.game = game;

}(this))

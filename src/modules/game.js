(function(w) {
    'use strict';

    var P = w.P,
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

    creatures.creatureDied = function(c) {
        setTimeout(function() {
            creatures.generateCreature();
        }, settings.TimeToRecreateCreature * 1000);
        marian.fragsCount(marian.fragsCount() + 1);
        soundManager.playCreatureDie();
        soundManager.stopCreatureNoise(c.id);
    };

    creatures.creatureSpawned = function(c) {
        P.soundManager.startCreatureNoise(c.id, calculateCreatureAngle(c), c.distanceFromPlayer())

        c.moved = function() {
            creatureRelativePositionChanged(c);
        };
    };

    creatures.creatureHitPlayer = function(c) {
        marian.die();
        soundManager.playCreatureHit();
        soundManager.stopBackgroundMusic();
    };

    game.shoot = function() {
        shot.shoot(marian.orientation(), creatures);
        soundManager.playShot();
    };

    game.start = function() {
        marian.init("Marian", 111);
        creatures.init();

        soundManager.startBackgroundMusic();
    };

    game.restart = function() {
        marian.restart();
        creatures.restart();

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

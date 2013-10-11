(function(w) {
    'use strict';

    var P = w.P,
        creatures = P.creaturesList,
        marian = new P.Player(),
        compass = P.compass,
        shot = P.shot,
        settings = P.settings,
        game = {};

    creatures.creatureDied = function(c) {
        setTimeout(function() {
            creatures.generateCreature();
        }, settings.TimeToRecreateCreature * 1000);
    };

    creatures.creatureHitPlayer = function(c) {
        marian.die();
    };

    game.shoot = function() {
        shot.shoot(marian.orientation(), creatures, function() {
            marian.fragsCount(marian.fragsCount() + 1);
        });
    };

    game.start = function() {
        marian.init("Marian", 111);
        creatures.init();
    };

    game.restart = function() {
        marian.restart();
        creatures.restart();
    };

    game.creatures = creatures;
    game.currentPlayer = marian;

    // expose module
    P.game = game;

}(this))

(function(w) {
    'use strict';

    var P = w.P,
        doc = w.document,
        compass = P.compass,
        game = P.game,
        sm = P.soundManager,
        environmentInitialized = ko.observable(false),
        gameStarted = ko.observable(false),

        ViewModel = function() {
            this.player = game.currentPlayer;
            this.creatures = game.creatures;
            this.compassNotAvailable = compass.compassNotAvailable;
            this.environmentInitialized = environmentInitialized;
            this.gameStarted = gameStarted;
        };

    ViewModel.prototype.startApp = function() {
        gameStarted(true);
        game.start();
    };

    ViewModel.prototype.shoot = function() {
        game.shoot();
    };

    ViewModel.prototype.restart = function() {
        game.restart();
    };

    sm.init(function() {
        environmentInitialized(true);
    });

    compass.init(function(orientation) {
        game.changePlayerOrientation(orientation);
    });

    ko.applyBindings(new ViewModel());

    // sm.init, dej mu jako callback startovani hry
    // clickni na button
    // pust prehrani libovolneho zvuku

}(this));

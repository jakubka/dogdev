(function(w) {
    'use strict';

    var P = w.P,
        doc = w.document,
        compass = P.compass,
        settings = P.settings,
        game = P.game,
        sm = P.soundManager,
        environmentInitialized = ko.observable(false),
        vm,

        ViewModel = function() {
            this.player = game.currentPlayer;
            this.creatures = game.creatures;
            this.compassNotAvailable = compass.compassNotAvailable;
            this.environmentInitialized = environmentInitialized;
            this.gameStarted = game.started;
            this.playerIsDying = game.playerIsDying;

            this.settings = ko.observable(settings);
        };

    ViewModel.prototype.startApp = function() {
        this.settings(settings.init());
        game.start();
        this.initialized(true);
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

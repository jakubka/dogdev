(function(w) {
    'use strict';

    var P = w.P,
        compass = P.compass,
        settings = P.settings,
        game = P.game,
        sm = P.soundManager,
        environmentInitialized = ko.observable(false),
        logsSender = P.logsSender,

        ViewModel = function () {
            this.player = game.currentPlayer;
            this.creatures = game.creatures;
            this.compassNotAvailable = compass.compassNotAvailable;
            this.environmentInitialized = environmentInitialized;
            this.gameStarted = game.started;
            this.playerIsDying = game.playerIsDying;
            this.playerIsHitting = game.playerIsHitting;

            this.settings = ko.observable(settings);
        };

    ViewModel.prototype.startApp = function() {
        this.settings(settings.init());
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

    logsSender.init();

    ko.applyBindings(new ViewModel());

    // sm.init, dej mu jako callback startovani hry
    // clickni na button
    // pust prehrani libovolneho zvuku

}(this));
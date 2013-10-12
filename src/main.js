(function(w) {
    'use strict';

    var P = w.P,
        doc = w.document,
        compass = P.compass,
        game = P.game,
        sm = P.soundManager,
        environmentInitialized = ko.observable(false),
        gameStarted = ko.observable(false),

        acc_x = ko.observable(),
        acc_y = ko.observable(),
        acc_z = ko.observable(),

        ViewModel = function() {
            this.player = game.currentPlayer;
            this.creatures = game.creatures;
            this.compassNotAvailable = compass.compassNotAvailable;
            this.environmentInitialized = environmentInitialized;
            this.gameStarted = gameStarted;

            this.acc_x = acc_x;
            this.acc_y = acc_y;
            this.acc_z = acc_z;
        };

    window.ondevicemotion = function (e) {
        acc_x(e.accelerationIncludingGravity.x);
        acc_y(e.accelerationIncludingGravity.y);
        acc_z(e.accelerationIncludingGravity.z);
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

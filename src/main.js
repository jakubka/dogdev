(function(w) {
    'use strict';

    var P = w.P,
        compass = P.compass,
        game = P.game,
        sm = P.soundManager,
        o = ko.observable(0),

        ViewModel = function() {
            this.player = game.currentPlayer;
            this.creatures = game.creatures;
            this.compassNotAvailable = compass.compassNotAvailable;
            this.orientation = o;
        };

    ViewModel.prototype.startApp = function() {
        compass.init(function(orientation) {
            game.changePlayerOrientation(orientation);
        });
        game.start();
    };

    ViewModel.prototype.playSound = function() {
        sm.backgroundMusic.playSound(o(), 10);
    };

    ViewModel.prototype.shoot = function() {
        game.shoot();
    };

    ViewModel.prototype.restart = function() {
        game.restart();
    };


    ko.applyBindings(new ViewModel());

}(this));

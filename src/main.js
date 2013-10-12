(function(w) {
    'use strict';

    var P = w.P,
        compass = P.compass,
        game = P.game,
        sm = P.soundManager,

        ViewModel = function() {
            this.player = game.currentPlayer;
            this.creatures = game.creatures;
            this.compassNotAvailable = compass.compassNotAvailable;
        };

    ViewModel.prototype.startApp = function() {
        compass.init(function(orientation) {
            game.changePlayerOrientation(orientation);
        });
        game.start();
    };

    ViewModel.prototype.playSound = function() {
        sm.backgroundMusic.playSound();
        setTimeout(function() {
            sm.backgroundMusic.playSound();
        }, 3000)
    };

    ViewModel.prototype.shoot = function() {
        game.shoot();
    };

    ViewModel.prototype.restart = function() {
        game.restart();
    };

    sm.init(function() {});
    ko.applyBindings(new ViewModel());

}(this));

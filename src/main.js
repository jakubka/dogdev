(function(w) {
    'use strict';

    var P = w.P,
        compass = P.compass,
        game = P.game,

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

    ViewModel.prototype.shoot = function() {
        game.shoot();
    };

    ViewModel.prototype.restart = function() {
        game.restart();
    };


    ko.applyBindings(new ViewModel());

}(this));

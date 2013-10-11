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

    ViewModel.prototype.shoot = function() {
        game.shoot();
    };

    ViewModel.prototype.restart = function() {
        game.restart();
    };

    compass.init(function(orientation) {
        game.changePlayerOrientation(orientation);
    });

    game.start();
    ko.applyBindings(new ViewModel());

}(this));

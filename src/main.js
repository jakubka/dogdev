(function(w) {
    'use strict';

    var P = w.P,
        doc = w.document,
        compass = P.compass,
        game = P.game,
        sm = P.soundManager,
        vm,

        ViewModel = function() {
            this.player = game.currentPlayer;
            this.creatures = game.creatures;
            this.compassNotAvailable = compass.compassNotAvailable;
            this.orientation = o;
        };

    ViewModel.prototype.startApp = function() {
        // simmulate user's click to play first sound
        var startBtn = doc.getElementById("start");
        start.click();

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

    vm = new ViewModel();
    ko.applyBindings(vm);
    sm.init(function() {
        vm.startApp();
    });

    // sm.init, dej mu jako callback startovani hry
    // clickni na button
    // pust prehrani libovolneho zvuku

}(this));

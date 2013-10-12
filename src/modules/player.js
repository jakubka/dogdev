(function(w) {
    'use strict';

    var P = w.P,
        nextPlayerId = 0,
        ko = w.ko,
        shot = P.shot,

        Player = function() {
            this.id = nextPlayerId++;
            this.name = ko.observable();
            this.orientation = ko.observable();
            this.fragsCount = ko.observable();
            this.health = ko.observable(100);
            this.isAlive = ko.observable();
        };

    Player.prototype.init = function(username, orientation) {
        this.name(this.name() || username);
        this.orientation(this.orientation() || orientation);
        this.fragsCount(0);
        this.isAlive(true);
    };

    Player.prototype.die = function() {
        this.health(this.health() - 20);
        if (this.health() <= 0) {
            this.isAlive(false);
        }
    };

    Player.prototype.restart = function() {
        this.init();
    };

    P.Player = Player;

}(this));

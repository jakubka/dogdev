(function(w) {
    'use strict';

    var P = w.P,
        nextPlayerId = 0,
        ko = w.ko,
        shot = P.shot,

        Player = function(username) {
            this.id = nextPlayerId++;
            this.name = username || "defaultname";
            this.orientation = ko.observable();
            this.fragsCount = ko.observable(0);
            this.isDead = ko.observable(false);
            this.isAlive = ko.observable(true);
        };

    Player.prototype.shoot = function() {
        var that = this;
        shot.shoot(this.orientation(), Creatures, function() {
            that.fragsCount(that.fragsCount() + 1);
        });
    };

    Player.prototype.die = function() {
        this.isDead(true);
        this.isAlive(false);
    };

    P.Player = Player;

}(this));

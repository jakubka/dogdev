(function(w) {

    'use strict';

    var P = w.P,
        ko = w.ko,
        nextCreatureId = 0,
        s = P.settings,

        Creature = function(orientation) {
            var that = this;
            
            this.id = nextCreatureId++;
            this.distanceFromPlayer = ko.observable(100);
            this.orientation = ko.observable(orientation);
            this.distanceFromPlayer.subscribe(function(distanceFromPlayer) {
                if (distanceFromPlayer === 0) {
                    that.hit && hit();
                }
            });
        };

    Creature.prototype.moveCloser = function() {
        var newDistance = this.distanceFromPlayer() - (100 / s.TimeToReachPlayer);
        this.distanceFromPlayer(Math.max(newDistance, 0));
    };

    Creature.prototype.startMoving = function() {
        var that = this;
        setInterval(function() {
            that.moveCloser();
        }, 1000);
    };

    P.Creature = Creature;

}(this));

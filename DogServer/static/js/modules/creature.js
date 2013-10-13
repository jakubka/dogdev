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
        };

    Creature.prototype.move = function() {
        var newDistance = this.distanceFromPlayer() - (50 / s.timeToReachPlayer());
        if (newDistance > 1) {
            this.distanceFromPlayer(newDistance);
            this.onMoved && this.onMoved(this);
        } else {
            this.onHit && this.onHit();
        }
    };

    Creature.prototype.startMoving = function() {
        var that = this;
        this.intervalId = setInterval(function() {
            that.move && that.move();
        }, 500);
    };

    Creature.prototype.dispose = function() {
        clearInterval(this.intervalId);
    };

    Creature.prototype.die = function() {
        this.dispose();
        this.onDied && this.onDied();
    };

    P.Creature = Creature;
}(this));

(function(w) {

    'use strict';

    var P = w.P,
        ko = w.ko,
        nextCreatureId = 0,

        Creature = function(orientation) {
            this.id = nextCreatureId++;
            this.distanceFromPlayer = ko.observable(100);
            this.orientation = ko.observable(orientation);
        };

    Creature.prototype.moveCloser = function() {
        this.distanceFromPlayer(Math.max(this.distanceFromPlayer() - 5, 0));
    };

    Creature.prototype.startMoving = function() {
        var that = this;
        setInterval(function() {
            that.moveCloser();
        }, 1000);
    };

    P.Creature = Creature;

}(this));

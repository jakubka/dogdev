(function(w) {

    'use strict';

    var P = w.P,
        ko = w.ko,
        nextCreatureId = 0,

        Creature = function(orientation) {
            this.id = nextCreatureId++;
            this.distanceFromPlayer = ko.observable();
            this.orientation = ko.observable(orientation);
        };

    P.Creature = Creature;

}(this));

(function(w) {

    'use strict';

    var P = w.P,
        ko = w.ko,

        Creature = function(orientation) {
            this.distanceFromPlayer = ko.observable();
            this.orientation = ko.observable(orientation);
        };

    P.Creature = Creature;

}(this));

(function(w) {
    'use strict';

    var P = w.P,
        ko = w.ko,

        Creature = function() {
            this.distanceFromPlayer = ko.observable();
            this.orientation = ko.observable();
        };

    P.Creature = Creature;

}(this));

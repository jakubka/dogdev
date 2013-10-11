(function(w) {
    'use strict';

    var P = w.P,
        ko = w.ko,
        creatures = ko.observableArray();

        creatures.kill = function(creature) {
            var index = this.indexOf(creature);
            if (index > -1) {
                this.splice(index, 1);
                creature.died && creature.died();
            }
        };

    // expose module
    P.creaturesList = creatures;

}(this));

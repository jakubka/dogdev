(function(w) {
    'use strict';

    var P = w.P,
        ko = w.ko,
        Creature = P.Creature,
        creatures = ko.observableArray();

    creatures.kill = function(creature) {
        var index = this.indexOf(creature);
        if (index > -1) {
            this.splice(index, 1);
            creature.die();
        }
    };

    creatures.creatureDied = function(c) {}
    creatures.creatureHitPlayer = function(c) {}

    creatures.generateCreature = function() {
        var orientation = Math.floor(Math.random() * 360),
            c = new Creature(orientation);

        creatures.push(c);
        c.startMoving();
        c.died = function() {
            creatures.creatureDied(c);
        };
        c.hit = function() {
            creatures.creatureHitPlayer(c);
        };
    };

    // expose module
    P.creaturesList = creatures;

}(this));

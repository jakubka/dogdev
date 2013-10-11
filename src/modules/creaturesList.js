(function(w) {
    'use strict';

    var P = w.P,
        ko = w.ko,
        settings = P.settings,
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

    creatures.init = function() {
        for (var i = 0; i < settings.NumberOfCreaturesAtTheBeginning; i++) {
            creatures.generateCreature();
        }
    };

    creatures.restart = function() {
        creatures.removeAll();
        creatures.init();
    };

    // expose module
    P.creaturesList = creatures;

}(this));

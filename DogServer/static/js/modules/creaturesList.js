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

    creatures.generateCreature = function() {
        var orientation = Math.floor(Math.random() * 360),
            c = new Creature(orientation);

        creatures.push(c);
        c.startMoving();
        c.onDied = function() {
            creatures.onCreatureDied(c);
        };
        c.onHit = function() {
            creatures.onCreatureHitPlayer(c);
        };
        c.onMoved = function() {
            creatures.onCreatureMoved(c);
        };
        creatures.onCreatureSpawned(c);
    };

    creatures.init = function() {
        for (var i = 0; i < settings.numberOfCreaturesAtTheBeginning(); i++) {
            creatures.generateCreature();
        }
    };

    creatures.stop = function() {
        ko.utils.arrayForEach(creatures(), function(c) {
            c.dispose();
        });
        creatures.removeAll();
    };

    creatures.restart = function() {
        creatures.stop();
        creatures.init();
    };

    creatures.getFirstCreature = function() {
        if (creatures().length === 0) {
            return null;
        }
        return creatures()[0];
    };

    // expose module
    P.creaturesList = creatures;

}(this));

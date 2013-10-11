(function(w) {
    'use strict';

    var $ = w.$,
        P = w.P,
        Player = P.Player,
        Creature = P.Creature,
        Creatures = P.creaturesList,
        Marian,
        compass = P.compass,
        shot = P.shot,
        i = 0,
        ViewModel;

    Marian = new Player("Marian");
    Marian.orientation(111);

    compass.init({
        'orientationUpdateCallback': function(orientation) {
            Marian.orientation(orientation);
        },
        'compassNotAvailableCallback': function() {
            //alert('Compass is not available on your device, buy a new one please');
        }
    });

    for (i; i < 10; i++) {
        Creatures.push(new Creature(i * 36));
    }

    ViewModel = function() {
        this.playerOrientation = Marian.orientation;
        this.creatures = Creatures;
        this.shoot = function() {
            shot.shoot(Marian.orientation(), Creatures);
        }
    };

    ko.applyBindings(new ViewModel());

    // expose for debugging
    w.Creatures = Creatures;

}(this));

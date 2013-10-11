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

    var compassNotAvailable = ko.observable(false);

    compass.init({
        'orientationUpdateCallback': function(orientation) {
            Marian.orientation(orientation);
        },
        'compassNotAvailableCallback': function() {
            compassNotAvailable(true);
        }
    });

    for (i; i < 10; i++) {
        var c = new Creature(i * 36);
        Creatures.push(c);
        c.startMoving();
    }

    ViewModel = function() {
        this.playerOrientation = Marian.orientation;
        this.creatures = Creatures;
        this.shoot = function() {
            shot.shoot(Marian.orientation(), Creatures);
        };
        this.compassNotAvailable = compassNotAvailable;
    };

    ko.applyBindings(new ViewModel());

    // expose for debugging
    w.Creatures = Creatures;

}(this));

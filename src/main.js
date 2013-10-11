(function(w) {
    'use strict';

    var $ = w.$,
        P = w.P,
        Player = P.Player,
        Creatures = P.creaturesList,
        Marian,
        compass = P.compass,
        i = 0,
        shot = P.shot,
        ViewModel,
        settings = P.settings;

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

    Creatures.creatureDied = function(c) {
        setTimeout(function() {
            Creatures.generateCreature();
        }, settings.TimeToRecreateCreature * 1000);
    };

    Creatures.creatureHitPlayer = function(c) {
        Marian.die();
    }

    for (var i = 0; i < settings.NumberOfCreaturesAtTheBeginning; i++) {
        Creatures.generateCreature();
    }

    ViewModel = function() {
        this.playerOrientation = Marian.orientation;
        this.playerFragsCount = Marian.fragsCount;
        this.playerIsAlive = Marian.isAlive;
        this.creatures = Creatures;
        this.compassNotAvailable = compassNotAvailable;
    };

    ViewModel.prototype.shoot = function() {
        Marian.shoot();
    };

    ko.applyBindings(new ViewModel());

    // expose for debugging
    w.Creatures = Creatures;

}(this));

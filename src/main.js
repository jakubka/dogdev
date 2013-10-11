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

    var generateCreature = function() {
        var orientation = Math.floor(Math.random() * 360);
        var c = new Creature(orientation);
        Creatures.push(c);
        c.startMoving();
        c.died = creatureDied;
    };

    var creatureDied = function () {
        setTimeout(generateCreature, settings.TimeToRecreateCreature * 1000);
    };

    for (var i = 0; i < settings.NumberOfCreaturesAtTheBeginning; i++) {
        generateCreature();
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

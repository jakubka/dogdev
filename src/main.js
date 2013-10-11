(function(w) {
    'use strict';

    var $ = w.$,
        P = w.P,
        Player = P.Player,
        Creature = P.Creature,
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

    var generateCreature = function() {
        var orientation = Math.floor(Math.random() * 360);
        var c = new Creature(orientation);
        Creatures.push(c);
        c.startMoving();
        c.died = creatureDied;
        c.hit = function() {
            Marian.die();
        };
    };

    var creatureDied = function () {
        setTimeout(generateCreature, settings.TimeToRecreateCreature * 1000);
    };

    for (var i = 0; i < settings.NumberOfCreaturesAtTheBeginning; i++) {
        generateCreature();
    }

    ViewModel = function() {
        this.playerOrientation = Marian.orientation;
        this.playerFragsCount = Marian.fragsCount;
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

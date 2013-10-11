(function(w) {
    'use strict';

    var $ = w.$,
        P = w.P,
        Player = P.Player,
        Creature = P.Creature,
        Creatures = [],
        Marian,
        compass = P.compass,
        shot = P.shot,
        i = 0;

    for (i; i < 10; i++) {
        Creatures.push(new Creature());
    }

    Marian = new Player("Marian");

    compass.init({
        'orientationUpdateCallback': function(orientation) {

            Marian.orientation(orientation);
        },
        'compassNotAvailableCallback': function() {
            alert('Compass is not available on your device, buy a new one please');
        }
    });

    Marian.orientation.subscribe(function(newOrientation) {
        $('#msg').text('Marian\'s orientation: ' + newOrientation);
    });

    $('#trigger').on('click', function () {
        shot.shoot(Marian.orientation(), creatures);
    });

    // expose for debugging
    w.Creatures = Creatures;

}(this));

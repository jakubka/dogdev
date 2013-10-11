(function(w) {
    var $ = w.$,
        P = w.P,
        Player = P.Player,
        Creature = P.Creature,
        Creatures = [],
        Marian = new Player("Marian"),
        compass = P.compass,
        i = 0;

    for (i; i < 10; i++) {
        Creatures.push(new Creature());
    }

    // expose for debuggine
    w.Creatures = Creatures;


    var compassSettings = {
        'orientationUpdateCallback': function(orientation) {
            $('#msg').text('Your orientation: ' + orientation);
        },
        'compassNotAvailableCallback': function() {
            alert('Compass is not available on your device, buy a new one please');
        }
    };

    compass.init(compassSettings);
}(this));

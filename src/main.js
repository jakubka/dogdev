(function(w) {
    var $ = w.$,
        P = w.P,
        hwMod = P.hwModule,
        compass = P.compass;


    hwMod.sayHello();

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

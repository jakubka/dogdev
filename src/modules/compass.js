(function(w) {
    'use strict';

    var P = w.P,
        compass = {};

    compass.init = function(settings) {
        var compassNotAvailableCallback = settings.compassNotAvailableCallback,
            orientationUpdateCallback = settings.orientationUpdateCallback,
            notAvailableCalled = false,
            notAvailableFunc = function() {
                if (!notAvailableCalled) {
                    compassNotAvailableCallback && compassNotAvailableCallback();
                    notAvailableCalled = true;
                }
            };

        Compass.noSupport(notAvailableFunc);
        Compass.needGPS(notAvailableFunc);

        Compass.watch(function(orientation) {
            orientationUpdateCallback && orientationUpdateCallback(orientation);
        });
    };

    // expose module
    P.compass = compass;

}(this))

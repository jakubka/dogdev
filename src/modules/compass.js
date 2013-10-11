(function(w) {
    'use strict';

    var P = w.P,
        compass = {};

    compass.init = function(settings) {
        var compassNotAvailableCallback = settings.compassNotAvailableCallback,
            orientationUpdateCallback = settings.orientationUpdateCallback,
            notAvailableCalled = false,
            notAvailableFunc = function() {
                compass.compassNotAvailable(true);
            };

        Compass.noSupport(notAvailableFunc);
        Compass.needGPS(notAvailableFunc);

        Compass.watch(function(orientation) {
            orientationUpdateCallback && orientationUpdateCallback(Math.floor(orientation));
        });
    };

    compass.compassNotAvailable = ko.observable(false);

    // expose module
    P.compass = compass;

}(this))

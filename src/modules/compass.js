(function(w) {
    'use strict';

    var P = w.P,
        compass = {};

    compass.init = function(orientationUpdateCb) {
        var notAvailableFunc = function() {
                compass.compassNotAvailable(true);
            };

        Compass.noSupport(notAvailableFunc);
        Compass.needGPS(notAvailableFunc);

        Compass.watch(function(orientation) {
            orientationUpdateCb && orientationUpdateCb(Math.floor(orientation));
        });
    };

    compass.compassNotAvailable = ko.observable(false);

    // expose module
    P.compass = compass;

}(this))

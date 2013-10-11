(function(w) {
    var P = w.P,
        compassModule = {},
        orientationUpdateCallback = null;

    compassModule.init = function(settings) {
        var compassNotAvailableCallback = settings.compassNotAvailableCallback;
        orientationUpdateCallback = settings.orientationUpdateCallback;

        Compass.noSupport(function() {
            compassNotAvailableCallback && compassNotAvailableCallback();
        });
        Compass.needGPS(function() {
            compassNotAvailableCallback && compassNotAvailableCallback();
        });

        Compass.watch(function(heading) {
            if (orientationUpdateCallback) {
                orientationUpdateCallback(heading);
            }
        });
    }

    // expose module
    P.compass = compassModule;

}(this))

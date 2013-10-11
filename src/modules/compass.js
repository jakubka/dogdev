(function(w) {
    var P = w.P,
        compassModule = {};

    compassModule.init = function(settings) {
        var compassNotAvailableCallback = settings.compassNotAvailableCallback,
            orientationUpdateCallback = settings.orientationUpdateCallbackm,
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
    }

    // expose module
    P.compass = compassModule;

}(this))

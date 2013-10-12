(function(w) {
    'use strict';

    var P = w.P,
        hub = {};

    // simmulate data downloading
    setInterval(function() {
        hub.onDataReceived && hub.onDataReceived({
            isGameStarted: true,
            playerOrientation: Math.floor(Math.random() * 360),
            playerHealth: 80,
            creatureOrientation: Math.floor(Math.random() * 360),
            creatureDistance: Math.floor(Math.random() * 100),
            fragsCount: 12
        });
    }, 1000);

    hub.init = function(onDataReceived) {
        this.onDataReceived = onDataReceived;
    }

    // expose module
    P.hub = hub;

}(this))

(function(w) {
    'use strict';

    var P = w.P,
        logsReceiver = {};

    logsReceiver.init = function(onDataReceived) {
        //var presentationHub = $.connection.presentationHub;
        //presentationHub.client.displayState = function(gameState) {
        //    onDataReceived(gameState);
        //};
        //$.connection.hub.start();
        
        setInterval(function () {
            onDataReceived && onDataReceived({
                isGameStarted: true,
                playerOrientation: Math.floor(Math.random() * 360),
                playerHealth: 80,
                creatureOrientation: Math.floor(Math.random() * 360),
                creatureDistance: Math.floor(Math.random() * 100),
                fragsCount: 12
            });
        }, 1000);
    };

    // expose module
    P.logsReceiver = logsReceiver;

}(this))
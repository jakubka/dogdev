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
                IsGameStarted: true,
                PlayerOrientation: Math.floor(Math.random() * 360),
                PlayerHealth: 80,
                CreatureOrientation: Math.floor(Math.random() * 360),
                CreatureDistance: 100,
                FragsCount: 12,
            });
        }, 300);
    };

    // expose module
    P.logsReceiver = logsReceiver;

}(this))
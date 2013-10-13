(function(w) {
    'use strict';

    var P = w.P,
        logsReceiver = {};

    logsReceiver.init = function(onDataReceived) {
        var presentationHub = $.connection.presentationHub;
        presentationHub.client.displayState = function(gameState) {
            onDataReceived(gameState);
        };
        $.connection.hub.start();
    };

    // expose module
    P.logsReceiver = logsReceiver;

}(this))
(function(w) {
    'use strict';

    var P = w.P,
        logsSender = {},
        presentationHub = $.connection.presentationHub;

    logsSender.sendGameState = function (gameState) {
        console.log(gameState);
        presentationHub.server.logState(gameState);
    };

    logsSender.init = function() {
        $.connection.hub.start();
    };

    // expose module
    P.logsSender = logsSender;

}(this))
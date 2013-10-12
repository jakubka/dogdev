(function(w) {
    'use strict';

    var P = w.P,
        logsSender = {},
        presentationHub = $.connection.presentationHub,
        initialized = false;

    logsSender.sendGameState = function (gameState) {
        console.log(gameState);
        initialized && presentationHub.server.logState(gameState);
    };

    logsSender.init = function() {
        $.connection.hub.start().done(function() {
            initialized = true;
        });
    };

    // expose module
    P.logsSender = logsSender;

}(this))
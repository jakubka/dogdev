(function (w) {
    'use strict';

    var P = w.P,
        logsSender = {};

    logsSender.init = function (onDataReceived) {
        var presentationHub = $.connection.presentationHub;
        $.connection.hub.start().done(function () {

            $("#btnLogState").click(function () {
                var state = {
                    IsGameStarted: true,
                    PlayerOrientation: 123,
                    PlayerHealth: 4,
                    CreatureOrientation: null,
                    CreatureDistance: 65,
                    FragsCount: 0
                };

                presentationHub.server.logState(state);
            });
        });

    };

    // expose module
    P.logsSender = logsSender;

}(this))
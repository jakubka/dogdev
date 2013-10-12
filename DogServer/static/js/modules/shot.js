(function(w) {
    'use strict';

    var P = w.P,
        shot = {},
        ko = w.ko,
        s = P.settings;

    shot.shoot = function(shotOrientation, creatures) {
        var creaturesArray = creatures(),
            creaturesToKill = [];

        ko.utils.arrayForEach(creaturesArray, function(creature) {
            var shotDistance = Math.abs(shotOrientation - creature.orientation()),
                shotDistanceTolerance = s.shotDistanceTolerance();

            if (shotDistance < shotDistanceTolerance || shotDistance > (360 - shotDistanceTolerance)) {
                creaturesToKill.push(creature);
            }
        });

        ko.utils.arrayForEach(creaturesToKill, function(creature) {
            creatures.kill(creature);
        });
    };

    // expose module
    P.shot = shot;

}(this))

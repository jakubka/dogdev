(function(w) {
    'use strict';

    var P = w.P,
        shot = {};

    shot.shoot = function(shotOrientation, creatures) {
        for (var creature in creatures) {
            if (!creatures.hasOwnProperty(creature)) {
                continue;
            }

            var shotDistance = abs(shotOrientation - creature.orientation());

            if (shotDistance < 20 || shotDistance > 340) {
                creatures.kill(creature);
            }
        }
    };

    // expose module
    P.shot = shot;

}(this))

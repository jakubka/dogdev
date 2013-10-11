(function(w) {
    'use strict';

    var P = w.P,
        shot = {},
        ko = w.ko,
        s = P.settings;

    shot.shoot = function(shotOrientation, creatures, onShootedCb) {
        var creaturesArray = creatures(),
            creaturesToKill = [];

        ko.utils.arrayForEach(creaturesArray, function(creature) {
            console.log(creature.orientation());
            var shotDistance = Math.abs(shotOrientation - creature.orientation());

            console.log("distance from creature: " + shotDistance);
            if (shotDistance < s.ShotDistanceTolerance || shotDistance > (360 - s.ShotDistanceTolerance)) {
                console.log("creature to kill: " + creature.orientation());
                creaturesToKill.push(creature);
            }
        });

        ko.utils.arrayForEach(creaturesToKill, function(creature) {
            console.log("killing: " + creature.orientation());
            creatures.kill(creature);
            onShootedCb && onShootedCb();
        });
    };

    // expose module
    P.shot = shot;

}(this))

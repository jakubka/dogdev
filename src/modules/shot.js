(function(w) {
    'use strict';

    var P = w.P,
        shot = {},
        ko = w.ko;

    shot.shoot = function(shotOrientation, creatures) {
        var creaturesArray = creatures(),
            creaturesToKill = [];

        ko.utils.arrayForEach(creaturesArray, function(creature) {
            console.log(creature.orientation());
            var shotDistance = Math.abs(shotOrientation - creature.orientation());

            console.log("distance from creature: " + shotDistance);
            if (shotDistance < 20 || shotDistance > 340) {
                console.log("creature to kill: " + creature.orientation());
                creaturesToKill.push(creature);
            }
        });

        ko.utils.arrayForEach(creaturesToKill, function(creature) {
            console.log("killing: " + creature.orientation());
            creatures.kill(creature);
        });
    };

    // expose module
    P.shot = shot;

}(this))

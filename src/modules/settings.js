(function(w) {
    'use strict';

    var P = w.P,
        s = {};

    s.ShotDistanceTolerance = 180; // degrees from each side of shot
    s.TimeToReachPlayer = 20; // seconds
    s.TimeToRecreateCreature = 1; // seconds
    s.NumberOfCreaturesAtTheBeginning = 1;

    // expose module
    P.settings = s;

}(this))

(function(w) {
    'use strict';

    var P = w.P,
        s = {};

    s.ShotDistanceTolerance = 40; // degrees from each side of shot
    s.TimeToReachPlayer = 2; // seconds
    s.TimeToRecreateCreature = 1; // seconds
    s.NumberOfCreaturesAtTheBeginning = 1;

    // expose module
    P.settings = s;

}(this))

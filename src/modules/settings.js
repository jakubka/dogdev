(function(w) {
    'use strict';

    var P = w.P,
        ko = w.ko,
        s = {},

        generateSettingGetter = function(name, startingVal, changeInterval, changeCb) {
            var curVal = ko.observable(startingVal);
            if (changeInterval) {
                setInterval(function() {
                    curVal(changeCb(curVal()));
                }, changeInterval);
            }

            return curVal;
        };

    // degrees from each side of shot
    s.shotDistanceTolerance = generateSettingGetter('ShotDistanceTolerance', 40, 5000, function(val) {
        return (val > 20 ? --val : val);
    });
    s.timeToReachPlayer = generateSettingGetter('TimeToReachPlayer', 20, 5000, function(val) {
        return (val > 5 ? --val : val);
    }); // seconds
    s.timeToRecreateCreature = generateSettingGetter('TimeToRecreateCreature', 5); // seconds
    s.numberOfCreaturesAtTheBeginning = generateSettingGetter('NumberOfCreaturesAtTheBeginning', 1);

    // expose module
    P.settings = s;

}(this))

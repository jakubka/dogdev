(function(w) {
    'use strict';

    var P = w.P,
        s = {},

        generateSettingGetter = function(name, startingVal, changeInterval, changeCb) {
            var curVal = startingVal;
            if (changeInterval) {
                setInterval(function() {
                    curVal = changeCb(curVal);
                }, changeInterval);
            }

            return function() {
                console.log(name + " -> " + curVal);
                return curVal;
            }
        };

    // degrees from each side of shot
    s.ShotDistanceTolerance = generateSettingGetter('ShotDistanceTolerance', 40, 5000, function(val) {
        return (val >= 20 ? --val : val);
    });
    s.TimeToReachPlayer = generateSettingGetter('TimeToReachPlayer', 20, 5000, function(val) {
        return (val >= 5 ? --val : val);
    }); // seconds
    s.TimeToRecreateCreature = generateSettingGetter('TimeToRecreateCreature', 3); // seconds
    s.NumberOfCreaturesAtTheBeginning = generateSettingGetter('NumberOfCreaturesAtTheBeginning', 1);

    // expose module
    P.settings = s;

}(this))

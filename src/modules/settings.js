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

    s.init = function() {
        // degrees from each side of shot
        this.shotDistanceTolerance = generateSettingGetter('ShotDistanceTolerance', 40, 5000, function(val) {
            return (val > 20 ? --val : val);
        });
        this.timeToReachPlayer = generateSettingGetter('TimeToReachPlayer', 10, 5000, function(val) {
            return (val > 5 ? --val : val);
        }); // seconds
        this.timeToRecreateCreature = generateSettingGetter('TimeToRecreateCreature', 5); // seconds
        this.numberOfCreaturesAtTheBeginning = generateSettingGetter('NumberOfCreaturesAtTheBeginning', 1);

        return s;
    };

    s.debugMode = ko.observable(true);

    // expose module
    P.settings = s;

}(this))

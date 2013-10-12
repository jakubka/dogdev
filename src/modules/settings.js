(function(w) {
    'use strict';

    var P = w.P,
        ko = w.ko,
        s = {},
        settingsKeys = [],

    generateSettingGetter = function(name, startingVal, changeInterval, changeCb) {
        var curVal = ko.observable(startingVal);
        curVal.setToDefault = function () {
            this(startingVal);
        };
        if (changeInterval) {
            setInterval(function() {
                curVal(changeCb(curVal()));
            }, changeInterval);
        }
        settingsKeys.push(curVal);
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

    s.restart = function() {
        ko.utils.arrayForEach(settingsKeys, function(settingsKey) {
            settingsKey.setToDefault();
        });
    };

    s.debugMode = ko.observable(true);

    // expose module
    P.settings = s;

}(this))

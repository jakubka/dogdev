(function(w) {
    'use strict';

    var P = w.P,
        ko = w.ko,
        s = P.settings,
        Sound = P.Sound,
        sm = {},
        soundsToLoad = 0,

        soundInstanceCreatedCb = function() {
            soundsToLoad--;
            if (soundsToLoad === 0) {
                // jsou stazene vsechny zvuky
                console.log('sound loaded');
                sm.onAllLoadedCb && sm.onAllLoadedCb();
            }
        },

        createSoundInstance = function(samplename) {
            soundsToLoad++;
            var sound = new Sound(samplename, soundInstanceCreatedCb);

            return {
                startSpatial: function(orientation, distance) {
                    sound.startSpatial(orientation, distance);
                },
                start: function() {
                    sound.start();
                },
                stop: function() {
                    sound.stop();
                },
                changeDistanceAndAngle: function(orientation, distance) {
                    sound.changeSoundPosition(orientation, distance);
                }
            };
        };


    sm.startBackgroundMusic = function() {
        this.backgroundMusic.start();
    };

    sm.stopBackgroundMusic = function() {
        this.backgroundMusic.stop();
    };

    sm.playCreatureHit = function() {
        this.creatureHit.start();
    };

    sm.playShot = function() {
        this.shot.start();
    };

    sm.playCreatureDie = function() {
        this.creatureDie.start();
    };

    sm.startCreatureNoise = function(creatureId, orientation, distance) {
        this.creatureNoise.startSpatial(orientation, distance);
        // var noise = createSoundInstance('../sounds/zombie_walk_1.mp3');
        // noise.startSpatial(orientation, distance);
        // this.creaturesNoises[creatureId] = noise;
    };

    sm.stopCreatureNoise = function(creatureId) {
        this.creatureNoise.stop();
        // this.creaturesNoises[creatureId].stop();
        // delete this.creaturesNoises[creatureId];
    };

    sm.changeCreatureNoise = function(creatureId, orientation, distance) {
        this.creatureNoise.changeDistanceAndAngle(orientation, distance);
        // this.creaturesNoises[creatureId].changeDistanceAndAngle(orientation, distance);
    };

    sm.stopAll = function() {
        this.backgroundMusic.stop();

        var creatureIdsToRemove = [];
        for (var creatureId in creaturesNoises) {
            if (object.hasOwnProperty(property)) {
                creatureIdsToRemove.push(creatureId);
            }
        }

        for (var i = creatureIdsToRemove.length - 1; i >= 0; i--) {
            stopCreatureNoise(creatureIdsToRemove[i]);
        };
    };

    sm.init = function(onAllLoadedCb) {
        this.backgroundMusic = createSoundInstance('../sounds/background_beating_heart.m4a');
        this.creatureHit = createSoundInstance('../sounds/zombie_bite_1.m4a', 0.6);
        this.shot = createSoundInstance('../sounds/gun_fire_1.m4a', 0.4);
        this.creatureDie = createSoundInstance('../sounds/zombie_laugh_1.m4a', 0.6);
        this.creatureNoise = createSoundInstance('../sounds/zombie_walk_1_long.m4a');
        // this.creaturesNoises = {}; // creatureId -> Sound

        this.onAllLoadedCb = onAllLoadedCb;
    };

    // expose module
    P.soundManager = sm;

}(this))

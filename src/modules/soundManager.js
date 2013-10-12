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

        createSoundInstance = function(samplename, volume, loop) {
            soundsToLoad++;
            var sound = new Sound(samplename, soundInstanceCreatedCb, volume, loop);
            


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
        this.creatureDie[this.creatureDieId].start();
    };

    sm.startCreatureNoise = function(creatureId, orientation, distance) {
        this.creatureNoise[this.creatureNoiseId].startSpatial(orientation, distance);
    };

    sm.stopCreatureNoise = function(creatureId) {
        ko.utils.arrayForEach(this.creatureNoise, function(n) {
            n.stop();
        });
    };

    sm.changeCreatureNoise = function(creatureId, orientation, distance) {
        this.creatureNoise[this.creatureNoiseId].changeDistanceAndAngle(orientation, distance);
    };

    sm.stopAll = function() {
        this.backgroundMusic.stop();
        this.creatureHit.stop();
        this.shot.stop();
        this.creatureDie.stop();
        this.creatureNoise.stop();
    };

    sm.init = function(onAllLoadedCb) {
        this.backgroundMusic = createSoundInstance('../sounds/background_beating_heart.m4a', 1.0, true);
        this.creatureHit = createSoundInstance('../sounds/zombie_bite_1.m4a', 0.6);
        this.shot = createSoundInstance('../sounds/gun_fire_1.m4a', 0.4);
        this.creatureDie = 
            [
                createSoundInstance('../sounds/zombie_kill_1.m4a', 0.6, false),
                createSoundInstance('../sounds/zombie_kill_2.m4a', 0.3, false),
            ]
        this.creatureNoise = 
            [
                createSoundInstance('../sounds/zombie_walk_1_short.m4a', 1.0, true),
                createSoundInstance('../sounds/zombie_walk_2_short.m4a', 1.0, true),
                createSoundInstance('../sounds/zombie_walk_3_short.m4a', 1.0, true),
            ];
        // this.creaturesNoises = {}; // creatureId -> Sound

        this.creatureNoiseId = 1;
        this.creatureDieId = 0;

        this.onAllLoadedCb = onAllLoadedCb;
    };

    // expose module
    P.soundManager = sm;

}(this))

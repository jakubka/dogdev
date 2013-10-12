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
        this.backgroundMusic[this.musicBackgroundId].start();
    };

    sm.stopBackgroundMusic = function() {
        ko.utils.arrayForEach(this.backgroundMusic, function(n) {n.stop();});
    };

    sm.playCreatureHit = function() {
        this.creatureHitId = Math.floor(Math.random() * this.creatureHit.length);
        this.creatureHit[this.creatureHitId].start();
    };

    sm.playShot = function() {
        // this.shotId = ++this.shotId % this.shot.length;        
        this.shot[this.shotId].start();
    };

    sm.playCreatureDie = function() {
        this.creatureDie[this.creatureDieId].start();
    };

    sm.startCreatureCreate = function(creatureId, orientation, distance) {

    }

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
        ko.utils.arrayForEach(this.backgroundMusic, function(n) {n.stop();});
        ko.utils.arrayForEach(this.creatureHit, function(n) {n.stop();});
        ko.utils.arrayForEach(this.shot, function(n) {n.stop();});
        ko.utils.arrayForEach(this.creatureNoise, function(n) {n.stop();});
    };

    sm.init = function(onAllLoadedCb) {
        this.backgroundMusic =
            [
                createSoundInstance('../sounds/background_beating_heart.m4a', 1.0, true),
            ];
        this.creatureHit = 
            [
                createSoundInstance('../sounds/zombie_bite_1.m4a', 0.6, false),
                createSoundInstance('../sounds/zombie_bite_3.m4a', 0.6, false),
                createSoundInstance('../sounds/zombie_bite_4.m4a', 0.6, false),
            ];
        this.shot = 
            [
                createSoundInstance('../sounds/gun_fire_1.m4a', 0.4, false),
                createSoundInstance('../sounds/gun_fire_2.m4a', 0.6, false),
                createSoundInstance('../sounds/gun_fire_3.m4a', 0.4, false),
                createSoundInstance('../sounds/gun_fire_4.m4a', 0.6, false),
                createSoundInstance('../sounds/gun_fire_5.m4a', 0.4, false),
                createSoundInstance('../sounds/gun_fire_6.m4a', 0.8, false),
                createSoundInstance('../sounds/gun_fire_8.m4a', 0.7, false),
            ];
        this.creatureDie = 
            [
                createSoundInstance('../sounds/zombie_kill_1.m4a', 0.6, false),
                createSoundInstance('../sounds/zombie_kill_2.m4a', 0.3, false),
            ];
        this.creatureNoise = 
            [
                createSoundInstance('../sounds/zombie_walk_1_short.m4a', 1.0, true),
                createSoundInstance('../sounds/zombie_walk_2_short.m4a', 1.0, true),
                createSoundInstance('../sounds/zombie_walk_3_short.m4a', 1.0, true),
            ];
        

        this.creatureNoiseId = 1;
        this.creatureDieId = 0;
        this.creatureHitId = 2;
        this.musicBackgroundId = 0;
        this.shotId = 6;

        this.onAllLoadedCb = onAllLoadedCb;
    };

    // expose module
    P.soundManager = sm;

}(this))

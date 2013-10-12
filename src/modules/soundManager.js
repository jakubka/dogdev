(function(w) {
    'use strict';

    var P = w.P,
        ko = w.ko,
        s = P.settings,
        CreateSound = P.CreateSound,
        sm = {},
        soundsToLoad = 0,
        onAllLoadedCbCalled = false,

        soundInstanceCreatedCb = function() {
            soundsToLoad--;
            setTimeout(function() {
                if (!onAllLoadedCbCalled && soundsToLoad === 0) {
                    // jsou stazene vsechny zvuky
                    onAllLoadedCbCalled = true;
                    console.log('sound loaded');
                    sm.onAllLoadedCb && sm.onAllLoadedCb();
                }
            }, 200);
        },

        createSoundInstance = function(samplename) {
            soundsToLoad++;

            var sound = new CreateSound(samplename, soundInstanceCreatedCb);
            return {
                stop: function() {
                    sound.stop();
                },
                play: function() {
                    sound.play();
                },
                changeDistanceAndAngle: function(orientation, distance) {
                    // console.log('orientation: ' + orientation + ' distance: ' + distance);
                }
            };
        };

    sm.startBackgroundMusic = function() {
        this.backgroundMusic.play();
    };

    sm.stopBackgroundMusic = function() {
        this.backgroundMusic.stop();
    };

    sm.playCreatureHit = function() {
        this.creatureHit.play();
    };

    sm.playShot = function() {
        this.shot.play();
    };

    sm.playCreatureDie = function() {
        this.creatureDie.play();
    };

    sm.startCreatureNoise = function(creatureId, orientation, distance) {
        this.noise.play();
        this.noise.changeDistanceAndAngle(orientation, distance);
        this.creaturesNoise[creatureId] = this.noise;
    };

    sm.stopCreatureNoise = function(creatureId) {
        this.creaturesNoise[creatureId].stop();
        delete this.creaturesNoise[creatureId];
    };

    sm.changeCreatureNoise = function(creatureId, orientation, distance) {
        this.creaturesNoise[creatureId].changeDistanceAndAngle(orientation, distance);
    };

    sm.stopAll = function() {
        this.backgroundMusic.stop();

        var creatureIdsToRemove = [];
        for (var creatureId in creaturesNoise) {
            if (object.hasOwnProperty(property)) {
                creatureIdsToRemove.push(creatureId);
            }
        }

        for (var i = creatureIdsToRemove.length - 1; i >= 0; i--) {
            stopCreatureNoise(creatureIdsToRemove[i]);
        };
    };

    sm.init = function(onAllLoadedCb) {
        this.onStartMusic = createSoundInstance('../sounds/zombie_bite_3.mp3');
        this.backgroundMusic = createSoundInstance('../sounds/zombie_bite_1.mp3');
        this.creatureHit = createSoundInstance('../sounds/zombie_bite_1.mp3');
        this.shot = createSoundInstance('../sounds/gun_fire_1.mp3');
        this.creatureDie = createSoundInstance('../sounds/zombie_laugh_1.mp3');
        this.noise = createSoundInstance('../sounds/zombie_walk_1.mp3');
        this.creaturesNoise = {}; // creatureId -> Sound
        this.onAllLoadedCb = onAllLoadedCb;
    };

    // expose module
    P.soundManager = sm;

}(this))

(function(w) {
    'use strict';

    var P = w.P,
        ko = w.ko,
        s = P.settings,
        CreateSound = P.CreateSounds,
        sm = {};

    var createSoundInstance = function(samplename) {
        var log = function(actionName) {
            console.log('SoundManager ' + samplename + ' action ' + actionName);
        };
        var sound = new CreateSound(samplename);

        return {
            start: function() {
                log('start');
                setTimeout(function() {
                    sound.play();
                }, 3000);
            },
            stop: function() {
                log('stop');
                setTimeout(function() {
                    sound.stop();
                }, 3000);
            },
            play: function() {
                log('play');
                setTimeout(function() {
                    sound.play();
                }, 3000);
            },
            changeDistanceAndAngle: function(orientation, distance) {
                log('changeDistanceAndAngle');
                console.log('orientation: ' + orientation + ' distance: ' + distance);
            }
        };

        //return new Sound(samplename);
    };

    var backgroundMusic = createSoundInstance('../sounds/zombie1_l.mp3'),
        creatureHit = createSoundInstance('../sounds/zombie_bite_1.mp3'),
        shot = createSoundInstance('../sounds/gun_fire_1.mp3'),
        creatureDie = createSoundInstance('../sounds/zombie_laugh_1.mp3'),
        creaturesNoise = {}; // creatureId -> Sound

    sm.startBackgroundMusic = function() {
        backgroundMusic.start();
    };

    sm.stopBackgroundMusic = function() {
        backgroundMusic.stop();
    };

    sm.playCreatureHit = function() {
        creatureHit.play();
    };

    sm.playShot = function() {
        shot.play();
    };

    sm.playCreatureDie = function() {
        creatureDie.play();
    };

    sm.startCreatureNoise = function(creatureId, orientation, distance) {
        var noise = createSoundInstance('../sounds/zombie_walk_1.mp3');
        noise.start();
        noise.changeDistanceAndAngle(orientation, distance);
        creaturesNoise[creatureId] = noise;
    };

    sm.stopCreatureNoise = function(creatureId) {
        creaturesNoise[creatureId].stop();
        delete creaturesNoise[creatureId];
    };

    sm.changeCreatureNoise = function(creatureId, orientation, distance) {
        creaturesNoise[creatureId].changeDistanceAndAngle(orientation, distance);
    };

    sm.stopAll = function() {
        backgroundMusic.stop();

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

    // expose module
    P.soundManager = sm;

}(this))

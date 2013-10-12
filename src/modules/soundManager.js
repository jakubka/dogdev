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
            playSound: function() {
                sound.play();
            },
            start: function() {
                // log('start');
                // setTimeout(function() {
                //     sound.play();
                // }, 3000);
            },
            stop: function() {
                // log('stop');
                // setTimeout(function() {
                //     sound.stop();
                // }, 3000);
            },
            play: function() {
                // log('play');
                // setTimeout(function() {
                //     sound.play();
                // }, 3000);
            },
            changeDistanceAndAngle: function(orientation, distance) {
                // log('changeDistanceAndAngle');
                console.log('orientation: ' + orientation + ' distance: ' + distance);
            }
        };

        //return new Sound(samplename);
    };


    sm.startBackgroundMusic = function() {
        this.backgroundMusic.start();
    };

    sm.stopBackgroundMusic = function() {
        this.backgroundMusic.stop();
    };

    sm.playCreatureHit = function() {
        // this.creatureHit.play();
    };

    sm.playShot = function() {
        // this.shot.play();
    };

    sm.playCreatureDie = function() {
        // this.creatureDie.play();
    };

    sm.startCreatureNoise = function(creatureId, orientation, distance) {
        // var noise = createSoundInstance('../sounds/zombie_walk_1.mp3');
        // noise.start();
        // noise.changeDistanceAndAngle(orientation, distance);
        // this.creaturesNoise[creatureId] = noise;
    };

    sm.stopCreatureNoise = function(creatureId) {
        // this.creaturesNoise[creatureId].stop();
        // delete this.creaturesNoise[creatureId];
    };

    sm.changeCreatureNoise = function(creatureId, orientation, distance) {
        // this.creaturesNoise[creatureId].changeDistanceAndAngle(orientation, distance);
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

    sm.init = function() {
        this.backgroundMusic = createSoundInstance('../sounds/zombie_bite_1.mp3');
        // this.creatureHit = createSoundInstance('../sounds/zombie_bite_1.mp3');
        // this.shot = createSoundInstance('../sounds/gun_fire_1.mp3');
        // this.creatureDie = createSoundInstance('../sounds/zombie_laugh_1.mp3');
        this.creaturesNoise = {}; // creatureId -> Sound
    };

    // init immidiatelly
    sm.init();

    // expose module
    P.soundManager = sm;

}(this))

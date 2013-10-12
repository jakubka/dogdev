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
        this.introMusic[this.introMusicId].start();
        this.backgroundMusic[0].start();
        this.backgroundMusic[this.musicBackgroundId].start();
    };

    sm.stopBackgroundMusic = function() {
        ko.utils.arrayForEach(this.backgroundMusic, function(n) {n.stop();});
    };

    sm.playCreatureHit = function() {
        // this.creatureHitId = Math.floor(Math.random() * this.creatureHit.length);
        this.creatureHit[this.creatureHitId].start();
    };

    sm.playShot = function() {
        // this.shotId = ++this.shotId % this.shot.length;        
        this.shot[this.shotId].start();
    };

    sm.playGameOver = function() {
        this.gameOver[this.gameOverId].start();  
    }

    sm.playCreatureDie = function() {
        this.creatureDie[this.creatureDieId].start();
    };

    sm.startCreatureNoise = function(creatureId, orientation, distance) {
        this.creatureStartId = ++this.creatureStartId % this.creatureStart.length;
        this.creatureStart[this.creatureStartId].startSpatial(orientation, distance);
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
        sm.playGameOver();
    };

    sm.init = function(onAllLoadedCb) {
        
        //-----------------------------------------------------------------------------------------
        this.backgroundMusic =
            [
                createSoundInstance('../sounds/background_beating_heart.m4a', 1.0, true),
                createSoundInstance('../sounds/background_level_1.m4a', 0.3, true),
                createSoundInstance('../sounds/background_level_2.m4a', 0.4, true),
                createSoundInstance('../sounds/background_level_3.m4a', 0.3, true),
            ];
        this.gameOver = 
            [
                createSoundInstance('../sounds/game_over.m4a', 1.0, false),
            ];
        this.introMusic = 
            [
                createSoundInstance('../sounds/intro_level_1.m4a', 0.5, false),
            ];
        //-----------------------------------------------------------------------------------------
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

        //-----------------------------------------------------------------------------------------
        this.creatureHit = 
            [
                createSoundInstance('../sounds/zombie_bite_1.m4a', 0.6, false),
                createSoundInstance('../sounds/zombie_bite_3.m4a', 0.6, false),
                createSoundInstance('../sounds/zombie_bite_4.m4a', 0.6, false),
                createSoundInstance('../sounds/zombie_bite_5.m4a', 0.6, false),
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
        this.creatureStart = 
            [
                createSoundInstance('../sounds/zombie_laugh_1.m4a', 1.0, false),
                createSoundInstance('../sounds/zombie_laugh_2.m4a', 1.0, false),
                createSoundInstance('../sounds/zombie_start_2.m4a', 1.0, false),
                createSoundInstance('../sounds/zombie_start_3.m4a', 1.0, false),
                createSoundInstance('../sounds/zombie_talk_1.m4a', 1.0, false),
            ];
        //-----------------------------------------------------------------------------------------        
        

        this.creatureNoiseId = 0;
        this.creatureDieId = 0;
        this.creatureHitId = 3;
        this.musicBackgroundId = 3;
        this.shotId = 6;
        this.gameOverId = 0;
        this.creatureStartId = 0;
        this.introMusicId = 0;

        this.onAllLoadedCb = onAllLoadedCb;
    };

    // expose module
    P.soundManager = sm;

}(this))

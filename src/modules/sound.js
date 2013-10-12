(function(w) {
    'use strict'

    var P = w.P,
        context = new AudioContext(),
       

        Sound = function(soundPath, cb, globalVolumeMultiplier, loop) {
            this.loadStereoSoundAsync(soundPath);
            this.cb = cb;
            this.globalVolumeMultiplier = globalVolumeMultiplier || 1;
            this.loop = loop || false;
        };

    Sound.prototype.start = function() {
        this.regenerateSoundFromBuffer();
        this.sound.source.start(0);
        this.sound.source.loop = this.loop;
    };

    Sound.prototype.startSpatial = function(angle, distance) {
        this.regenerateSoundFromBuffer();
        this.changeSoundPosition(angle, distance);
        this.sound.source.start(0);
        this.sound.source.loop = this.loop;
    }

    Sound.prototype.stop = function() {
        if (this.sound && this.sound.source) {
           this.sound.source.stop(0);
        }
    };

    /* toto volat pri presunu potvory, bude presouvat zvuk. volat furt. */
    Sound.prototype.changeSoundPosition = function(azimuth, newDistance) {
        // Clamp azimuth to allowed range of -180 -> +180.
        azimuth = Math.max(-180, azimuth);
        azimuth = Math.min(180, azimuth);
        
        var s = this.sound;
        var x;
        var distanceMultiplyier = Math.max(1 - (newDistance / 100), 0.4); // 0.4 is minimum


        this.sound.gainRight.value  = Math.cos(0.5*(azimuth-90) / 180*Math.PI);
        this.sound.gainLeft.value   = Math.cos(0.5*(azimuth+90) / 180*Math.PI);

        this.sound.gainLeft.value *= distanceMultiplyier;
        this.sound.gainRight.value *= distanceMultiplyier;
    };

    Sound.prototype.loadStereoSoundAsync = function(soundPath, cb) {
        var that = this,
            bufferLoader = new P.BufferLoader(context, soundPath, function(buffer) {
                that.buffer = buffer;
                that.cb && that.cb();
            });
        bufferLoader.load();
    };

    Sound.prototype.regenerateSoundFromBuffer = function() {
        if (!this.buffer) {
            console.error('Buffer not loaded yet - error!!');
        }
        this.sound = this.createSource(this.buffer);
    };

    Sound.prototype.createSource = function(buffer) {
        var source = context.createBufferSource(),
            splitter = context.createChannelSplitter(),
            gainLeft = context.createGain(),
            gainRight = context.createGain(),
            mainMerger = context.createChannelMerger(2),
            globalVolume = context.createGain();

        source.buffer = buffer;
        source.connect(splitter);

        splitter.connect(gainLeft, 0);
        splitter.connect(gainRight, 1);

        gainLeft.connect(mainMerger, 0, 0);
        gainRight.connect(mainMerger, 0, 1);



        globalVolume.gain.value = this.globalVolumeMultiplier;

        mainMerger.connect(globalVolume);

        globalVolume.connect(context.destination);

        return {
            source: source,
            gainLeft: gainLeft.gain,
            gainRight: gainRight.gain,
        };
    };

    // expose module
    P.Sound = Sound;
})(this);


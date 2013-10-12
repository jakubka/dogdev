(function(w) {
    var P = w.P,
        context = new AudioContext(),
        distance = 0,
        angle = 0,
        destination,

        CreateSounds = function(soundPath) {
            this.loadStereoSoundAsync(soundPath);
        };

    CreateSounds.prototype.play = function() {
        // 0 vymenit za jmena
        this.regenerateSoundFromBuffer();
        this.changeEvent(angle, distance);
        this.sound.src.start(0);
    };

    CreateSounds.prototype.stop = function() {
        this.sound.src.stop(0);
    };

    /* toto volat pri presunu potvory, bude presouvat zvuk. volat furt. */
    CreateSounds.prototype.changeEvent = function(newAngle, newDistance) {
        var transposedAngle = newAngle / 360.0;
        var transposedDistance = ((100 - newDistance) * (100 - newDistance) / 10000.0); /*1.0-(newDistance*newDistance/10000.0);*/ // 1/square decrease
        // var gain1 = Math.cos(transposedAngle * 0.5 * Math.PI) * transposedDistance;
        // var gain2 = Math.cos((1.0 - transposedAngle) * 0.5 * Math.PI) * transposedDistance;

        this.sound.gainNode.gain.value = 1;

        angle = newAngle;
        distance = newDistance;
    };

    CreateSounds.prototype.loadStereoSoundAsync = function(soundPath, successCallback) {
        var that = this;
        bufferLoader = new P.BufferLoader(
            context, soundPath, function(bufferList) {
                that.storeAsyncLoadedStereoSound(bufferList, successCallback);
            }
        );
        bufferLoader.load();
    };

    CreateSounds.prototype.storeAsyncLoadedStereoSound = function(bufferList, soundKey, successCallback) {
        this.sound = this.createSource(bufferList);

        if (typeof(successCallback) == 'function') {
            successCallback();
        }
    };

    CreateSounds.prototype.regenerateSoundFromBuffer = function(soundKey) {
        this.sound = this.createSource(this.sound.src.buffer);
    };

    CreateSounds.prototype.createSource = function(buffer) {
        var source = context.createBufferSource();

        // Create a gain node.
        var gainNode = context.createGain();

        source.buffer = buffer;

        source.connect(gainNode); // Connect source to gain
        gainNode.connect(context.destination); // Connect gain to destination.

        return {
            src: source,
            gainNode: gainNode
        };
    };

    // expose module
    P.CreateSounds = CreateSounds;
})(this);

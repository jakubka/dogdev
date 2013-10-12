(function(w) {
    var P = w.P,
        context = new AudioContext(),
        
        Sound = function(soundPath) {
            this.loadStereoSoundAsync(soundPath);
        };

    Sound.prototype.play = function() {
        this.regenerateSoundFromBuffer();
        this.sound.source.start(0);
    };

    Sound.prototype.playSpatial = function(angle, distance) {
        this.regenerateSoundFromBuffer();
        this.changeEvent(angle, distance);
        this.sound.source.stop(0);
    }

    Sound.prototype.stop = function() {
        this.sound.source.stop(0);
    };

    /* toto volat pri presunu potvory, bude presouvat zvuk. volat furt. */
    Sound.prototype.changeSoundPosition = function(azimuth, newDistance) {
        // Clamp azimuth to allowed range of -180 -> +180.
        azimuth = Math.max(-180, azimuth);
        azimuth = Math.min(180, azimuth);

        var s = this.sound;
        var x;

        if (azimuth < 30 && azimuth > -30) {
            s.gainLeft.value = 1;
            s.gainRight.value = 1;
        } else if (azimuth >= 30) {
            x = 1 - azimuth / 180;
            s.gainRight.value = x * 1.1;
            s.gainLeft.value = Math.max(x - 0.5, 0);
        } else if (azimuth <= -30) {
            x = 1 - azimuth / (-180);
            s.gainLeft.value = x * 1.1;
            s.gainRight.value = Math.max(x - 0.5, 0);
        }
    };

    Sound.prototype.loadStereoSoundAsync = function(soundPath) {
        var that = this;
        bufferLoader = new P.BufferLoader(context, soundPath, function(buffer) {
            that.buffer = buffer;
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
        var source = context.createBufferSource();

        source.buffer = buffer;

        splitter = context.createChannelSplitter();

        gainLeft = context.createGain();
        gainRight = context.createGain();

        mainMerger = context.createChannelMerger(2);

        source.connect(splitter);

        splitter.connect(gainLeft, 0);
        splitter.connect(gainRight, 1);

        gainLeft.connect(mainMerger, 0, 0);
        gainRight.connect(mainMerger, 0, 1);

        mainMerger.connect(context.destination);

        return {
            source: source,
            gainLeft: gainLeft.gain,
            gainRight: gainRight.gain,
        };
    };

    // expose module
    P.Sound = Sound;
})(this);

        // leftSplitter = context.createChannelSplitter();
        // rightSplitter = context.createChannelSplitter();

        // gainLeftToLeft = context.createGain();
        // gainRightToLeft = context.createGain();
        // gainLeftToRight = context.createGain();
        // gainRightToRight = context.createGain();

        // leftMerger = context.createChannelMerger(2);
        // rightMerger = context.createChannelMerger(2);

        // mainMerger = context.createChannelMerger(2);

        // source.connect(mainSplitter);
        // mainSplitter.connect(leftSplitter, 0);
        // mainSplitter.connect(rightSplitter, 1);

        // leftSplitter.connect(gainLeftToLeft, 0);
        // leftSplitter.connect(gainLeftToRight, 1);

        // rightSplitter.connect(gainRightToLeft, 0);
        // rightSplitter.connect(gainRightToRight, 1);

        // gainLeftToLeft.connect(leftMerger, 0, 0);
        // gainRightToLeft.connect(leftMerger, 0, 1);

        // gainLeftToRight.connect(rightMerger, 0, 0);
        // gainRightToRight.connect(rightMerger, 0, 1);

        // leftMerger.connect(mainMerger, 0, 0);
        // rightMerger.connect(mainMerger, 0, 1);

        // mainMerger.connect(context.destination);



            // gainLeftToLeft: gainLeftToLeft.gain,
            // gainRightToLeft: gainRightToLeft.gain,
            // gainLeftToRight: gainLeftToRight.gain,
            // gainRightToRight: gainRightToRight.gain











        // // Now wrap to range -90 -> +90.
        // if (azimuth < -90)
        //     azimuth = -180 - azimuth;
        // else if (azimuth > 90)
        //     azimuth = 180 - azimuth;

        // var x;
        // if (azimuth <= 0) { // from -90 -> 0
        //     // inputL -> outputL and "equal-power pan" inputR as in mono case
        //     // by transforming the "azimuth" value from -90 -> 0 degrees into the range -90 -> +90.
        //     x = (azimuth + 90) / 90;
        // } else { // from 0 -> +90
        //     // inputR -> outputR and "equal-power pan" inputL as in mono case
        //     // by transforming the "azimuth" value from 0 -> +90 degrees into the range -90 -> +90.
        //     x = azimuth / 90;
        // }

        // var gainL = Math.cos(0.5 * Math.PI * x);
        // var gainR = Math.sin(0.5 * Math.PI * x);

        // var s = this.sound;

        // if (azimuth <= 0) { // from -90 -> 0
        //     // outputL = inputL + inputR * gainL;
        //     // outputR = inputR * gainR;
        //     s.gainLeftToLeft.value = 1;
        //     s.gainRightToLeft.value = gainL;
        //     s.gainLeftToRight.value = 0;
        //     s.gainRightToRight.value = gainR;
        // } else { // from 0 -> +90
        //     // outputL = inputL * gainL;
        //     // outputR = inputR + inputL * gainR;
        //     s.gainLeftToLeft.value = gainL;
        //     s.gainRightToLeft.value = 0;
        //     s.gainLeftToRight.value = gainR;
        //     s.gainRightToRight.value = 1;
        // }

        // this.sound.gainLeft.gain.value = gainL;
        // this.sound.gainRight.gain.value = gainR;



        // if (azimuth <= 0) { // from -90 -> 0
        //     outputL = inputL + inputR * gainL;
        //     outputR = inputR * gainR;
        // } else { // from 0 -> +90
        //     outputL = inputL * gainL;
        //     outputR = inputR + inputL * gainR;
        // }


        // var transposedAngle = newAngle / 360.0;
        // var transposedDistance = ((100 - newDistance) * (100 - newDistance) / 10000.0); /*1.0-(newDistance*newDistance/10000.0);*/ // 1/square decrease
        // var gain1 = Math.cos(transposedAngle * 0.5 * Math.PI) * transposedDistance;
        // var gain2 = Math.cos((1.0 - transposedAngle) * 0.5 * Math.PI) * transposedDistance;

        // this.sound.gainNode.gain.value = 1;
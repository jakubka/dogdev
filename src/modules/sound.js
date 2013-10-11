/* je to svincik */

this.P = {};
(function(w) {
    /* vykradeno z http://www.html5rocks.com/en/tutorials/webaudio/intro/ */

    var P = w.P,
        BufferLoader = function(context, urlList, callback) {
            this.context = context;
            this.urlList = urlList;
            this.onload = callback;
            this.bufferList = new Array();
            this.loadCount = 0;
        };

    BufferLoader.prototype.loadBuffer = function(url, index) {
        // Load buffer asynchronously
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        var loader = this;

        request.onload = function() {
            // Asynchronously decode the audio file data in request.response
            loader.context.decodeAudioData(
                request.response,
                function(buffer) {
                    if (!buffer) {
                        alert('error decoding file data: ' + url);
                        return;
                    }
                    loader.bufferList[index] = buffer;
                    if (++loader.loadCount == loader.urlList.length)
                        loader.onload(loader.bufferList);
                },
                function(error) {
                    console.error('decodeAudioData error', error);
                }
            );
        }

        request.onerror = function() {
            alert('BufferLoader: XHR error');
        }

        request.send();
    }

    BufferLoader.prototype.load = function() {
        for (var i = 0; i < this.urlList.length; ++i)
            this.loadBuffer(this.urlList[i], i);
    }

    w.P.BufferLoader = BufferLoader;

})(this);

(function(w) {
    //w.P = '';
    var P = w.P,
        distance = 100,
        angle = 0,
        context = '',
        samples = {}, // { left: {src, gainNode }, right: {src, gainNode}}
        destination,
        angle = 0, // -> max 359
        distance = 0, // -> max 100


        loadStereoSoundAsync = function(soundKey, soundPath, successCallback) {
            bufferLoader = new P.BufferLoader(
                context, [
                    soundPath + '_l.mp3',
                    soundPath + '_r.mp3',
                ],
                function(bufferList) {
                    storeAsyncLoadedStereoSound(bufferList, soundKey, successCallback);
                }
            );
            bufferLoader.load();
        },

        storeAsyncLoadedStereoSound = function(bufferList, soundKey, successCallback) {
            samples[soundKey] = {
                left: createSource(bufferList[0]),
                right: createSource(bufferList[1])
            };

            if (typeof(successCallback) == 'function') {
                successCallback();
            }
        },

        regenerateSoundFromBuffer = function(soundKey, gainLeft, gainRight) {
            sample = samples[soundKey];
            sample.left = createSource(sample.left.src.buffer);
            sample.right = createSource(sample.right.src.buffer);
        },

        createSource = function(buffer) {
            var source = context.createBufferSource();
            // Create a gain node.
            var gainNode = context.createGain();
            source.buffer = buffer;

            // Connect source to gain.
            source.connect(gainNode);
            // Connect gain to destination.
            gainNode.connect(context.destination);

            return {
                src: source,
                gainNode: gainNode
            };
        },

        /* tohle pusti zvuk */
        startPlayingStereo = function() {
            soundKey = 'zombie1';
            // 0 vymenit za jmena
            regenerateSoundFromBuffer(soundKey);
            recalculateSoundProportions(angle, distance);
            samples[soundKey]['left'].src.start(0);
            samples[soundKey]['right'].src.start(0);
        },

        /*obsolete*/
        startPlayingStereo2 = function() {
            // 0 vymenit za jmena
            regenerateSoundFromBuffer('zombie1');
            recalculateSoundProportions(angle, distance);
            samples['zombie1']['left'].src.noteOn(0);
            samples['zombie1']['right'].src.noteOn(0);
        },

        stopPlayingStereo = function() {
            samples['zombie1']['left'].src.stop(0);
            samples['zombie1']['right'].src.stop(0);
        },

        /* toto volat pri presunu potvory, bude presouvat zvuk. volat furt. */
        changeLocation = function(newAngle, newDistance) {
            recalculateSoundProportions(newAngle, newDistance);
            angle = newAngle;
            distance = newDistance;
        },

        changeAngle = function(newAngle) {
            changeLocation(newAngle, distance);
        },

        changeDistance = function(newDistance) {
            changeLocation(angle, newDistance);
        },

        recalculateSoundProportions = function(newAngle, newDistance) {
            var transposedAngle = newAngle / 360.0;
            var transposedDistance = ((100 - newDistance) * (100 - newDistance) / 10000.0); /*1.0-(newDistance*newDistance/10000.0);*/ // 1/square decrease
            var gain1 = Math.cos(transposedAngle * 0.5 * Math.PI) * transposedDistance;
            var gain2 = Math.cos((1.0 - transposedAngle) * 0.5 * Math.PI) * transposedDistance;

            samples['zombie1']['left'].gainNode.gain.value = gain1;
            samples['zombie1']['right'].gainNode.gain.value = gain2;
        },

        Sound = function(soundKey, soundPath) {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.distance = function() {
                return distance;
            };
            this.angle = function() {
                return angle;
            };

            this.play = startPlayingStereo;
            this.changeAngle = changeAngle;
            this.changeDistance = changeDistance;

            context = new AudioContext();

            loadStereoSoundAsync(soundKey, soundPath, function() {

            });

        };

    P.Sound = Sound;

})(this);


var s = new window.P.Sound('zombie1', 'sounds/zombie1');

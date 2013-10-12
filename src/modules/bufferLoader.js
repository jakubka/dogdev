(function(w) {
    var P = w.P,
        bufferList = {},

        BufferLoader = function(context, url, callback) {
            this.context = context;
            this.onload = callback;
            this.url = url;
        };

    BufferLoader.prototype.loadBuffer = function(url) {

        if (bufferList.hasOwnProperty(url)) {
            loader.onload(bufferList[url]);
        }

        // Load buffer asynchronously
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        var loader = this;

        request.onload = function() {
            console.log('request.onload');
            // Asynchronously decode the audio file data in request.response
            loader.context.decodeAudioData(
                request.response,
                function(buffer) {
                    if (!buffer) {
                        alert('error decoding file data: ' + url);
                        return;
                    }
                    console.log('data decoded');
                    bufferList[url] = buffer;
                    loader.onload(buffer);
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
    };

    BufferLoader.prototype.load = function() {
        this.loadBuffer(this.url);
    };

    // expose module
    P.BufferLoader = BufferLoader;

})(this);

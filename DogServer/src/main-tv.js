(function(w) {
    'use strict';

    var P = w.P,
        fabric = w.fabric,
        doc = w.document,
        $ = w.$,
        hub = P.hub,
        canvasWidth = window.innerWidth,
        canvasHeight = window.innerHeight,
        maxDistanceFromPlayer = (canvasWidth - 500) / 2,
        canvasXMid = canvasWidth / 2,
        canvasYMid = canvasHeight / 2,
        canvas = new fabric.Canvas('c'),
        $compass = $(".compassIco"),
        boundaryCirc, zombiePoint, movingLine;

    // set canvas to stretch to window
    canvas.setWidth(canvasWidth);
    canvas.setHeight(canvasHeight);

    // create a boundary circle object
    boundaryCirc = new fabric.Circle({
        left: canvasXMid,
        top: canvasYMid,
        fill: 'transparent',
        radius: maxDistanceFromPlayer,
        strokeWidth: 1,
        stroke: 'grey'
    });

    movingLine = new fabric.Line([canvasXMid, canvasYMid, canvasXMid + maxDistanceFromPlayer, canvasYMid], {
        stroke: 'red',
        strokeWidth: 5
    });

    zombiePoint = new fabric.Circle({
        fill: 'red',
        radius: 5,
    });

    // "add" items into canvas
    canvas.add(boundaryCirc);
    canvas.add(zombiePoint);
    canvas.add(movingLine);

    (function animate() {
        //setInterval(animate, 2000);

        fabric.util.animate({
            startValue: 0,
            endValue: 360,
            duration: 2500,
            easing: function(t, b, c, d) { return c*t/d + b; },
            onChange: function(angle) {
                angle = fabric.util.degreesToRadians(angle);
                var x = canvasXMid + maxDistanceFromPlayer * Math.cos(angle);
                var y = canvasYMid + maxDistanceFromPlayer * Math.sin(angle);

                movingLine.set({
                    x2: x,
                    y2: y
                }).setCoords();

                

                canvas.renderAll();
            },
            onComplete: animate

        });
    })();


    hub.init(function(data) {
        // update compass
        $compass.css('-webkit-transform', 'rotate(' + (-data.playerOrientation) + 'deg)');

        var x = (data.creatureDistance / 100 * maxDistanceFromPlayer * Math.cos((data.creatureOrientation - 90) / 180 * Math.PI)) + canvasXMid;
        var y = (data.creatureDistance / 100 * maxDistanceFromPlayer * Math.sin((data.creatureOrientation - 90) / 180 * Math.PI)) + canvasYMid;

        // update zombie
        zombiePoint.set({
            left: x,
            top: y
        });

        // update canvas
        canvas.renderAll();
    });

    // setTimeout(function() {
    //     boundaryCirc.set({
    //         left: 200
    //     });
    //     canvas.renderAll();
    //     console.log('asdasd');
    // }, 4000);

}(this));

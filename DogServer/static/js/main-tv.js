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
        boundaryCirc, zombiePoint, movingLine, zombieVisible, crossLine1, crossLine2, innerCirc1, innerCirc2;

    // set canvas to stretch to window
    canvas.setWidth(canvasWidth);
    canvas.setHeight(canvasHeight);

    // create a boundary circle object
    boundaryCirc = new fabric.Circle({
        left: canvasXMid,
        top: canvasYMid,
        fill: 'transparent',
        radius: maxDistanceFromPlayer,
        strokeWidth: 2,
        stroke: 'green'
    });
    
    innerCirc1 = new fabric.Circle({
        left: canvasXMid,
        top: canvasYMid,
        fill: 'transparent',
        radius: maxDistanceFromPlayer * 0.4,
        strokeWidth: 1,
        stroke: 'green',
        strokeDashArray: [10, 5]
    });
    innerCirc2 = new fabric.Circle({
        left: canvasXMid,
        top: canvasYMid,
        fill: 'transparent',
        radius: maxDistanceFromPlayer * 0.7,
        strokeWidth: 1,
        stroke: 'green',
        strokeDashArray: [10, 5]
    });

    crossLine1 = new fabric.Line([canvasXMid, canvasYMid - maxDistanceFromPlayer - 10, canvasXMid, canvasYMid + maxDistanceFromPlayer + 10], {stroke: 'green',strokeWidth: 1,strokeDashArray: [10, 5]});
    crossLine2 = new fabric.Line([canvasXMid - maxDistanceFromPlayer - 10, canvasYMid, canvasXMid + maxDistanceFromPlayer + 10, canvasYMid], {stroke: 'green',strokeWidth: 1,strokeDashArray: [10, 5]});

    movingLine = new fabric.Line([canvasXMid, canvasYMid, canvasXMid + maxDistanceFromPlayer, canvasYMid], {
        stroke: 'green',
        strokeWidth: 3
    });

    zombiePoint = new fabric.Circle({
        fill: 'green',
        radius: 5,
        opacity: 0,
    });

    zombieVisible = false;

    // "add" items into canvas
    canvas.add(boundaryCirc);
    canvas.add(zombiePoint);
    canvas.add(movingLine);
    canvas.add(crossLine1);
    canvas.add(crossLine2);
    canvas.add(innerCirc1);
    canvas.add(innerCirc2);

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
                zombiePoint.setCoords();
                if(!zombieVisible && zombiePoint.intersectsWithObject(movingLine)) {
                        zombieVisible = true;
                    // Animate point
                    fabric.util.animate(
                    {
                        startValue: -0.7,
                        endValue: 0.7,
                        duration: 500,
                        onChange: function(opacity) {
                            zombiePoint.opacity = 1-Math.abs(opacity);
                            canvas.renderAll();
                        },
                        onComplete: function() {
                            zombieVisible = false;
                        }
                    }
                    );
                }

                canvas.renderAll();
            },
            onComplete: animate

        });
    })();


    hub.init(function(data) {
        // update compass
        $compass.style.top = 10;
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
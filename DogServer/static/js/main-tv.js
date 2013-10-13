(function(w) {
    'use strict';

    var P = w.P,
        fabric = w.fabric,
        doc = w.document,
        $ = w.$,
        hub = P.logsReceiver,
        canvasWidth = window.innerWidth,
        canvasHeight = window.innerHeight,
        maxDistanceFromPlayer = (canvasWidth - 500) / 2,
        canvasXMid = canvasWidth / 2,
        canvasYMid = canvasHeight / 2,
        canvas = new fabric.Canvas('c'),
        boundaryCirc, zombiePoint, movingLine, zombieVisible, crossLine1, crossLine2, innerCirc1, innerCirc2, triangle, text1, text2, text3;

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
        stroke: 'green',
        selectable: false
    });

    innerCirc1 = new fabric.Circle({
        left: canvasXMid,
        top: canvasYMid,
        fill: 'transparent',
        radius: maxDistanceFromPlayer * 0.4,
        strokeWidth: 1,
        stroke: 'green',
        strokeDashArray: [10, 5],
        selectable: false
    });
    innerCirc2 = new fabric.Circle({
        left: canvasXMid,
        top: canvasYMid,
        fill: 'transparent',
        radius: maxDistanceFromPlayer * 0.7,
        strokeWidth: 1,
        stroke: 'green',
        strokeDashArray: [10, 5],
        selectable: false
    });


    triangle = new fabric.Triangle({
        width: 40,
        height: 60,
        fill: 'red',
        left: canvasXMid,
        top: canvasYMid,
        angle: 0,
        opacity: 0.5,
        selectable: false
        // originX: 1000,
        // originY: 100,
    });
    // triangle.setGradient('fill', { 
    //     type:'linear', 
    //     x1: -100,
    //     y1: -10,
    //     x2: 70,
    //     y2: 10,
    //     // r1: 120, r2: 170, 
    //     colorStops: { 0: 'green', 1: 'rgba(0,0,0,0.1)'} 
    // });
    


    text1 = new fabric.Text('frags: 000', {
        backgroundColor: 'rgb(0,200,0)',
        left: 100,
        top: 100,
        textAlign: 'left',
        selectable: false
    });
    text2 = new fabric.Text('health: 000', {
        backgroundColor: 'rgb(0,200,0)',
        left: 100,
        top: 150,
        textAlign: 'left',
        selectable: false
    });
    text3 = new fabric.Text('DISCONNECTED', {
        opacity: 1,
        backgroundColor: 'rgb(0,200,0)',
        left: 600,
        top: 150,
        fontSize: 150,
        height: 2000,
        selectable: false
    });


    crossLine1 = new fabric.Line([canvasXMid, canvasYMid - maxDistanceFromPlayer - 10, canvasXMid, canvasYMid + maxDistanceFromPlayer + 10], {
        stroke: 'green',
        strokeWidth: 1,
        strokeDashArray: [10, 5],
        selectable: false
    });
    crossLine2 = new fabric.Line([canvasXMid - maxDistanceFromPlayer - 10, canvasYMid, canvasXMid + maxDistanceFromPlayer + 10, canvasYMid], {
        stroke: 'green',
        strokeWidth: 1,
        strokeDashArray: [10, 5],
        selectable: false
    });

    movingLine = new fabric.Line([canvasXMid, canvasYMid, canvasXMid + maxDistanceFromPlayer, canvasYMid], {
        stroke: 'green',
        strokeWidth: 3,
        selectable: false
    });

    zombiePoint = new fabric.Circle({
        fill: 'red',
        radius: 10,
        opacity: 0,
        selectable: false
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
    canvas.add(triangle);
    canvas.add(text1);
    canvas.add(text2);
    canvas.add(text3);


    (function animate() {
        //setInterval(animate, 2000);

        fabric.util.animate({
            startValue: 0,
            endValue: 360,
            duration: 2500,
            easing: function(t, b, c, d) { return c * t / d + b; },
            onChange: function(angle) {
                angle = fabric.util.degreesToRadians(angle);
                var x = canvasXMid + maxDistanceFromPlayer * Math.cos(angle);
                var y = canvasYMid + maxDistanceFromPlayer * Math.sin(angle);

                movingLine.set({
                    x2: x,
                    y2: y
                }).setCoords();
                zombiePoint.setCoords();
                if (!zombieVisible && zombiePoint.intersectsWithObject(movingLine)) {
                    zombieVisible = true;
                    // Animate point
                    fabric.util.animate(
                        {
                            startValue: 0,
                            endValue: 0.7,
                            duration: 2500,
                            onChange: function(opacity) {
                                zombiePoint.opacity = 1 - Math.abs(opacity);
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
        triangle.angle = data.PlayerOrientation;
        text1.setText("frags: " + data.FragsCount);
        text2.setText("health: " + data.PlayerHealth);

        if (data.IsGameStarted && canvas.contains(text3)) {
            canvas.remove(text3);
        } else if (!data.IsGameStarted && !canvas.contains(text3)) {
            canvas.add(text3);
        }

        if (data.CreatureDistance == null) {
            zombiePoint.setVisible = false;
        } else {
            var x = (data.CreatureDistance / 100 * maxDistanceFromPlayer * Math.cos((data.CreatureOrientation - 90) / 180 * Math.PI)) + canvasXMid;
            var y = (data.CreatureDistance / 100 * maxDistanceFromPlayer * Math.sin((data.CreatureOrientation - 90) / 180 * Math.PI)) + canvasYMid;

            // update zombie
            zombiePoint.set({
                left: x,
                top: y,
                visible: true,
                opacity: 0
            });
        }

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
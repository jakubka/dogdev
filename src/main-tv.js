(function(w) {
    'use strict';

    var P = w.P,
        fabric = w.fabric,
        doc = w.document,
        $ = w.$,
        hub = P.hub,
        canvasWidth = window.innerWidth,
        canvasHeight = window.innerHeight,
        maxDistanceFromPlayer = (canvasWidth - 20) / 2,
        canvasXMid = canvasWidth / 2,
        canvasYMid = canvasHeight / 2,
        canvas = new fabric.Canvas('c'),
        $compass = $(".compassIco"),
        boundaryCirc, zombiePoint;

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

    zombiePoint = new fabric.Circle({
        fill: 'red',
        radius: 5,
    });

    // "add" items into canvas
    canvas.add(boundaryCirc);
    canvas.add(zombiePoint);

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

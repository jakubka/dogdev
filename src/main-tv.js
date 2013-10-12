(function(w) {
    'use strict';

    var P = w.P,
        fabric = w.fabric,
        doc = w.document,
        $ = w.$,
        canvasWidth = window.innerWidth,
        canvasHeight = window.innerHeight,
        canvasXMid = canvasWidth / 2,
        canvasYMid = canvasHeight / 2,
        canvas = new fabric.Canvas('c'),
        boundaryCirc;

    // set canvas to stretch to window
    canvas.setWidth(canvasWidth);
    canvas.setHeight(canvasHeight);

    // create a boundary circle object
    boundaryCirc = new fabric.Circle({
        left: canvasXMid,
        top: canvasYMid,
        fill: 'transparent',
        radius: (canvasWidth - 20) / 2,
        strokeWidth: 1,
        stroke: 'grey'
    });

    // "add" rectangle onto canvas
    canvas.add(boundaryCirc);

    // setTimeout(function() {
    //     boundaryCirc.set({
    //         left: 200
    //     });
    //     canvas.renderAll();
    //     console.log('asdasd');
    // }, 4000);

}(this));

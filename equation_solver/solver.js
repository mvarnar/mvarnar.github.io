"use strict";

function solveIteratively(func, eps, initial, maxIterations = 100) {
    var x = initial;
    for (var i = 0; i < maxIterations; i++) {
        var previousX = x;
        x = func(previousX);
        console.log(x);
        if (Math.abs(x - previousX) < eps) {
            break;
        }
    }
    return x;
}
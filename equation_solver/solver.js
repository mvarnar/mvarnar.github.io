"use strict";

function solveIteratively(coefficientMatrix, eps, maxIterations = 10000) {
    var diagonalElements = [];
    coefficientMatrix.forEach(function(value, index, matrix) {
        if (index[0] === index[1]) {
            diagonalElements.push(value);
        }
    });

    coefficientMatrix = coefficientMatrix.map(function (value, index, matrix) {
        if (index[0] === index[1]) {
            return 0;
        }
        return - (value / diagonalElements[index[0]]);
    });

    const nVariables = coefficientMatrix.size()[0];
    const freeCoefficients = coefficientMatrix.subset(math.index(math.range(0, nVariables), nVariables));
    coefficientMatrix = coefficientMatrix.subset(math.index(math.range(0, nVariables), math.range(0, nVariables)));

    var beta = math.max(math.abs(coefficientMatrix));
    var eps = (1 - beta) / beta * eps;
    var x = freeCoefficients;
    var status = "unsolved";
    for (var i = 0; i < maxIterations; i++) {
        var previousX = x;
        x = math.add(math.multiply(coefficientMatrix, previousX), freeCoefficients);

        var diff = math.max(math.abs(math.subtract(x, previousX)));

        if ( diff < eps) {
            status = "solved";
            break;
        }
    }

    return { status: status, x: x };
}
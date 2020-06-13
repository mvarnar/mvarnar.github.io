"use strict";

function solveIteratively(coefficientMatrix, eps, maxIterations = 10000) {
    var diagonalElements = [];
    coefficientMatrix.forEach(function(value, index, matrix) {
        if (index[0] === index[1]) {
            diagonalElements.push(value);
        }
    });

    coefficientMatrix = coefficientMatrix.map(function(value, index, matrix) {
        if (index[0] === index[1]) {
            return 0;
        }
        return - (value / diagonalElements[index[0]]);
    });

    const nVariables = coefficientMatrix.size()[0];
    const lastColumnIndex = math.index(math.range(0, nVariables), nVariables);
    const freeCoefficients = coefficientMatrix.subset(lastColumnIndex);
    const exceptLastColumnIndex = math.index(math.range(0, nVariables), math.range(0, nVariables));
    coefficientMatrix = coefficientMatrix.subset(exceptLastColumnIndex);

    const beta = math.max(math.abs(coefficientMatrix));
    eps = (1 - beta) / beta * eps;
    var x = freeCoefficients;
    var status = "unsolved";
    for (let i = 0; i < maxIterations; i++) {
        const previousX = x;
        x = math.add(math.multiply(coefficientMatrix, previousX), freeCoefficients);

        const diff = math.max(math.abs(math.subtract(x, previousX)));

        if (diff < eps) {
            status = "solved";
            break;
        }
    }

    return { status: status, x: x };
}
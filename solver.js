"use strict";

function solveIteratively(coefficientMatrix, eps, maxIterations = 10000) {
    var diagonalElements = _getDiagonalElements(coefficientMatrix);
    coefficientMatrix = _moveOutDiagonalElements(coefficientMatrix, diagonalElements);

    let coefficientsOfVariables;
    let freeCoefficients;
    [coefficientsOfVariables, freeCoefficients] = _splitCoefficients(coefficientMatrix);

    const beta = math.max(math.abs(coefficientsOfVariables));
    const betaEps = (1 - beta) / beta * eps;

    return _solveIteratively(coefficientsOfVariables, freeCoefficients, betaEps, maxIterations);
}

function _solveIteratively(coefficientsOfVariables, freeCoefficients, eps, maxIterations) {
    var x = freeCoefficients;
    var status = "unsolved";
    for (let i = 0; i < maxIterations; i++) {
        const previousX = x;
        x = math.add(math.multiply(coefficientsOfVariables, previousX), freeCoefficients);

        const diff = math.max(math.abs(math.subtract(x, previousX)));

        if (diff < eps) {
            status = "solved";
            break;
        }
    }

    // из-за особенностей работы функции subset в библиотеке math.js, 
    // в переменной x окажется число, если параметр coefficientMatrix был размерности [1, 1]
    x = typeof x == "number" ? math.matrix([[x]]) : x;
    return { status: status, x: x }
}

function _getDiagonalElements(matrix) {
    const diagonalElements = [];
    matrix.forEach(function (value, index, matrix) {
        if (index[0] === index[1]) {
            diagonalElements.push(value);
        }
    });
    return diagonalElements;
}

function _moveOutDiagonalElements(matrix, diagonalElements){
    return matrix.map(function (value, index, matrix) {
        if (index[0] === index[1]) {
            return 0;
        }
        return - (value / diagonalElements[index[0]]);
    });
}

function _splitCoefficients(matrix) {
    const nVariables = matrix.size()[0];
    const lastColumnIndex = math.index(math.range(0, nVariables), nVariables);
    const freeCoefficients = matrix.subset(lastColumnIndex);
    const exceptLastColumnIndex = math.index(math.range(0, nVariables), math.range(0, nVariables));
    const coefficientsOfVariables = matrix.subset(exceptLastColumnIndex);
    return [coefficientsOfVariables, freeCoefficients];
}
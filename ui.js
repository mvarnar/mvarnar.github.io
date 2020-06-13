"use strict";

function solve(matrix, eps) {
    eps = parseFloat(eps);
    try {
        validateNumber(eps);
    } catch (e) {
        showError(e);
        throw e;
    }

    const result = solveIteratively(matrix, eps);
    if (result.status === "solved") {
        showAnswer(result.x);
    } else {
        showError(`Не удалось вычислить решение за 10 000 итераций. Лучшее приближение ${result.x}`);
    }
}

function showAnswer(x) {
    clearOutput();

    const answerField = document.getElementById("answer");
    console.log(x);
    x.forEach(function(value, index, matrix) {
        const paragraph = document.createElement("p");
        paragraph.textContent = `x${index[0] + 1} = ${value}`;
        paragraph.classList.add("xPosition");
        answerField.appendChild(paragraph);
    });
}

function showError(message) {
    clearOutput();

    document.getElementById("errorField").textContent = message;
}

function clearOutput() {
    document.getElementById("errorField").textContent = "";
    document.getElementById("answer").textContent = "";
}

function validateNumber(number) {
    if (isNaN(number)) {
        throw "Некорректный формат числа";
    }
}

function buildMatrixTable(nVariables, table, matrixToInterpolate=null) {
    nVariables = parseInt(nVariables);
    while (table.firstChild) {
        table.firstChild.remove();
    }
    for (let nRow = 0; nRow < nVariables; nRow++) {
        const tr = document.createElement("tr");
        for (let nColumn = 0; nColumn < nVariables + 1; nColumn++) {
            const value = matrixToInterpolate !== null ? matrixToInterpolate[nRow][nColumn] : null;
            const cell = generateCell(nColumn, nColumn === 0, nColumn === nVariables, value);
            const td = document.createElement("td");
            td.appendChild(cell);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function generateCell(nColumn, isFirst, isLast, value=null) {
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.class = "coefficientField";
    if (value !== null) {
        inputField.value = value;
    }

    const cell = document.createElement("span");
    if (!isFirst) {
        cell.appendChild(document.createTextNode("+"));
    }
    cell.appendChild(inputField);
    if (isLast) {
        cell.appendChild(document.createTextNode("= 0"));
    } else {
        cell.appendChild(document.createTextNode(`x${nColumn + 1}`));
    }
    return cell;
}

function convertMatrixTableToMatrix(table) {
    const rows = table.rows;
    const rawMatrix = [];
    for (let nRow = 0; nRow < rows.length; nRow++) {
        const rawArray = [];
        const row = rows[nRow];
        for (let nColumn = 0; nColumn < row.getElementsByTagName("td").length; nColumn++) {
            const coefficient = parseFloat(row.cells[nColumn].getElementsByTagName("input")[0].value);
            try {
                validateNumber(coefficient);
            } catch (e) {
                showError(e);
                throw e;
            }
            rawArray.push(coefficient);
        }
        rawMatrix.push(rawArray);
    }
    console.log(rawMatrix);
    return math.matrix(rawMatrix);
}
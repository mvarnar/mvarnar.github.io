/// <reference path="../solver.js"/>

describe("solveIteratively", function() {

    it("sin(x)/x",
        function () {
            var func = x => Math.sin(x) / x;
            var eps = 0.001;
            var exactRoot = 0.87672621539506244597;

            var approximateRoot = solveIteratively(func, eps, 1);

            var approximateRootWithinBorders = exactRoot - eps <= approximateRoot && approximateRoot <= exactRoot + eps;
            expect(approximateRootWithinBorders).toBe(true);
        });

    it("(x^3 - 3x^2 - 8)/(-9)",
        function () {
            var func = x => (Math.pow(x, 3) - 3 * Math.pow(x, 2) - 8) / (-9);
            var eps = 0.001;
            var exactRoot = 1.16590558412221;

            var approximateRoot = solveIteratively(func, eps, 1);

            var approximateRootWithinBorders = exactRoot - eps <= approximateRoot && approximateRoot <= exactRoot + eps;
            expect(approximateRootWithinBorders).toBe(true);
        });

    it("(x^3 - 4) / 6",
        function () {
            var func = x => (Math.pow(x, 3) - 4) / 6.0;
            var eps = 0.001;
            var exactRoot = -0.7320508075688772935274463415058;

            var approximateRoot = solveIteratively(func, eps, 1);

            var approximateRootWithinBorders = exactRoot - eps <= approximateRoot && approximateRoot <= exactRoot + eps;
            expect(approximateRootWithinBorders).toBe(true);
        });

    it("(x^3 + 2) / (-4)",
        function () {
            var func = x => (Math.pow(x, 3) + 2) / (-4);
            var eps = 0.001;
            var exactRoot = -0.473465807729126;

            var approximateRoot = solveIteratively(func, eps, 1);

            var approximateRootWithinBorders = exactRoot - eps <= approximateRoot && approximateRoot <= exactRoot + eps;
            expect(approximateRootWithinBorders).toBe(true);
        });

    it("(x^4 - 4) / 4",
        function () {
            var func = x => (Math.pow(x, 4) - 4) / 4;
            var eps = 0.001;
            var exactRoot = -0.861982568269307;

            var approximateRoot = solveIteratively(func, eps, 1);
            
            var approximateRootWithinBorders = exactRoot - eps <= approximateRoot && approximateRoot <= exactRoot + eps;
            expect(approximateRootWithinBorders).toBe(true);
        });
});

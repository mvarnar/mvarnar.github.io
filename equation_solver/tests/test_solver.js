function test(coefficientMatrix, eps, expected) {
    var result = solveIteratively(coefficientMatrix, eps);
    var status = result.status;
    var x = result.x;

    expect(status).toBe("solved");
    math.abs(math.subtract(x, expected)).forEach(function (diff, index, matrix) {
        expect(diff < eps).toBe(true);
    });
}

describe("solveIteratively", function () {
    it("case from the book",
        function () {
            var coefficientMatrix = math.matrix([
                    [20.9, 1.2, 2.1, 0.9, -21.7],
                    [1.2, 21.2, 1.5, 2.5, -27.46],
                    [2.1, 1.5, 19.8, 1.3, -28.76],
                    [0.9, 2.5, 1.3, 32.1, -49.72]
                ]);
            var eps = 0.001;
            var expected = math.matrix([ [0.7999], [0.9999], [1.1999], [1.3999] ]);

            test(coefficientMatrix, eps, expected);
        });

    it("case 7",
        function() {
            var coefficientMatrix = math.matrix([
                [-3.1, -1.7, -0.6, 0.9],
                [-1.7, 3.5, -0.8, -2.6],
                [0.6, 0.8, -1.9, -1.7]
            ]);
            var eps = 0.001;
            var expected = math.matrix([[0.0608943511], [0.6332642334], [-0.6088694751]]);

            test(coefficientMatrix, eps, expected);
        });

    it("case 7 eps=0.000001",
        function() {
            var coefficientMatrix = math.matrix([
                [-3.1, -1.7, -0.6, 0.9],
                [-1.7, 3.5, -0.8, -2.6],
                [0.6, 0.8, -1.9, -1.7]
            ]);
            var eps = 0.000001;
            var expected = math.matrix([[0.0608943511], [0.6332642334], [-0.6088694751]]);

            test(coefficientMatrix, eps, expected);
        });

    it("case when beta > 1/2",
        function() {
            var coefficientMatrix = math.matrix([
                [2, 1.5, -1],
                [1.6, 2, -2],
            ]);
            var eps = 0.001;
            var expected = math.matrix([[-0.625], [1.5]]);

            test(coefficientMatrix, eps, expected);
        });

    it("case with one variable",
        function() {
            var coefficientMatrix = math.matrix([
                [2, 1]
            ]);
            var eps = 0.001;
            var expected = math.matrix([[-0.5]]);

            test(coefficientMatrix, eps, expected);
        });

    it("case with zero free coefficients",
        function () {
            var coefficientMatrix = math.matrix([
                [2, 1, 0],
                [1, 2, 0]
            ]);
            var eps = 0.001;
            var expected = math.matrix([[0], [0]]);

            test(coefficientMatrix, eps, expected);
        });

    it("case with dependent row",
        function () {
            var coefficientMatrix = math.matrix([
                [2, 1, 0],
                [4, 2, 0]
            ]);
            var eps = 0.001;

            var status = solveIteratively(coefficientMatrix, eps).status;
            expect(status).toBe("unsolved");
        });

    it("case with diagonal elements only",
        function () {
            var coefficientMatrix = math.matrix([
                [1, 0, 2],
                [0, 1, 3]
            ]);
            var eps = 0.001;
            var expected = math.matrix([[-2], [-3]]);

            test(coefficientMatrix, eps, expected);
        });
});

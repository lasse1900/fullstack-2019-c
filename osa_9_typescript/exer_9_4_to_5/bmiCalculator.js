"use strict";
exports.__esModule = true;
exports.calculateBmi = void 0;
var parseArguments = function (args) {
    if (args.length < 4)
        throw new Error("Not enough arguments");
    if (args.length > 4)
        throw new Error("Too many arguments");
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    }
    else {
        throw new Error("Provided values were not numbers!");
    }
};
var calculateBmi = function (height, weight) {
    var bmi = weight / (Math.pow(height, 2) / 10000);
    if (bmi >= 25) {
        bmi = "overweigh";
        console.log(bmi);
    }
    else if (bmi < 18.5) {
        bmi = "underweigh";
        console.log(bmi);
    }
    else {
        bmi = "Normal (healthy weigth)";
        console.log(bmi);
    }
    return { height: height, weight: weight, bmi: bmi };
};
exports.calculateBmi = calculateBmi;
try {
    var _a = parseArguments(process.argv), value1 = _a.value1, value2 = _a.value2;
    exports.calculateBmi(value1, value2);
}
catch (e) {
    console.log("Error, something bad happened, message: ", e.message);
}

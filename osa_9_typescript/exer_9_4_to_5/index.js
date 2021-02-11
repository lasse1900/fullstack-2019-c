"use strict";
exports.__esModule = true;
var express_1 = require("express");
var bmiCalculator_1 = require("./bmiCalculator");
var app = express_1["default"]();
app.use(express_1["default"].json());
app.get("/hello", function (_req, res) {
    res.send("Hello Full Stack!");
});
app.get("/bmi", function (req, res) {
    try {
        var _a = req.query, height = _a.height, weight = _a.weight;
        if (!height || !weight) {
            throw new Error("Missing parameters");
        }
        var bmi = bmiCalculator_1.calculateBmi(Number(height), Number(weight));
        res.send(bmi);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message });
        }
    }
});
var PORT = 3002;
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});

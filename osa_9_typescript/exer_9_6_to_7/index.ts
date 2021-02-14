import express from "express";
const app = express();
app.use(express.json());

import { calculateBmi } from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const { height, weight } = req.query;

    if (!height || !weight) {
      throw new Error("Missing parameters");
    }
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
      throw new Error("malformatted paramenters");
    }
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send(bmi);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    }
  }
});

app.post("/exercises", (req, res) => {
  try {
    const result = calculateExercises(req.body);
    res.send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    }
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

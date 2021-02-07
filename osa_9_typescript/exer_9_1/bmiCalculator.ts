type Operation = "bmi";

type Result = number;

const calculator = (a: number, b: number, op: Operation): Result => {
  switch (op) {
    case "bmi":
      return b / ((a * a) / 10000);
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

try {
  // Please type your heigth and weight (hard coded values)
  let bmi = calculator(184, 73, "bmi");
  if (bmi > 18.5 && bmi < 25) {
    console.log("Normal (healthy weight)");
  } else {
    console.log("Please, check your bmi: " + bmi.toPrecision(3));
  }
} catch (e) {
  console.log("Something went wrong, error message: ", e.message);
}

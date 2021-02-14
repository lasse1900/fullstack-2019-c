interface BmiCalculator {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): BmiCalculator => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number) => {
  let bmi: number | string = weight / (height ** 2 / 10000);
  if (bmi >= 25) {
    bmi = "overweigh";
    console.log(bmi);
  } else if (bmi < 18.5) {
    bmi = "underweigh";
    console.log(bmi);
  } else {
    bmi = "Normal (healthy weigth)";
    console.log(bmi);
  }
  return { height, weight, bmi };
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  calculateBmi(value1, value2);
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}

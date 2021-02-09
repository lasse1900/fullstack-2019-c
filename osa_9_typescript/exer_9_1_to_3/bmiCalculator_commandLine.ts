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

const multiplicator = (b: number, a: number, printText: string) => {
  let index = a / ((b * b) / 10000);
  if (index >= 25) {
    console.log("Overweight");
  } else {
    console.log(printText, index);
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(
    value1,
    value2,
    `With your bmi indexes length: ${value1} and weight: ${value2}, BMI-index is:`
  );
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}

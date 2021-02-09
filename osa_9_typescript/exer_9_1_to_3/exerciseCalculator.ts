interface Calculator {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface calculatorArgs {
  myHours: Array<number>;
  myTarget: number;
}

const handleArguments = (args: Array<string>): calculatorArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      myTarget: Number(args[2]),
      myHours: args.map(Number).slice(3),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateExercise = (
  target: number,
  hours: Array<number>
): Calculator => {
  let trainingDaysCount = 0;
  let totalTrainingHours = hours.reduce(function (sum, order) {
    return sum + order;
  }, 0);

  let rating = 0;
  let ratingDescription = "";

  const periodLength = hours.length;
  const average = totalTrainingHours / hours.length;
  const success = average > target ? true : false;

  for (let i = 0; i < hours.length; i++) {
    if (hours[i] > 0) {
      trainingDaysCount++;
    }
  }

  const trainingDays = trainingDaysCount;
  if (average > target) {
    rating = 3;
    ratingDescription = "You have been dilligent";
  } else if (average < target) {
    rating = 2;
    ratingDescription = "under your target";
  } else if (average < 1) {
    rating = 1;
    ratingDescription = "you have been lazy";
  }

  const exerciseValues = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
  console.log(exerciseValues);
  return exerciseValues;
};

try {
  const { myHours, myTarget } = handleArguments(process.argv);
  calculateExercise(myTarget, myHours);
} catch (e) {
  console.log("Something went wrong, error message: ", e.message);
}

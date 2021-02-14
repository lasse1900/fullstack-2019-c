interface Calculator {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface CalculatorArgs {
  target: number;
  daily_exercises: Array<number>;
}

const calculateExercises = (args: CalculatorArgs): Calculator => {
  if (!args.daily_exercises || !args.target)
    throw new Error("Not enough arguments");

  const target = args.target;
  const hours = args.daily_exercises;
  let success = 2 < 3;
  let totalTrainingHours = hours.reduce(function (sum, order) {
    return sum + order;
  }, 0);

  let rating = 1;
  let ratingDescription = "You have been lazy";
  let trainingDaysCount = 0;
  let periodLength = hours.length;

  for (let i = 0; i < hours.length; i++) {
    if (hours[i] > 0) {
      trainingDaysCount++;
    }
  }
  let average = totalTrainingHours / hours.length;
  let trainingDays = trainingDaysCount;

  if (average === target || average > target) {
    success = 2 > 1;
  } else {
    success = 2 < 1;
  }

  if (success) {
    rating = 3;
    ratingDescription = "You have been dilligent!";
  } else if (average > target * 0.8) {
    rating = 2;
    ratingDescription = "a bit under your target";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

export default calculateExercises;
export const carbohydrates = (calories, macroPercentage) => {
  const calculatedCalories = calories / (100 / macroPercentage)
  const serving = (calculatedCalories / 4).toFixed(2)

  return {
    calories: calculatedCalories,
    serving: serving
  }
}

export const proteins = (calories, macroPercentage) => {
  const calculatedCalories = calories / (100 / macroPercentage)
  const serving = (calculatedCalories / 4).toFixed(2)

  return {
    calories: calculatedCalories,
    serving: serving
  }
}

export const fats = (calories, macroPercentage) => {
  const calculatedCalories = calories / (100 / macroPercentage)
  const serving = (calculatedCalories / 9).toFixed(2)

  return {
    calories: calculatedCalories,
    serving: serving
  }
}
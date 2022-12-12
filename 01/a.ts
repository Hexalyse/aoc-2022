// Open input.txt file and read the content
const input = await Deno.readTextFile("./input.txt");

const elvesFood = input.split("\n\n");

const elvesCalories = elvesFood.map((food) => {
  const foodCalories = food.split("\n").map((line) => parseInt(line));
  return foodCalories.reduce((a, b) => a + b, 0);
});

console.log(Math.max(...elvesCalories));
const input = await Deno.readTextFile("./input.txt");

const pairs = input.split("\n");

// Calculate in how many pairs there is an overlap
const overlap = pairs.reduce((acc, pair) => {
  const [range1, range2] = pair.split(",");
  const [min1, max1] = range1.split("-").map((x) => parseInt(x));
  const [min2, max2] = range2.split("-").map((x) => parseInt(x));
  if ((min1 <= max2 && min2 <= max1) || (min2 <= max1 && min1 <= max2)) {
    acc++;
  }
  return acc;
}, 0);

console.log(overlap);

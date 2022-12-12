const input = await Deno.readTextFile("./input.txt");

const pairs = input.split("\n");

// Each pair looks like this:
// x-y,a-b
// where x-y is a range, and a-b another range

// Calculate in how many pairs one range fully contains the other
const fullyContained = pairs.reduce((acc, pair) => {
  const [range1, range2] = pair.split(",");
  const [min1, max1] = range1.split("-").map((x) => parseInt(x));
  const [min2, max2] = range2.split("-").map((x) => parseInt(x));
  if (min1 <= min2 && max1 >= max2 || min2 <= min1 && max2 >= max1) {
    acc++;
  }
  return acc;
}, 0);

console.log(fullyContained);

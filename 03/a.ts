const input = await Deno.readTextFile("./input.txt");

// map that translates 'a' to 'z' to 1 to 26 and 'A' to 'Z' to 27 to 52
const priorityMap: { [key: string]: number } = {};
for (let i = 0; i < 26; i++) {
  priorityMap[String.fromCharCode(i + 97)] = i + 1;
  priorityMap[String.fromCharCode(i + 65)] = i + 27;
}
const bags = input.split("\n")
  .map((line) => [line.slice(0, line.length / 2), line.slice(line.length / 2)]);
  
const badlyPlacedItems = [];
// add items that appear in both slots of each bag to the array badlyPlacedItems
for (const bag of bags) {
  for (const item of bag[0]) {
    if (bag[1].includes(item)) {
      badlyPlacedItems.push(item);
      break;
    }
  }
}

// calculate the sum of the priorities of the badly placed items
const sum = badlyPlacedItems.reduce((acc, item) => acc + priorityMap[item], 0);
console.log(sum);

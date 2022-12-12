// Open input.txt file and read the content
const input = await Deno.readTextFile("./input.txt");

const inputArray = input.split("\n").map((line) => line.trim());

const height = inputArray.length;
const width = inputArray[0].length;

// all trees on borders are visible, don't test those
let visibleTrees = height * 2 + width * 2 - 4;

console.log("visibleTrees", visibleTrees);

function isTreeVisible(x: number, y: number) {
  const currentTreeHeight = parseInt(inputArray[y][x]);
  let [up, down, left, right] = [true, true, true, true]
  // look left
  for (let i = x - 1; i >= 0; i--) {
    if (parseInt(inputArray[y][i]) >= currentTreeHeight) {
      left = false;
      break;
    }
  }
  // look right
  for (let i = x + 1; i < width; i++) {
    if (parseInt(inputArray[y][i]) >= currentTreeHeight) {
      right = false;
      break;
    }
  }
  // look up
  for (let i = y - 1; i >= 0; i--) {
    if (parseInt(inputArray[i][x]) >= currentTreeHeight) {
      up = false;
      break;
    }
  }
  // look down
  for (let i = y + 1; i < height; i++) {
    if (parseInt(inputArray[i][x]) >= currentTreeHeight) {
      down = false;
      break;
    }
  }
  if (up || down || left || right) {
    return true;
  }
  return false;
}

// iterate over all internal trees
for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
      // check if tree is visible
      if (isTreeVisible(x, y)) {
        visibleTrees++;
      }
  }
}

console.log(visibleTrees);
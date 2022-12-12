// Open input.txt file and read the content
const input = await Deno.readTextFile("./input.txt");
const inputArray = input.split("\n").map((line) => line.trim());

const height = inputArray.length;
const width = inputArray[0].length;

let bestScenicScore = 0;

function calcScenicScore(x: number, y: number) {
  const currentTreeHeight = parseInt(inputArray[y][x]);
  // count how many trees are smaller or the same height than current tree to the left
  let left = 0;
  for (let i = x - 1; i >= 0; i--) {
    if (parseInt(inputArray[y][i]) < currentTreeHeight) {
      left++;
    } else {
      left++;
      break;
    }
  }
  // count how many trees are smaller or the same height than current tree to the right
  let right = 0;
  for (let i = x + 1; i < width; i++) {
    if (parseInt(inputArray[y][i]) < currentTreeHeight) {
      right++;
    } else {
      right++;
      break;
    }
  }
  // count how many trees are smaller or the same height than current tree to the top
  let top = 0;
  for (let i = y - 1; i >= 0; i--) {
    if (parseInt(inputArray[i][x]) < currentTreeHeight) {
      top++;
    } else {
      top++;
      break;
    }
  }
  // count how many trees are smaller or the same height than current tree to the bottom
  let bottom = 0;
  for (let i = y + 1; i < height; i++) {
    if (parseInt(inputArray[i][x]) < currentTreeHeight) {
      bottom++;
    } else {
      bottom++;
      break;
    }
  }
  return left * right * top * bottom;
}

// loop over all trees
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    // if current tree is visible, count it
    const treeScenicScore = calcScenicScore(x, y);
    if (treeScenicScore > bestScenicScore) {
      console.log("new best scenic score", treeScenicScore, "at", x, y);
      bestScenicScore = treeScenicScore;
    }
  }
}

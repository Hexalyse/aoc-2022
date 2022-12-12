const input = await Deno.readTextFile("./input.txt");

// Input is of the form:
// Sabqponm
// abcryxxl
// accszExk
// acctuvwj
// abdefghi

// Parse the input and create a 2D array of characters representing the grid
const grid = input.split("\n").map((line) => line.split(""));

function findCharPos(char: string) {
  // find the position of the 'S' in the grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === char) {
        return [i, j];
      }
    }
  }
}
const startPos = findCharPos("S") as number[];
const endPos = findCharPos("E") as number[];
grid[startPos[0]][startPos[1]] = "a";
grid[endPos[0]][endPos[1]] = "z";

let bestDistance = Infinity;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] !== "a") {
      continue;
    }
    const startPos = [i, j];
    const queue = [];
    const visited = new Set();
    const distances = new Map();
    queue.push(startPos);
    visited.add(startPos.toString());
    distances.set(startPos.toString(), 0);
    // Keep looping until there are no more positions in the queue to explore
    while (queue.length > 0) {
      // Get the next position in the queue
      const pos = queue.shift() as number[];
      const row = pos[0];
      const col = pos[1];
      const distance = distances.get(pos.toString());

      // If we've reached the ending position, we're done
      if (pos.toString() === endPos.toString()) {
        break;
      }

      // Loop through the possible positions we can move to from the current position
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // Skip the current position, any positions outside the grid, and diagonals
          if (
            (i === 0 && j === 0) ||
            row + i < 0 ||
            row + i >= grid.length ||
            col + j < 0 ||
            col + j >= grid[0].length ||
            (i !== 0 && j !== 0)
          ) {
            continue;
          }

          // Get the value of the next position
          let nextValue = grid[row + i][col + j];
          if (nextValue === "E") {
            nextValue = "z";
          }
          // Get the value of the current position
          let currValue = grid[row][col];
          if (currValue === "S") {
            currValue = "a";
          }

          // Only move to the next position if its value is lower, equal, or at most one letter higher than the current position's value

          if (
            nextValue.charCodeAt(0) <= currValue.charCodeAt(0) ||
            nextValue.charCodeAt(0) === currValue.charCodeAt(0) + 1
          ) {
            // Calculate the next position
            const nextPos = [row + i, col + j];

            // Skip the position if we've already visited it
            if (visited.has(nextPos.toString())) {
              continue;
            }

            // Add the next position to the queue and visited set
            queue.push(nextPos);
            visited.add(nextPos.toString());

            // Set the distance to the next position in the distances map
            distances.set(nextPos.toString(), distance + 1);
          }
        }
      }
    }
    if (distances.get(endPos.toString()) < bestDistance) {
      bestDistance = distances.get(endPos.toString()) as number;
    }
  }
}

console.log(bestDistance);
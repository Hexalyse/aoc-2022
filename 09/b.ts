// Define constants for the directions that the head can move
const UP = "U";
const DOWN = "D";
const LEFT = "L";
const RIGHT = "R";

// Helper function to move the given position by one step in the given direction
function move(position: number[], direction: string): number[] {
  switch (direction) {
    case UP:
      return [position[0], position[1] - 1];
    case DOWN:
      return [position[0], position[1] + 1];
    case LEFT:
      return [position[0] - 1, position[1]];
    case RIGHT:
      return [position[0] + 1, position[1]];
  }
}

// Helper function to check if the given positions are adjacent
function isAdjacent(pos1: number[], pos2: number[]) {
  return Math.abs(pos1[0] - pos2[0]) <= 1 && Math.abs(pos1[1] - pos2[1]) <= 1;
}

function moveDiagonally(tail: number[], head: number[]) {
  // Move the tail in the direction of the head
  if (head[0] > tail[0]) {
    tail[0]++;
  } else if (head[0] < tail[0]) {
    tail[0]--;
  }
  if (head[1] > tail[1]) {
    tail[1]++;
  } else if (head[1] < tail[1]) {
    tail[1]--;
  }
}

// Function to simulate the movement of the rope
function simulateRope(steps: string[]) {
  // Initialize the grid and the positions of the head and tail
  const grid = new Map();
  const knots = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  // Loop over the steps and simulate the movement of the rope
  for (const step of steps) {
    // Move the head in the specified direction
    const direction = step[0];
    const distance = parseInt(step.substring(2), 10);
    for (let i = 0; i < distance; i++) {
      // loop over the knots
      let head = knots[0];
      head = move(head, direction);
      knots[0] = head;
      for (let j = 0; j < knots.length - 1; j++) {
        const first = knots[j];
        let second = knots[j + 1];

        // Check if the head is touching the second
        if (isAdjacent(first, second)) {
          // If the first is touching the second, the second stays in place
          if (j === knots.length - 2) {
            grid.set(second.toString(), (grid.get(second.toString()) || 0) + 1);
          }
        } else if (first[0] === second[0] || first[1] === second[1]) {
          // If the first is two steps away from the second in a horizontal or vertical
          // direction, the second moves towards the first
          if (first[0] > second[0] + 1) {
            second = move(second, RIGHT);
          } else if (first[0] < second[0] - 1) {
            second = move(second, LEFT);
          } else if (first[1] > second[1] + 1) {
            second = move(second, DOWN);
          } else if (first[1] < second[1] - 1) {
            second = move(second, UP);
          }
          if (j === knots.length - 2) {
            grid.set(second.toString(), (grid.get(second.toString()) || 0) + 1);
          }
        } else {
          // If the first and second are not in the same row or column and are not
          // touching, the second moves one step diagonally towards the first
          moveDiagonally(second, first);
          if (j === knots.length - 2) {
            grid.set(second.toString(), (grid.get(second.toString()) || 0) + 1);
          }
        }
        knots[j + 1] = second;
        knots[j] = first;
      }
    }
  }
  // Return the final position of the tail
  return grid;
}

const input = await Deno.readTextFile("./input.txt");
const stepsInput = input.split("\n");
console.log(simulateRope(stepsInput).size);

// Define constants for the directions that the head can move
const UP = 'U';
const DOWN = 'D';
const LEFT = 'L';
const RIGHT = 'R';

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
    default:
      return [0, 0]
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
  let head = [0, 0];
  let tail = [0, 0];

  // Loop over the steps and simulate the movement of the rope
  for (const step of steps) {
    // Move the head in the specified direction
    const direction = step[0];
    const distance = parseInt(step.substring(2), 10);
    for (let i = 0; i < distance; i++) {
      head = move(head, direction);

      // Check if the head is touching the tail
      if (isAdjacent(head, tail)) {
        // If the head is touching the tail, the tail stays in place
        grid.set(tail.toString(), (grid.get(tail.toString()) || 0) + 1);
      } else if (head[0] === tail[0] || head[1] === tail[1]) {
        // If the head is two steps away from the tail in a horizontal or vertical
        // direction, the tail moves one step in that direction
        tail = move(tail, direction);
        grid.set(tail.toString(), (grid.get(tail.toString()) || 0) + 1);
      } else {
        // If the head and tail are not in the same row or column and are not
        // touching, the tail moves one step diagonally towards the head
        moveDiagonally(tail, head);
        grid.set(tail.toString(), (grid.get(tail.toString()) || 0) + 1);
      }
    }
  }

  // Return the final position of the tail
  return grid;
}

const input = await Deno.readTextFile("./input.txt");
const stepsInput = input.split("\n");
console.log(simulateRope(stepsInput).size);

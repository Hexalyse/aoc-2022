const input = await Deno.readTextFile("./input.txt");

// Initialize a 500x500 grid of .s
const grid = Array.from({ length: 3000 }, () =>
  Array.from({ length: 3000 }, () => ".")
);
let floorY = 0;
for (const line of input.split("\n")) {
  const pathPoints = line.split(" -> "); // each pathPoint is of the form "x,y"
  // fill the grid with # on the path going from the first point to the second, the second to the third, etc.
  for (let i = 0; i < pathPoints.length - 1; i++) {
    const startPoint = pathPoints[i];
    const endPoint = pathPoints[i + 1];

    // extract the coordinates of the startPoint and endPoint
    const startCoordinates = startPoint.split(",");
    const endCoordinates = endPoint.split(",");

    // get the x and y coordinates of the startPoint and endPoint
    const startX = Math.min(
      parseInt(startCoordinates[0]),
      parseInt(endCoordinates[0])
    );
    const startY = Math.min(
      parseInt(startCoordinates[1]),
      parseInt(endCoordinates[1])
    );
    const endX = Math.max(
      parseInt(startCoordinates[0]),
      parseInt(endCoordinates[0])
    );
    const endY = Math.max(
      parseInt(startCoordinates[1]),
      parseInt(endCoordinates[1])
    );

    if (endY + 2 > floorY) {
      floorY = endY + 2;
    }
    // fill the grid with #s starting from startPoint to endPoint
    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        grid[x][y] = "#";
      }
    }
  }
}

// Fill the floor with #
for (let x = 0; x < 3000; x++) {
  grid[x][floorY] = "#";
}

for (let sandCount = 0; sandCount < Infinity; sandCount++) {
  // drop sand and let it fall until it stops
  let atRest = false;
  let sandPos = [500, 0];
  let finished = false;
  while (!atRest) {
    if (grid[sandPos[0]][sandPos[1] + 1] === ".") {
      // sand is falling straight down
      sandPos[1]++;
    } else if (grid[sandPos[0] - 1][sandPos[1] + 1] === ".") {
      // sand is falling down-left
      sandPos[0]--;
      sandPos[1]++;
    } else if (grid[sandPos[0] + 1][sandPos[1] + 1] === ".") {
      // sand is falling down-right
      sandPos[0]++;
      sandPos[1]++;
    } else {
      // if sand is at rest at the start position, we're done
      if (sandPos[0] === 500 && sandPos[1] === 0) {
        finished = true;
        break;
      }
      grid[sandPos[0]][sandPos[1]] = "o";
      atRest = true;
    }
  }
  if (finished) {
    console.log(sandCount + 1);
    break;
  }
}

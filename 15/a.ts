const input = await Deno.readTextFile("./input.txt");

// Split the input into lines
const lines = input.split("\n");

// Initialize empty grid
const grid = [];

const beacons: number[][] = [];
// Parse the coordinates of each sensor and beacon from the input
const pairs: {
  sensor: { x: number; y: number };
  beacon: { x: number; y: number };
  distance: number;
}[] = [];
for (const line of lines) {
  const [sensor, beacon] = line.split(":");
  const [, x1, y1] = /x=(-?\d+), y=(-?\d+)/.exec(sensor);
  const [, x2, y2] = /x=(-?\d+), y=(-?\d+)/.exec(beacon);
  pairs.push({
    sensor: { x: parseInt(x1), y: parseInt(y1) },
    beacon: { x: parseInt(x2), y: parseInt(y2) },
    distance:
      Math.abs(parseInt(x1) - parseInt(x2)) +
      Math.abs(parseInt(y1) - parseInt(y2)),
  });
  // if beacon isn't already in the beacons array, add it
  if (
    !beacons.some(
      (beacon) => beacon[0] === parseInt(x2) && beacon[1] === parseInt(y2)
    )
  )
    beacons.push([parseInt(x2), parseInt(y2)]);
}

const cantBeBeaconRanges: number[][] = [];
const row = 2000000;
for (const pair of pairs) {
  // calculate the occupied cells minY and maxY and add them to cantBeBeaconRanges array
  const minX = pair.sensor.x - (pair.distance - Math.abs(pair.sensor.y - row));
  const maxX = pair.sensor.x + (pair.distance - Math.abs(pair.sensor.y - row));
  if (minX < maxX) {
    cantBeBeaconRanges.push([minX, maxX]);
  }
}

// Calculate the union of all the cantBeBeaconRanges
const cantBeBeaconRangesUnion = cantBeBeaconRanges.reduce(
  (acc, range) => {
    return [Math.min(acc[0], range[0]), Math.max(acc[1], range[1])];
  },
  [Infinity, -Infinity]
);
console.log(cantBeBeaconRangesUnion);

let result = cantBeBeaconRangesUnion[1] - cantBeBeaconRangesUnion[0] + 1;
console.log(result);
// remove the beacons that have the same y coordinate as the row
result -= beacons.filter((beacon) => beacon[1] === row).length;
console.log(result);

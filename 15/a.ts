const input = await Deno.readTextFile("./input.txt");

// Split the input into lines
const lines = input.split("\n");

// Initialize empty grid
const grid = [];

const beacons = new Set();
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
  beacons.add(`${x2},${y2}`);
}

const minX = Math.min(...pairs.map((p) => p.beacon.x - p.distance));
const maxX = Math.max(...pairs.map((p) => p.beacon.x + p.distance));

const cantBeBeacon = new Set();
const row = 2000000;
for (let x = minX - 1; x < maxX + 1; x++) {
  if (x % 100000 === 0) console.log(x / 100000);
  // iterate over all pairs
  for (const pair of pairs) {
    // Calculate the distance from the current cell to the sensor
    const distanceToSensor =
      Math.abs(x - pair.sensor.x) + Math.abs(row - pair.sensor.y);
    // If the distance is less or equal to the distance to the beacon,
    // and no beacon is present, the cell cannot be a beacon
    if (
      cantBeBeacon.has(`${x},${row}`) === false &&
      distanceToSensor <= pair.distance &&
      beacons.has(`${x},${row}`) === false
    ) {
      cantBeBeacon.add(`${x},${row}`);
    }
  }
}

console.log(cantBeBeacon.size);

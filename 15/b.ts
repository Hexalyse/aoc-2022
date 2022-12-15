const input = await Deno.readTextFile("./input.txt");

// Split the input into lines
const lines = input.split("\n");

function merge(intervals: number[][]): number[][] {
  if (intervals.length < 2) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [];
  let previous = intervals[0];
  for (let i = 1; i < intervals.length; i += 1) {
    if (previous[1] >= intervals[i][0] - 1) {
      previous = [previous[0], Math.max(previous[1], intervals[i][1])];
    } else {
      result.push(previous);
      previous = intervals[i];
    }
  }
  result.push(previous);
  return result;
}

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

const minPossible = 0;
const maxPossible = 4000000;
for (let row = minPossible; row <= maxPossible; row++) {
  const cantBeBeaconRanges: number[][] = [];
  for (const pair of pairs) {
    // calculate the occupied cells minY and maxY and add them to cantBeBeaconRanges array
    let minX = pair.sensor.x - (pair.distance - Math.abs(pair.sensor.y - row));
    let maxX = pair.sensor.x + (pair.distance - Math.abs(pair.sensor.y - row));
    if (minX < minPossible) {
      minX = minPossible;
    }
    if (maxX > maxPossible) {
      maxX = maxPossible;
    }
    if (minX < maxX) {
      cantBeBeaconRanges.push([minX, maxX]);
    }
  }
  const cantBeBeaconRangesUnions = merge(cantBeBeaconRanges);
  if (cantBeBeaconRangesUnions.length > 1) {
    const y = row;
    const x = cantBeBeaconRangesUnions[0][1] + 1;
    console.log(`x: ${x}, y: ${y}`);
    console.log(x * 4000000 + y);
    break;
  }
}

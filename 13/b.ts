const input = await Deno.readTextFile("./input.txt");

const packets = input
  .split("\n")
  .filter((line) => line !== "")
  .map((line) => eval(line));

const compare = (
  left: (number | [])[] | number,
  right: (number | [])[] | number
): number => {
  // If both values are integers, return -1 if left is less than right,
  // 1 if left is greater than right, and 0 if left is equal to right
  if (typeof left === "number" && typeof right === "number") {
    return left < right ? -1 : left > right ? 1 : 0;
  }
  // If both values are lists, compare their elements until a decision
  // is made about their order or until both lists have been completely compared
  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length && i < right.length; i++) {
      const order = compare(left[i], right[i]);
      if (order !== 0) return order;
    }
    // If both lists have the same elements, return -1 if left is shorter,
    // 1 if right is shorter, and 0 if they are the same length
    return left.length < right.length ? -1 : left.length > right.length ? 1 : 0;
  }
  // If exactly one value is an integer, convert it to a list and retry the comparison
  if (typeof left === "number") return compare([left], right);
  if (typeof right === "number") return compare(left, [right]);
  return 0;
};

packets.push([[2]]);
packets.push([[6]]);

packets.sort(compare);

const divider1Pos = packets.findIndex(
  (packet) =>
    packet.length === 1 && packet[0].length === 1 && packet[0][0] === 2
);
const divider2Pos = packets.findIndex(
  (packet) =>
    packet.length === 1 && packet[0].length === 1 && packet[0][0] === 6
);

console.log((divider1Pos + 1) * (divider2Pos + 1));
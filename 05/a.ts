// Open input.txt file and read the content
const input = await Deno.readTextFile("./input.txt");

const cratesInput = input.split("\n\n")[0];
const movesInput = input.split("\n\n")[1];

// Let's parse this input in an ugly way
const crates: string[][] = [];
const cratesLines = cratesInput.split("\n");
const cratesColumns = cratesLines[cratesLines.length - 1].split("   ").length;
// remove the last line of crates from cratesLines
cratesLines.pop();
for (let i = 0; i < cratesColumns; i++) {
  crates.push([]);
  for (const line of cratesLines.toReversed()) {
    const crate = line[i * 4 + 1];
    if (crate !== " ") {
      crates[i].push(crate);
    }
  }
}

// let's move crates arounds
for (const moveLine of movesInput.split("\n")) {
  const [_1, amount, _2, from, _3, to] = moveLine.split(" ");
  for (let i = 0; i < parseInt(amount); i++) {
    crates[parseInt(to) - 1].push(crates[parseInt(from) - 1].pop() as string);
  }
}
console.log(crates.map((column) => column.pop()).join(""))
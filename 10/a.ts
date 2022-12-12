const input = await Deno.readTextFile("./input.txt");
const instructions = input.split("\n");
const finalInstructions: number[] = [];
for (const instruction of instructions) {
  if (instruction === "noop") {
    finalInstructions.push(0);
  } else {
    finalInstructions.push(0);
    finalInstructions.push(parseInt(instruction.split(" ")[1]));
  }
}

let x = 1;
let signalStrength = 0;
for (let i = 1; i < finalInstructions.length; i++) {
  if ((i - 20) % 40 === 0) {
    signalStrength += x * i;
  }
  x += finalInstructions[i - 1];
}
console.log(signalStrength);
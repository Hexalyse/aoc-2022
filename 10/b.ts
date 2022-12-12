const input = await Deno.readTextFile("./input.txt");

const instructions = input.split("\n");
const finalInstructions: number[] = [];
for (const instruction of instructions) {
  if (instruction === "noop") {
    finalInstructions.push(0);
  } else {
    const [_op, arg] = instruction.split(" ");
    finalInstructions.push(0);
    finalInstructions.push(parseInt(arg));
  }
}

let x = 1;
let screen = "";
for (let i = 1; i <= finalInstructions.length; i++) {
  if ((i % 40) >= x && (i % 40) < x + 3) {
    screen += "#";
  } else {
    screen += ".";
  }
  if ((i % 40) === 0) {
    screen += "\n";
  }
  x += finalInstructions[i - 1];
}
console.log(screen);
const input = await Deno.readTextFile("./input.txt");
const inputMonkeys: string[] = input.split("\n\n");

type monkey = {
    items: number[];
    operator: string;
    operand: number;
    divisibleBy: number;
    ifTrue: number;
    ifFalse: number;
    inspections: number;
}

const monkeys: monkey[] = []
for (const inputMonkey of inputMonkeys) {
  const lines = inputMonkey.split("\n");
  const monkey: monkey = {
    items: [],
    operator: "+",
    operand: 0,
    divisibleBy: 0,
    ifTrue: 0,
    ifFalse: 0,
    inspections: 0,
  };
  monkey.items = lines[1]
    .split(": ")[1]
    .split(", ")
    .map((item) => parseInt(item));
  monkey.operator = lines[2].split(" ")[6];
  monkey.operand = parseInt(lines[2].split(" ")[7]);
  monkey.divisibleBy = parseInt(lines[3].split(" ")[5]);
  monkey.ifTrue = parseInt(lines[4].split(" ")[9]);
  monkey.ifFalse = parseInt(lines[5].split(" ")[9]);
  monkeys.push(monkey);
}

for (let round = 0; round < 20; round++) {
  for (const monkey of monkeys) {
    for (const item of monkey.items) {
      // if monkey.operand is NaN, then operand is item
      monkey.inspections += 1;
      const operand = isNaN(monkey.operand) ? item : monkey.operand;
      const newWorryLevel = Math.floor((eval(`${item} ${monkey.operator} ${operand}`) / 3));
      if (newWorryLevel % monkey.divisibleBy === 0) {
        monkeys[monkey.ifTrue].items.push(newWorryLevel);
      } else {
        monkeys[monkey.ifFalse].items.push(newWorryLevel);
      }
    }
    // Clear the items
    monkey.items = [];
  }
}

// Sort monkeys by the number of inspections, then take the two with the most, and multiply them
monkeys.sort((a, b) => b.inspections - a.inspections);
console.log(monkeys[0].inspections * monkeys[1].inspections);
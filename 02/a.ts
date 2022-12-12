// Open input.txt file and read the content
const input = await Deno.readTextFile("./input.txt");

const rounds = input.split("\n");

const correspondancePoints = new Map();
correspondancePoints.set("X", 1);
correspondancePoints.set("Y", 2);
correspondancePoints.set("Z", 3);

let score = 0;
for (const round of rounds) {
  const [enemy, player] = round.split(" ");
  score += correspondancePoints.get(player);
  if (enemy === "A" && player === "X") {
    score += 3;
  }
  if (enemy === "B" && player === "Y") {
    score += 3;
  }
  if (enemy === "C" && player === "Z") {
    score += 3;
  }
  if (enemy === "A" && player === "Y") {
    score += 6;
  }
  if (enemy === "B" && player === "Z") {
    score += 6;
  }
  if (enemy === "C" && player === "X") {
    score += 6;
  }
}

console.log(score);
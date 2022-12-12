// Open input.txt file and read the content
const input = await Deno.readTextFile("./input.txt");

const rounds = input.split("\n");

const correspondancePoints = new Map();
correspondancePoints.set("X", 0);
correspondancePoints.set("Y", 3);
correspondancePoints.set("Z", 6);

let score = 0;
for (const round of rounds) {
  const [enemy, result] = round.split(" ");
  // We need to lose the round
  if (result === "X") {
    if (enemy === "A") {
      score += 3;
    }
    if (enemy === "B") {
      score += 1;
    }
    if (enemy === "C") {
      score += 2;
    }
    // We need to draw the round
  } else if (result === "Y") {
    if (enemy === "A") {
        score += 1;
    }
    if (enemy === "B") {
        score += 2;
    }
    if (enemy === "C") {
        score += 3;
    }
    // We need to win the round
  } else if (result === "Z") {
    if (enemy === "A") {
        score += 2;
    }
    if (enemy === "B") {
        score += 3;
    }
    if (enemy === "C") {
        score += 1;
    }
  }
  score += correspondancePoints.get(result);
}

console.log(score);
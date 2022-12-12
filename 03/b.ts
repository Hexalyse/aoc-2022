const input = await Deno.readTextFile("./input.txt");

// map that translates 'a' to 'z' to 1 to 26 and 'A' to 'Z' to 27 to 52
const priorityMap: { [key: string]: number } = {};
for (let i = 0; i < 26; i++) {
  priorityMap[String.fromCharCode(i + 97)] = i + 1;
  priorityMap[String.fromCharCode(i + 65)] = i + 27;
}

// split lines of input (\n) into groups of 3 lines
const groups = input.split("\n")
    .reduce((acc, line, i) => {
        if (i % 3 === 0) {
            acc.push([line]);
        } else {
            acc[acc.length - 1].push(line);
        }
        return acc;
    }, [] as string[][]);


// For each group, find the letter present in the 3 lines
const badges: string[] = groups.map((group) => {
    const [line1, line2, line3] = group;
    const intersection = line1.split("")
        .filter((item) => line2.includes(item) && line3.includes(item));
    return intersection[0];
});

// calculate the sum of the priorities of the badges
const sum = badges.reduce((acc, item) => acc + priorityMap[item], 0);
console.log(sum);

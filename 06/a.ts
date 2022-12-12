// Open input.txt file and read the content
const input = await Deno.readTextFile("./input.txt");

for (let i = 3; i < input.length; i++) {
  const sub = input.substring(i - 3, i + 1);
  // check if all characters are different in sub
  if (sub.split("").every((char, index, array) => array.indexOf(char) === index)) {
    console.log(i + 1);
    break;
  }
}
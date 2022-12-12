// Open input.txt file and read the content
const input = await Deno.readTextFile("./input.txt");

const blocks = input.split("$");
// remove the two first blocks
blocks.shift();
blocks.shift();

type directory = {
  name: string;
  size: number;
  parent: directory | null;
  children: directory[];
};

const root: directory = {
  name: "",
  size: 0,
  parent: null,
  children: [],
};

let parentDir: directory | null = null;
let currentDir: directory = root;

for (const block of blocks) {
  console.log("New block:");
  let lines = block.split("\n").map((line) => line.trim());
  lines = lines.filter((line) => line !== "");
  console.log(lines);
  // If we have only one line, it's a navigation command
  if (lines.length === 1) {
    if (lines[0].includes("cd ..")) {
      console.log("go to parent directory");
      if (currentDir.parent !== null) {
        currentDir = currentDir.parent;
      } else {
        console.log("parent not found");
      }
    } else if (lines[0].includes("cd")) {
      console.log("go into child directory");
      const [_cd, name] = lines[0].split(" ");
      const child = currentDir.children.find((child) => child.name === name);
      if (child !== undefined) {
        currentDir = child;
        parentDir = currentDir;
      } else {
        console.log("child not found");
      }
    }
    // If we have more than one line, it's a ls command
  } else {
    console.log("list files and directories");
    // remove first line
    lines.shift();
    let currentDirSize = 0;
    for (const line of lines) {
      if (line.startsWith("dir")) {
        const [_dir, name] = line.split(" ");
        console.log("create child: ", name);
        currentDir.children.push({
          name: name,
          size: 0,
          parent: currentDir,
          children: [],
        });
      } else {
        const [size, name] = line.split(" ");
        console.log(size, name);
        currentDirSize += parseInt(size);
      }
    }
    currentDir.size = currentDirSize;
  }
}


// Navigte through the tree and recursively add the sizes of the children to the parent
function addChildrenSizeToParent(dir: directory) {
  let sizeOfChildren = 0
  if (dir.children.length === 0) {
    return dir.size;
  }
  for (const child of dir.children) {
    sizeOfChildren += addChildrenSizeToParent(child);
  }
  dir.size += sizeOfChildren;
  return dir.size;
}

addChildrenSizeToParent(root);

// add the size of all directories with a size of at most 100000
let result = 0;
function addSize(dir: directory) {
  if (dir.size <= 100000) {
    result += dir.size;
  }
  for (const child of dir.children) {
    addSize(child);
  }
}
addSize(root);
console.log(result);
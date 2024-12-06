import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return toLinesArray(fileContents('data/06'))
}

function part1(d: string[]) {
  // Find the starting position and direction (always up?).
  let pos = [0,0], dir = [0,-1];
  for (const y in d) {
    const x = d[y].indexOf("^");
    if (x != -1) {
      pos = [x, parseInt(y)];
      break;
    }
  }
  console.log(pos);
  while (true) {
    // Look at next position
    let next = [pos[0] + dir[0], pos[1] + dir[1]]
    // If it's outside the area, quit
    if (next[1] < 0 || next[1] >= d.length || next[0] < 0 || next[0] > d[next[1]].length) {
      break;
    }
    if (d[next[1]][next[0]] == "#") {
      // If it's occupied, rotate CW
      dir = [-dir[1], dir[0]];
      console.log("new direction: " + dir);
    } else {
      // Otherwise move into it (and mark it visited)
      pos = next;
      d[next[1]] = d[next[1]].slice(0, next[0])
                             .concat('X',
                                     d[next[1]].slice(next[0]+1))
      console.log("moving into: " + next);
    }
  }
  // Count the visited squares (and where you started!)
  let sum = 0;
  for (const line of d) {
    const c = line.match(/[\^X]/g)?.length;
    if (c !== undefined) sum += c;
  }
  return sum;
}

function part2(d: string[]) {
  return d.length;
}

let sampleData = toLinesArray(
`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`);

console.log("part1(sampleData) = " + part1(sampleData));
console.log("part1 = " + part1(loadData()));

// console.log("part2(sampleData) = " + part2(sampleData));
// console.log("part2 = " + part2(loadData()));
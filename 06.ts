import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return toLinesArray(fileContents('data/06'))
}

function part1(d: string[]) {
  visitArea(d);
  // Count the visited squares (and where you started!)
  let sum = 0;
  for (const line of d) {
    const c = line.match(/[\^X]/g)?.length;
    if (c !== undefined) sum += c;
  }
  return sum;
}

function visitArea(d: string[]) {
  // Find the starting position and direction (always up?).
  let pos = {x:0, y:0}, dir = {x:0, y:-1};
  for (const y in d) {
    const x = d[y].indexOf("^");
    if (x != -1) {
      pos = {x: x, y: parseInt(y)};
      break;
    }
  }
  while (true) {
    // Look at next position
    let next = {x: pos.x + dir.x, y: pos.y + dir.y}
    // If it's outside the area, quit
    if (next.y < 0 || next.y >= d.length || next.x < 0 || next.x >= d[next.y].length) {
      break;
    }
    if (d[next.y][next.x] == "#") {
      // If it's occupied, rotate CW
      dir = {x: -dir.y, y: dir.x};
    } else {
      // Otherwise move into it (and mark it visited)
      pos = next;
      d[next.y] = d[next.y].slice(0, next.x)
                             .concat('X',
                                     d[next.y].slice(next.x+1))
    }
  }
}

function part2(d: string[]) {
  // Make a fresh copy of d
  let fresh = d.map((l) => l.slice());
  // Find all the visited spots
  visitArea(d);
  // For each visited spot, make a copy with an extra obstacle and see if that makes a loop
  let potentialObstacles = 0;
  for (let y = 0; y < d.length; ++y) {
    for (let x = 0; x < d[y].length; ++x) {
      if (d[y][x] != 'X') continue;
      let hypothetical = fresh.map((l) => l.slice());
      hypothetical[y] = hypothetical[y].slice(0, x)
                       .concat('#',
                               hypothetical[y].slice(x+1));
      if (hasLoop(hypothetical))
        potentialObstacles++;
    }
  }
  return potentialObstacles;
}

function hasLoop(d: string[]) {
  let potentialObstacles = 0;
  // Find the starting position and direction (always up?).
  let pos = {x:0, y:0}, dir = {x:0, y:-1};
  for (const y in d) {
    const x = d[y].indexOf("^");
    if (x != -1) {
      pos = {x: x, y: parseInt(y)};
      break;
    }
  }
  // travelLog is a 2d array of directions that we passed through that position.
  let travelLog = [];
  for (let y = 0; y < d.length; y++) {
    travelLog[y] = [];
    for (let x = 0; x < d[y].length; x++) {
      travelLog[y][x] = []
    }
  }
  travelLog[pos.y][pos.x].push(dir);
  while (true) {
    // Look at next position
    let next = {x: pos.x + dir.x, y: pos.y + dir.y}
    // If it's outside the area, there's no loop
    if (next.y < 0 || next.y >= d.length || next.x < 0 || next.x >= d[next.y].length) {
      return false;
    }
    if (d[next.y][next.x] == "#") {
      // If it's occupied, rotate CW and update the travelLog
      dir = {x: -dir.y, y: dir.x};
      travelLog[pos.y][pos.x].push(dir);
    } else {
      // If we've been there before in this direction, we're in a loop
      if (travelLog[next.y][next.x].findIndex((e) => e.x == dir.x && e.y == dir.y) != -1) {
        return true;
      }
      // Otherwise move into it and update the travelLog
      pos = next;
      travelLog[next.y][next.x].push(dir);
    }
  }
}

let sampleData = 
`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

console.log("part1(sampleData) = " + part1(toLinesArray(sampleData)));
console.log("part1 = " + part1(loadData()));
console.log("part2(sampleData) = " + part2(toLinesArray(sampleData)));
console.log("part2 = " + part2(loadData()));
import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return toLinesArray(fileContents('data/10'))
}

function part1(d: string[]) {
  let data = d.map((l) => [...l].map((c) => parseInt(c)));
  let sum = 0;
  // Scan for 0s
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (d[y][x] != "0") continue;
      // For each one, get the list of unique next steps
      const nexts = findUniqueNextSteps(data, [{x:x, y:y}]);
      sum += nexts.length;
    }
  }

  return sum;
}

function findUniqueNextSteps(d: int[][], steps: Object[]) {
  const stepVal = d[steps[0].y][steps[0].x];
  if (stepVal == 9) return steps;
  let nexts = [];
  for (let c of steps) {
    for (let n of [{x:c.x+1, y:c.y}, {x:c.x-1, y:c.y}, {x:c.x, y:c.y+1}, {x:c.x, y:c.y-1}]) {
      if (n.y < 0 || n.y >= d.length || n.x < 0 || n.x >= d[n.y].length) continue;
      if (d[n.y][n.x] != stepVal + 1) continue;
      nexts.push(n);
    }
  }
  if (nexts.length == 0) return [];
  // Uniquify and find next
  let seen = {};
  let unique = nexts.filter((n) => {
    const nstr = ""+n.x+","+n.y;
    if (nstr in seen) return false;
    seen[nstr] = true;
    return true;
  })
  return findUniqueNextSteps(d, unique);
}

function part2(d: string[]) {
  let data = d.map((l) => [...l].map((c) => parseInt(c)));
  let sum = 0;
  // Scan for 0s
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (d[y][x] != "0") continue;
      // For each one, get the list of unique next steps
      sum += countUniqueNextSteps(data, {x:x, y:y});
    }
  }

  return sum;
}

function countUniqueNextSteps(d: int[][], c: Object) {
  const stepVal = d[c.y][c.x];
  if (stepVal == 9) return 1;
  let nexts = [];
  for (let n of [{x:c.x+1, y:c.y}, {x:c.x-1, y:c.y}, {x:c.x, y:c.y+1}, {x:c.x, y:c.y-1}]) {
    if (n.y < 0 || n.y >= d.length || n.x < 0 || n.x >= d[n.y].length) continue;
    if (d[n.y][n.x] != stepVal + 1) continue;
    nexts.push(n);
  }
  if (nexts.length == 0) return 0;
  // Uniquify and find next
  let seen = {};
  let sum = 0;
  nexts.forEach((n) => {
    const nstr = ""+n.x+","+n.y;
    if (nstr in seen) return;
    sum += countUniqueNextSteps(d, n);
    seen[nstr] = true;

  })
  return sum;
}

for (let sampleData of [
toLinesArray(
`0123
1234
8765
9876`),
toLinesArray(
`...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`),
toLinesArray(
`..90..9
...1.98
...2..7
6543456
765.987
876....
987....`),
toLinesArray(
`10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`),
toLinesArray(
`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`)]) {
  console.log("part1(sampleData) = " + part1(sampleData));
}
console.log("part1 = " + part1(loadData()));

for (let sampleData of [
toLinesArray(
`..90..9
...1.98
...2..7
6543456
765.987
876....
987....`),
toLinesArray(
`012345
123456
234567
345678
4.6789
56789.`),
toLinesArray(
`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`)]) {
  console.log("part2(sampleData) = " + part2(sampleData));
}
console.log("part2 = " + part2(loadData()));
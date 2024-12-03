import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return toLinesArray(fileContents('data/02'))
}

function part1(d: string[]) {
  return d.filter((l) => isSafe(toIntsArray(l))).length
}

function isSafe(l: int[]) {
  const cmp = function(a, b: int) { return a > b ? 1 : (a < b ? -1 : 0); };
  const dir = cmp(l[0], l[1]);
  for (let i = 0; i < l.length - 1; i++) {
    if (cmp(l[i], l[i+1]) != dir) return false;
    let diff = Math.abs(l[i] - l[i+1]);
    if (diff > 3) return false;
  }
  return true;
}

function part2(d: string[]) {
  return d.map((l) => toIntsArray(l)).filter((l) => isSafeDampened(l)).length
}

function isSafeDampened(l: int[]) {
  if (isSafe(l)) return true;
  for (const i in l) {
    let l2 = l.slice();
    l2.splice(i, 1);
    if (isSafe(l2)) return true;
  }
  return false;
}

let sampleData = toLinesArray(
`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`);

console.log("part1(sampleData) = " + part1(sampleData));
console.log("part1 = " + part1(loadData()));
console.log("part2(sampleData) = " + part2(sampleData));
console.log("part2 = " + part2(loadData()));
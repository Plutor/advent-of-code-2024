import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return toLinesArray(fileContents('data/01'))
}

function part1(d: string[]) {
  let lefts = [], rights = [];
  // It'd be faster to sort while we build, but not necessary with this size of input.
  d.forEach((s) => {
    vals = toIntsArray(s)
    lefts.push(vals[0]);
    rights.push(vals[1]);
  });
  lefts.sort();
  rights.sort();
  let sum = 0;
  for (const i in lefts) {
    sum += Math.abs(lefts[i] - rights[i]);
  }
  return sum;
}

function part2(d: string[]) {
  let lefts = [], rightsMap = [];
  // It'd be faster to sort while we build, but not necessary with this size of input.
  d.forEach((s) => {
    vals = toIntsArray(s)
    lefts.push(vals[0]);
    if (vals[1] in rightsMap) {
      rightsMap[vals[1]]++;
    } else {
      rightsMap[vals[1]] = 1;
    }
  });
  let sum = 0;
  for (const l of lefts) {
    if (l in rightsMap) {
      sum += l * rightsMap[l];
    }
  }
  return sum;
}

let sampleData = toLinesArray(
`3   4
4   3
2   5
1   3
3   9
3   3`);

console.log("part1(sampleData) = " + part1(sampleData));
console.log("part1 = " + part1(loadData()));
console.log("part2(sampleData) = " + part2(sampleData));
console.log("part2 = " + part2(loadData()));
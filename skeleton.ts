import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return toLinesArray(fileContents('data/01'))
}

function part1(d: string[]) {
  return d.length;
}

function part2(d: string[]) {
  return d.length;
}

let sampleData = toLinesArray(
``);

console.log("part1(sampleData) = " + part1(sampleData));
console.log("part1 = " + part1(loadData()));
console.log("part2(sampleData) = " + part2(sampleData));
console.log("part2 = " + part2(loadData()));
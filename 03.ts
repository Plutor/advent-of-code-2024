import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return fileContents('data/03')
}

const mulRegex = /mul\((\d+),(\d+)\)/g;

function part1(d: string) {
  let sum = 0;
  let match;
  while ((match = mulRegex.exec(d)) !== null) {
    sum += (parseInt(match[1]) * parseInt(match[2]));
  }
  return sum;
}

function part2(d: string) {
  const disableRegex = /don't\(\).*?(do\(\)|$)/sg;
  const fixed = d.replace(disableRegex, "");
  return part1(fixed);
}

// let sampleData = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
let sampleData = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

console.log("part1(sampleData) = " + part1(sampleData));
console.log("part1 = " + part1(loadData()));
console.log("part2(sampleData) = " + part2(sampleData));
console.log("part2 = " + part2(loadData()));
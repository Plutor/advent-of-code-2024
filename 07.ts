import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return toLinesArray(fileContents('data/07'))
}

function part1(d: string[]) {
  let sum = 0;
  d.forEach((l) => { if (isValid(l)) sum += valueOf(l) });
  return sum;
}

function valueOf(l: string) {
  return parseInt(l.split(":")[0])
}

function isValid(l: string) {
  let operands = l.split(" ").map((s) => parseInt(s));
  let val = operands.shift();
  return isValidInts(val, operands);
}

function isValidInts(val: int, operands: int[]) {
  if (operands.length == 1) {
    return val == operands[0];
  }
  const a = operands.shift();
  const b = operands.shift();
  return isValidInts(val, [a+b].concat(operands)) || isValidInts(val, [a*b].concat(operands));
}

function part2(d: string[]) {
  let sum = 0;
  d.forEach((l) => { if (isValid2(l)) sum += valueOf(l) });
  return sum;
}

function isValid2(l: string) {
  let operands = l.split(" ").map((s) => parseInt(s));
  let val = operands.shift();
  return isValidInts2(val, operands);
}

function isValidInts2(val: int, operands: int[]) {
  if (operands.length == 1) {
    return val == operands[0];
  }
  const a = operands.shift();
  const b = operands.shift();
  return isValidInts2(val, [a+b].concat(operands)) ||
         isValidInts2(val, [a*b].concat(operands)) ||
         isValidInts2(val, [parseInt(""+a+b)].concat(operands));
}

let sampleData = toLinesArray(
`190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`);

console.log("part1(sampleData) = " + part1(sampleData));
console.log("part1 = " + part1(loadData()));
console.log("part2(sampleData) = " + part2(sampleData));
console.log("part2 = " + part2(loadData()));
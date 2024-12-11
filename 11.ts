import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return fileContents('data/11')
}

function part1(d: string, blinks: int) {
  let data = d.split(" ").map((v) => parseInt(v));
  for (let i = 0; i < blinks; i++) {
    console.log("Blink " + i + " = " + data.length);
    data = blink(data);
  }
  // console.log(data);
  return data.length;
}

function blink(d: int[]) {
  let after = []
  d.forEach((v) => {
    if (v == 0) {
      after.push(1);
    } else if (("" + v).length % 2 == 0) {
      const s = ("" + v)
      after.push(parseInt(s.slice(0, Math.floor(s.length/2))))
      after.push(parseInt(s.slice(Math.floor(s.length/2))))
    } else {
      after.push(v * 2024)
    }
  })
  return after
}

function part2(d: string[]) {
  return d.length;
}

let sampleData = `0 1 10 99 999`;

console.log("part1(sampleData) = " + part1(sampleData, 1));
console.log("part1 = " + part1(loadData(), 25));
// console.log("part2 = " + part1(loadData(), 75));
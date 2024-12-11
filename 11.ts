import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return fileContents('data/11')
}

function doBlinks(d: string, blinks: int) {
  let data = {};
  d.split(" ").forEach((v) => {
    if (v in data) data[v]++;
    else data[v] = 1;
  });
  for (let i = 0; i < blinks; i++) {
    data = blink(data);
    let count = 0;
    for (let c in data) count += parseInt(data[c]);
  }
  let count = 0;
  for (let c in data) count += parseInt(data[c]);
  return count;
}

function blink(d: Object) {
  let after = {}
  let addToAfter = function(v: int, count: int) {
    if (v in after) after[v] += count;
    else after[v] = count;
  }
  for (let s in d) {
    const count = d[s];
    const v = parseInt(s);
    let afterV;
    if (v == 0) {
      addToAfter(1, count);
    } else if (("" + v).length % 2 == 0) {
      addToAfter(parseInt(s.slice(0, Math.floor(s.length/2))), count);
      addToAfter(parseInt(s.slice(Math.floor(s.length/2))), count)
    } else {
      addToAfter(v * 2024, count)
    }
  }
  return after
}

let sampleData = `0 1 10 99 999`;

console.log("doBlinks(sampleData) = " + doBlinks(sampleData, 1));
console.log("doBlinks = " + doBlinks(loadData(), 25));
console.log("part2 = " + doBlinks(loadData(), 75));

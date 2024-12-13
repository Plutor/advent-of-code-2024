import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return toLinesArray(fileContents('data/13'))
}

function part1(d: string[]) {
  let sum = 0;
  let ax, ay, bx, by;
  d.forEach((l) => {
    if ((m = l.match(/Button A: X\+(\d+), Y\+(\d+)/)) != null) {
      ax = parseInt(m[1]);
      ay = parseInt(m[2]);
    } else if ((m = l.match(/Button B: X\+(\d+), Y\+(\d+)/)) != null) {
      bx = parseInt(m[1]);
      by = parseInt(m[2]);
    } else if ((m = l.match(/Prize: X=(\d+), Y=(\d+)/)) != null) {
      sum += findBest(ax, ay, bx, by, parseInt(m[1]), parseInt(m[2]));
    }
  });
  return sum;
}

function findBest(ax: int, ay: int, bx: int, by: int, x: int, y: int) {
  let best = 9999999;
  for (let a = 0; a <= 100; a++) {
    if ((x - (ax * a)) % bx != 0 || (y - (ay * a)) % by != 0) continue;
    const b = (x - (ax * a)) / bx;
    // console.log("a=" + a + ", b=" + b);
    // console.log("ax=" + ax + ", bx=" + bx);
    // console.log("ay=" + ay + ", by=" + by);
    // console.log("" + ((ay * a) + (by * b)) + " <=> " + y);
    if ((ay * a) + (by * b) != y) continue;
    const tokens = a * 3 + b;
    if (tokens < best) best = tokens;
    // console.log(tokens);
  }
  return best == 9999999 ? 0 : best;
}

function part2(d: string[]) {
  return d.length;
}

let sampleData = toLinesArray(
`Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`);

console.log("part1(sampleData) = " + part1(sampleData));
console.log("part1 = " + part1(loadData()));
// console.log("part2(sampleData) = " + part2(sampleData));
// console.log("part2 = " + part2(loadData()));
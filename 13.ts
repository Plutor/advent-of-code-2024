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
  const determinant = (ax * by) - (ay * bx);
  const a = Math.round((x * by / determinant) + (y * -bx / determinant));
  const b = Math.round((x * -ay / determinant) + (y * ax / determinant));
  if (a*ax + b*bx != x || a*ay + b*by != y) return 0;
  if (a < 0 || b < 0) return 0;
  return 3 * a + b;
}

function part2(d: string[]) {
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
      sum += findBest(ax, ay, bx, by, 10000000000000 + parseInt(m[1]), 10000000000000 + parseInt(m[2]));
    }
  });
  return sum;
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
console.log("part2(sampleData) = " + part2(sampleData));
console.log("part2 = " + part2(loadData()));
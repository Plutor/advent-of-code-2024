import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return toLinesArray(fileContents('data/14'))
}

function part1(d: string[], maxx: int, maxy: int) {
  let quadCount = [0, 0, 0, 0]
  let midx = Math.floor(maxx / 2);
  let midy = Math.floor(maxy / 2);
  // For each robot
  for (const l of d) {
    let m;
    if ((m = l.match(/p=(\d+),(\d+) v=([-\d]+),([-\d]+)/)) == null) {
      log.console("no info?")
      continue;
    }
    const x = parseInt(m[1]);
    const y = parseInt(m[2]);
    const vx = parseInt(m[3]);
    const vy = parseInt(m[4]);
    // console.log("" + x + " " + y + " " + vx + " " + vy);
    // Figure out where it'll be after 100 seconds
    let lastx = (x + 100 * vx) % maxx;
    if (lastx < 0) lastx += maxx;
    let lasty = (y + 100 * vy) % maxy;
    if (lasty < 0) lasty += maxy;
    // Figure out which quadrant that is
    if (lastx == midx || lasty == midy) continue; // middle row or middle column
    let q = ((lastx < midx) ? 0 : 1) + ((lasty < midy) ? 0 : 2);
    quadCount[q]++;
  }

  // Multiply the counts in each quadrant
  return quadCount[0] * quadCount[1] * quadCount[2] * quadCount[3];
}

function part2(d: string[], maxx: int, maxy: int) {
  // For each robot
  let robots = []
  for (const l of d) {
    let m;
    let rowCount = [];
    if ((m = l.match(/p=(\d+),(\d+) v=([-\d]+),([-\d]+)/)) == null) {
      log.console("no info?")
      continue;
    }
    const x = parseInt(m[1]);
    const y = parseInt(m[2]);
    const vx = parseInt(m[3]);
    const vy = parseInt(m[4]);
    robots.push([x,y,vx,vy]);
  }

  let maxrow = 0;
  for (let t = 0; t < 100000; t++) {
    let overlap = false;
    let grid = [];
    for (robot of robots) {
      // Figure out where it'll be on after t seconds
      let lastx = (robot[0] + t * robot[2]) % maxx;
      if (lastx < 0) lastx += maxx;
      let lasty = (robot[1] + t * robot[3]) % maxy;
      if (lasty < 0) lasty += maxy;
      if (!(lasty in grid)) { grid[lasty] = " ".repeat(maxy); }
      grid[lasty] = grid[lasty].slice(0, lastx) + "#" + grid[lasty].slice(lastx+1);
    }
    for (const l of grid) {
      if (l && l.match(/########/)) {
        console.log("" + t + ": " + l);
      }
    }
  }

  return 0;
}

let sampleData = toLinesArray(
`p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`);

console.log("part1(sampleData) = " + part1(sampleData, 11, 7));
console.log("part1 = " + part1(loadData(), 101, 103));
// console.log("part2(sampleData) = " + part2(sampleData, 11, 7));
console.log("part2 = " + part2(loadData(), 101, 103));
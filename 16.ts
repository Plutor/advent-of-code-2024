import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return toLinesArray(fileContents('data/16'))
}

type State = {
  x: Int,
  y: Int,
  dx: Int,
  dy: Int,
  score: Int,
  path: Object[],
}

function part1(d: string[]) {
  const [start, end] = parse(d);
  let visited = d.map((l) => new Array(l.length).fill(false));
  let stateQ = [start];

  while (true) {
    // Get the first (best) state
    let cur = stateQ.shift();
    // console.log(cur);
    // If it's the end, we're done
    if (cur.x == end.x && cur.y == end.y) return cur.score;
    // If it's been visited, skip
    if (visited[cur.y][cur.x]) continue;
    // For each direction
    //   If it's a wall, ignore
    //   Add it to the state (in order)
    // No turn:
    if (d[cur.y + cur.dy][cur.x + cur.dx] != "#")
      stateQ = addInOrder(stateQ, {x:cur.x + cur.dx, y:cur.y + cur.dy, dx:cur.dx, dy:cur.dy, score:cur.score + 1});
    // CW:
    const cw = {dx:-cur.dy, dy:cur.dx}
    if (d[cur.y + cw.dy][cur.x + cw.dx] != "#")
      stateQ = addInOrder(stateQ, {x:cur.x + cw.dx, y:cur.y + cw.dy, dx:cw.dx, dy:cw.dy, score:cur.score + 1001});
    // CCW:
    const ccw = {dx:cur.dy, dy:-cur.dx}
    if (d[cur.y + ccw.dy][cur.x + ccw.dx] != "#")
      stateQ = addInOrder(stateQ, {x:cur.x + ccw.dx, y:cur.y + ccw.dy, dx:ccw.dx, dy:ccw.dy, score:cur.score + 1001});
    // Mark as visited
    visited[cur.y][cur.x] = true;
  }
  // console.log(stateQ);
  return -1;
}

function parse(d: string[]) {
  let state: State;
  let end;
  for (let y = 0; y < d.length; y++) {
    for (let x = 0; x < d[y].length; x++) {
      if (d[y][x] == "S") {
        start = {x:x, y:y, dx:1, dy:0, score:0, path:[]};
      } else if (d[y][x] == "E") {
        end = {x:x, y:y};
      }
    }
  }
  return [start, end];
}

function addInOrder(a: Object[], i: Object) {
  const firstWithGreaterScore = a.findIndex((e) => e.score > i.score);
  if (firstWithGreaterScore == -1) return a.concat(i);
  return a.slice(0, firstWithGreaterScore).concat(i, a.slice(firstWithGreaterScore));
}

function part2(d: string[]) {
  const bestScore = part1(d);  // haha
  console.log(bestScore);
  const [start, end] = parse(d);
  let visited = d.map((l) => new Array(l.length).fill(false));
  let isOnBestPath = d.map((l) => new Array(l.length).fill(false));
  let stateQ = [start];

  while (true) {
    // Get the first (best) state
    let cur = stateQ.shift();
    cur.path.push({x:cur.x, y:cur.y});
    // console.log(cur);
    // If it's longer than the best score, we're done
    if (cur.score > bestScore) break;
    // If it's the end
    if (cur.x == end.x && cur.y == end.y) {
      if (bestScore == -1) bestScore = cur.score;
      // Mark all spots on the path.
      for (p of cur.path) {
        isOnBestPath[p.y][p.x] = true;
      }
      continue;
    }
    // For each direction
    //   If it's a wall, ignore
    //   Add it to the state (in order)
    // No turn:
    if (d[cur.y + cur.dy][cur.x + cur.dx] != "#" && cur.score + 1 <= bestScore)
      stateQ = addInOrder(stateQ, {x:cur.x + cur.dx, y:cur.y + cur.dy, dx:cur.dx, dy:cur.dy, score:cur.score + 1, path:cur.path.slice()});
    // CW:
    const cw = {dx:-cur.dy, dy:cur.dx}
    if (d[cur.y + cw.dy][cur.x + cw.dx] != "#" && cur.score + 1001 <= bestScore)
      stateQ = addInOrder(stateQ, {x:cur.x + cw.dx, y:cur.y + cw.dy, dx:cw.dx, dy:cw.dy, score:cur.score + 1001, path:cur.path.slice()});
    // CCW:
    const ccw = {dx:cur.dy, dy:-cur.dx}
    if (d[cur.y + ccw.dy][cur.x + ccw.dx] != "#" && cur.score + 1001 <= bestScore)
      stateQ = addInOrder(stateQ, {x:cur.x + ccw.dx, y:cur.y + ccw.dy, dx:ccw.dx, dy:ccw.dy, score:cur.score + 1001, path:cur.path.slice()});
    // Mark as visited
    visited[cur.y][cur.x] = true;
  }

  // Count all isOnBestPaths
  let sum = 0;
  for (let y = 0; y < isOnBestPath.length; y++) {
    for (let x = 0; x < isOnBestPath[y].length; x++) {
      if (isOnBestPath[y][x]) sum++;
    }
  }
  return sum;
}

let sampleData = toLinesArray(
`###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`);

// console.log("part1(sampleData) = " + part1(sampleData));
// console.log("part1 = " + part1(loadData()));
console.log("part2(sampleData) = " + part2(sampleData));
console.log("part2 = " + part2(loadData()));
import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return toLinesArray(fileContents('data/08'))
}

function part1(d: string[]) {
  const yMax = d.length;
  const xMax = d[0].length;
  // Build a map of {freq: [(x,y), ...]}
  const nodeMap = buildNodeMap(d);
  let antiNodeMap = new Map();
  for (let nodes of nodeMap.values()) {
    // For each freq, build a list of antinodes
    const antiNodes = findAntiNodes(nodes, xMax, yMax, 1);
    // and build a new map of {(x,y): has_antinode}
    for (let coords of antiNodes) {
      const coordsStr = ""+coords.x+","+coords.y;
      antiNodeMap.set(coordsStr, true);
    }
  }
  return antiNodeMap.size;
}

function buildNodeMap(d: string[]) {
  let nodeMap = new Map();
  for (let y = 0; y < d.length; ++y) {
    for (let x = 0; x < d[y].length; ++x) {
      const ch = d[y][x];
      if (ch == ".") continue;
      if (!nodeMap.has(ch)) {
        nodeMap.set(ch, []);
      }
      nodeMap.get(ch).push({x: x, y: y});
    }
  }
  return nodeMap;
}

function findAntiNodes(nodes: Object[], xMax: int, yMax: int, num: int) {
  let antiNodes = [];
  for (let a of nodes) {
    for (let b of nodes) {
      if (a.x == b.x && a.y == b.y) continue;
      const diff = {x: b.x - a.x, y: b.y - a.y};
      for (let i = 0; i < num; i++) {
        b = {x: b.x + diff.x, y: b.y + diff.y};
        if (b.x < 0 || b.x >= xMax || b.y < 0 || b.y >= yMax) break;
        antiNodes.push(b);
      }
    }
  }
  return antiNodes;
}

function part2(d: string[]) {
  const yMax = d.length;
  const xMax = d[0].length;
  // Build a map of {freq: [(x,y), ...]}
  const nodeMap = buildNodeMap(d);
  let antiNodeMap = new Map();
  for (let nodes of nodeMap.values()) {
    // For each freq, build a list of antinodes
    const antiNodes = findAntiNodes(nodes, xMax, yMax, d.length);
    // and build a new map of {(x,y): has_antinode}
    for (let coords of antiNodes) {
      const coordsStr = ""+coords.x+","+coords.y;
      antiNodeMap.set(coordsStr, true);
    }
    // include the original nodes, too
    for (let coords of nodes) {
      const coordsStr = ""+coords.x+","+coords.y;
      antiNodeMap.set(coordsStr, true);
    }
  }
  return antiNodeMap.size;
}

let sampleData = toLinesArray(
`............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`);

console.log("part1(sampleData) = " + part1(sampleData));
console.log("part1 = " + part1(loadData()));
console.log("part2(sampleData) = " + part2(sampleData));
console.log("part2 = " + part2(loadData()));
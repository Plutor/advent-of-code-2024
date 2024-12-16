import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return toLinesArray(fileContents('data/15'))
}

const instToDirection = {
  "v": {x:0,y:1},
  "^": {x:0,y:-1},
  ">": {x:1,y:0},
  "<": {x:-1,y:0},
}

function part1(d: string[]) {
  let [grid, instructions, robot] = parseInput(d);

  instructions.split("").forEach((inst) => {
    const dir = instToDirection[inst];
    if (move(grid, robot, dir)) {
      robot = {x: robot.x + dir.x, y: robot.y + dir.y};
    }
  });

  return score(grid);
}

// Parse out the grid, instructions, and robot location.
function parseInput(d: string[]) {
  let robot = {x:0, y:0};
  let grid = [];
  let instructions = "";
  d.forEach((l) => {
    if (l.indexOf("#") == -1) {
      instructions = instructions + l;
    } else {
      let x;
      if ((x = l.indexOf("@")) != -1) {
        robot = {x: x, y: grid.length};
      }
      grid.push(l.replace("@", "."));
    }
  });
  return [grid, instructions, robot];
}

// Returns true if the move was successful, modifies grid in-place. Recurses to potentially move multiple boxes.
function move(grid: string[], src: Object, dir: Object) {
  const dst = {x: src.x + dir.x, y: src.y + dir.y};
  // Out of bounds
  if (dst.y < 0 || dst.y >= grid.length || dst.x < 0 || dst.x >= grid[dst.y].length) return false;
  // Walls
  if (grid[dst.y][dst.x] == "#") return false;
  // If it's a box, try to push it too
  if (grid[dst.y][dst.x] == "O" && !move(grid, dst, dir)) return false;
  // Move what's in src into dst
  grid[dst.y] = grid[dst.y].slice(0, dst.x) + grid[src.y][src.x] + grid[dst.y].slice(dst.x + 1);
  // Mark src empty
  grid[src.y] = grid[src.y].slice(0, src.x) + "." + grid[src.y].slice(src.x + 1);
  return true;
}

function score(grid: string[]) {
  let sum = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] != "O") continue;
      sum += (100 * y) + x;
    }
  }
  return sum;
}

function part2(d: string[]) {
  return d.length;
}

for (let sampleData of [toLinesArray(
`########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`),
toLinesArray(`##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`)]) {
  console.log("part1(sampleData) = " + part1(sampleData));
}
// console.log("part1 = " + part1(loadData()));
// console.log("part2(sampleData) = " + part2(sampleData));
// console.log("part2 = " + part2(loadData()));
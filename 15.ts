import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return toLinesArray(fileContents('data/15'))
}

function part1(d: string[]) {
  let robot = {x:0, y:0};
  let grid = [];
  let instructions = "";
  // Parse out the grid, instructions, and robot location.
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

  const instToDirection = {
    "v": {x:0,y:1},
    "^": {x:0,y:-1},
    ">": {x:1,y:0},
    "<": {x:-1,y:0},
  }
  instructions.split("").forEach((inst) => {
    const dir = instToDirection[inst];
    const newRobot = {x: robot.x + dir.x, y: robot.y + dir.y};
    let nextNonBox;
    for (nextNonBox = newRobot;
         nextNonBox.y > 0 && nextNonBox.y < grid.length &&
           nextNonBox.x > 0 && nextNonBox.x < grid[nextNonBox.y].length &&
           grid[nextNonBox.y][nextNonBox.x] == "O";
         nextNonBox = {x: nextNonBox.x + dir.x, y: nextNonBox.y + dir.y}) {}
    if (grid[nextNonBox.y][nextNonBox.x] == "#") return;  // Do nothing if it's a wall.

    // Move the robot in the direction.
    robot = newRobot;
    // Move what's in the new robot space to the nextNonBox space (empty if we're here).
    grid[nextNonBox.y] = grid[nextNonBox.y].slice(0, nextNonBox.x) + grid[robot.y][robot.x] + grid[nextNonBox.y].slice(nextNonBox.x + 1);
    // Mark the new robot space empty.
    grid[robot.y] = grid[robot.y].slice(0, robot.x) + "." + grid[robot.y].slice(robot.x + 1);
  });

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
console.log("part1 = " + part1(loadData()));
// console.log("part2(sampleData) = " + part2(sampleData));
// console.log("part2 = " + part2(loadData()));
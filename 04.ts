import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return toLinesArray(fileContents('data/04'))
}

function part1(d: string[]) {
  let sum = XmasCountE(d) + XmasCountSE(d);
  for (i = 0; i <= 2; i++) {
    d = rotateCCW(d);
    sum += XmasCountE(d) + XmasCountSE(d);
  }
  return sum
}

function XmasCountE(d: string[]) {
  let sum = 0;
  d.forEach((l) => {
    const c = l.match(/XMAS/g)?.length;
    if (c !== undefined) sum += c;
  });
  return sum;
}

function XmasCountSE(d: string[]) {
  const height = d.length;
  const width = d[0].length;
  let diags = [];
  // Diagonals starting from (0,0) to (0,width-4)
  for (let x = 0; x <= width-4; x++) {
    let diagLine = "";
    for (let i = 0; x+i < width && i < height; i++) {
      diagLine += d[i][x+i];
    }
    diags.push(diagLine);
  }
  // Diagonals starting from (1,0) to (height-4,0)
  for (let y = 1; y <= height-4; y++) {
    let diagLine = "";
    for (let i = 0; i < width && y+i < height; i++) {
      diagLine += d[y+i][i];
    }
    diags.push(diagLine);
  }
  return XmasCountE(diags);
}

function rotateCCW(d: string[]) {
  let r = [];
  d.forEach((row) => {
    for (let x = 0; x < row.length; x++) {
      let newy = d.length - x - 1;
      if (r[newy] === undefined) r[newy] = row[x];
      else r[newy] += row[x];
    }
  });
  return r
}

function part2(d: string[]) {
  const getChar = function(x,y: Int) {
    if (y < 0 || y >= d.length ||
        x < 0 || x >= d[y].length) return ' ';
    return d[y][x];
  }
  let count = 0;
  for (let y = 0; y < d.length; y++) {
    for (let x = 0; x < d[y].length; x++) {
      if (getChar(x,y) != 'A') continue;
      let corners = getChar(x-1,y-1) + getChar(x+1,y-1) + getChar(x+1,y+1) + getChar(x-1,y+1);
      if (corners == 'MSSM' || corners == 'SMMS' || corners == 'SSMM' || corners == 'MMSS') count++;
    }
  }
  return count;
}

let sampleData = toLinesArray(
`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`);

console.log("part1(sampleData) = " + part1(sampleData));
console.log("part1 = " + part1(loadData()));
console.log("part2(sampleData) = " + part2(sampleData));
console.log("part2 = " + part2(loadData()));
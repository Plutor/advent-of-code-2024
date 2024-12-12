import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return toLinesArray(fileContents('data/12'))
}

function part1(d: string[]) {
  let regionGrid = []; // From coordinate to region index
  let regions = []; // From region index to list of fences per plot
  // look at each plot
  for (let y = 0; y < d.length; y++) {
    let regionGridRow = [];
    for (let x = 0; x < d[y].length; x++) {
      const c = d[y][x];
      // count the non-matching (or border) plots on all four edges, each will need a fence
      let fences = 0;
      const sameAsTop = (y > 0 && d[y-1][x] == c);
      const sameAsLeft = (x > 0 && d[y][x-1] == c);
      if (!sameAsTop)                           fences++;
      if (y == d.length - 1 || d[y+1][x] != c)  fences++;
      if (!sameAsLeft)                          fences++;
      if (x == d[y].length-1 || d[y][x+1] != c) fences++;
      // console.log("(" + x + "," + y + ") fences = " + fences +
      //             ", sameAsTop = " + sameAsTop +
      //             ", sameAsLeft = " + sameAsLeft);
      // if it matches the plot to its left or top, find that one in the list of regions and add this plot to that region
      let regionId;
      if (sameAsTop || sameAsLeft) {
        if (sameAsTop && sameAsLeft) {
          // console.log(regionGridRow);
          regionId = regionGridRow[regionGridRow.length - 1]; // left
          // if it matches both left and top and they're in different regions, merge them first
          const topRegionId = regionGrid[y-1][x];
          if (regionId != topRegionId) {
            // console.log("Merging regions " + regionId + " and " + topRegionId);
            // Left region should be a combined list of plots
            regions[regionId] = regions[regionId].concat(regions[topRegionId]);
            // Top region should be an empty list
            regions[topRegionId] = [];
            // Change the id for all plots in the top region
            for (let ty = 0; ty < regionGrid.length; ty++) {
              for (let tx = 0; tx < regionGrid[ty].length; tx++) {
                if (regionGrid[ty][tx] == topRegionId) regionGrid[ty][tx] = regionId;
              }
            }
            for (let tx = 0; tx < regionGridRow.length; tx++) {
              if (regionGridRow[tx] == topRegionId) regionGridRow[tx] = regionId;
            }
          }
        } else if (sameAsTop) {
          regionId = regionGrid[y-1][x];
        } else {  // sameAsLeft
          regionId = regionGridRow[regionGridRow.length - 1];
        }
        // console.log("Adding to region " + regionId);
      } else {
        regionId = regions.length;
        regions.push([]);
        // console.log("Creating new region " + regionId);
      }
      regionGridRow.push(regionId);
      regions[regionId].push(fences);
    }
    regionGrid.push(regionGridRow);
  }
  // console.log(regionGrid);
  // console.log(regions);

  let sum = 0;
  let totalArea = 0;
  // for each region
  for (i in regions) {
    const r = regions[i];
    // add (number of plots * sum of fences) to the sum 
    let fences = 0;
    r.forEach((f) => fences += f);
    sum += (r.length * fences);
  }
  return sum;
}

function part2(d: string[]) {
  return d.length;
}

for (let sampleData of [
toLinesArray(
`AAAA
BBCD
BBCC
EEEC`),
toLinesArray(
`OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`),
toLinesArray(
`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`)
]) {
  console.log("part1(sampleData) = " + part1(sampleData));
}
console.log("part1 = " + part1(loadData())); // 1346380 is too low

// console.log("part2(sampleData) = " + part2(sampleData));
// console.log("part2 = " + part2(loadData()));
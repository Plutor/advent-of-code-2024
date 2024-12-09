import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return fileContents('data/09');
}

function part1(d: string) {
  let data = [...d].map((c) => parseInt(c));
  let lastFileIdx = d.length - 1;
  let sum = 0;
  let isFile = true;
  let blockIdx = 0;
  for (let mapIdx = 0; mapIdx <= lastFileIdx; ++mapIdx) {
    for (let mapOffset = 0; mapOffset < data[mapIdx]; mapOffset++) {
      if (isFile) {
        // Add to sum
        const fileId = Math.floor(mapIdx / 2);
        sum += (blockIdx * fileId);
      } else {
        // Subtract one from the size of the last file in the map
        data[lastFileIdx]--;
        // Add _that_ file ID to the sum
        const fileId = Math.floor(lastFileIdx / 2);
        sum += (blockIdx * fileId);
        // If that file size is now zero, move to the previous file
        if (data[lastFileIdx] == 0) {
          lastFileIdx -= 2;
        }
      }
      blockIdx++;
    }
    isFile = !isFile
  }
  return sum;
}

function part2(d: string) {
  let sum = 0;
  let data = [...d].map((c) => parseInt(c)).concat(0);
  let fileStartBlock = 0;
  data.forEach((v) => fileStartBlock += v);
  let fileIds = Array.from(data.keys()).map((v) => Math.floor(v/2));
  // For each file starting from the right
  for (let fileMapIdx = data.length - 1; fileMapIdx >= 0; fileMapIdx--) {
    const isFile = fileMapIdx % 2 == 0;
    const fileSize = data[fileMapIdx];
    fileStartBlock -= fileSize;
    if (!isFile || fileSize == 0) continue;
    const fileId = fileIds[fileMapIdx];
    // Find the first free space that will fit it
    let gapStartBlock = 0;
    let fileMoved = false;
    for (let gapMapIdx = 0; gapMapIdx < fileMapIdx; gapMapIdx++) {
      const isGap = gapMapIdx % 2 == 1;
      if (!isGap || data[gapMapIdx] < data[fileMapIdx]) {
        gapStartBlock += data[gapMapIdx];
        continue;
      }
      // If the file fits in the gap:
      // replace the file with 0 and add its size to the previous gap
      data[fileMapIdx] = 0;
      data[fileMapIdx+1] += fileSize;
      // replace the gap with [0, filesize, gapsize-filesize]
      const gapSize = data[gapMapIdx];
      data = data.slice(0, gapMapIdx).concat(0, fileSize, gapSize-fileSize, data.slice(gapMapIdx+1));
      fileIds = fileIds.slice(0, gapMapIdx).concat(0, fileId, 0, fileIds.slice(gapMapIdx+1));
      // bump file index by 2 to account for the larger map
      fileMapIdx += 2;
      fileMoved = true;
      break;
    }
    if (!fileMoved) {
      // Add to sum
      for (let i = 0; i < fileSize; ++i) {
        sum += (fileId * (fileStartBlock+i));
      }
    }
  }
  return sum;
}

let sampleData = `2333133121414131402`;

console.log("part1(sampleData) = " + part1(sampleData));
console.log("part1 = " + part1(loadData()));
console.log("part2(sampleData) = " + part2(sampleData));
console.log("part2 = " + part2(loadData()));
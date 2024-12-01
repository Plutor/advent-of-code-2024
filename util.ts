import * as fs from 'fs';

export { fileContents, toLinesArray, toIntsArray };

function fileContents(f: string) {
  return fs.readFileSync(f).toString();
}

function toLinesArray(s: string) {
  let lines = s.split(/[\n\r]+/);
  if (lines[lines.length - 1] == '') {
    lines.pop();
  }
  return lines
}

function toIntsArray(s: string) {
  return s.split(/ +/)
          .filter((v) => s.length > 0)
          .map((v) => parseInt(v));
}

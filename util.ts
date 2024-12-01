import * as fs from 'fs';

export { fileContents, byLine };

function fileContents(f: string) {
  return fs.readFileSync(f).toString();
}

function byLine(s: string) {
  let lines = s.split(/[\n\r]+/);
  if (lines[lines.length - 1] == '') {
    lines.pop();
  }
  return lines
}

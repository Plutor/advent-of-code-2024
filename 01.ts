import { byLine, fileContents } from './util.ts'

function loadData() {
  return byLine(fileContents('data/01'))
}

console.log(loadData());
import { toLinesArray, toIntsArray, fileContents } from './util.ts'

function loadData() {
  return toLinesArray(fileContents('data/05'))
}

function part1(d: string[]) {
  let sum = 0;
  let lineNums = [];
  let rules = [];
  for (const line of d) {
    if (lineNums = isRule(line)) {
      rules.push(lineNums);
    } else if (lineNums = isUpdate(line)) {
      if (isValidUpdate(rules, lineNums)) {
        sum += middlePage(lineNums)
      }
    }
  }
  return sum;
}

// Returns undefined if this isn't a rule line.
function isRule(line: string) {
  let nums = line.split("|");
  if (nums.length == 2) {
    return nums.map((x) => parseInt(x));
  }
  return undefined;
}

function isUpdate(line: string) {
  let nums = line.split(",");
  if (nums.length > 1) {
    return nums.map((x) => parseInt(x));
  }
  return undefined;
}

function isValidUpdate(rules: int[][], pages: int[]) {
  for (const rule of rules) {
    const idx0 = pages.indexOf(rule[0]);
    const idx1 = pages.indexOf(rule[1]);
    if (idx0 != -1 && idx1 != -1 && idx0 > idx1) {
      return false;
    }
  }
  return true;
}

function middlePage(pages: int[]) {
  return pages[Math.floor(pages.length / 2)];
}

function part2(d: string[]) {
  let sum = 0;
  let lineNums = [];
  let rules = [];
  for (const line of d) {
    if (lineNums = isRule(line)) {
      rules.push(lineNums);
    } else if (lineNums = isUpdate(line)) {
      if (!isValidUpdate(rules, lineNums)) {
        let fixed = fixUpdate(rules, lineNums)
        sum += middlePage(fixed)
      }
    }
  }
  return sum;
}

function fixUpdate(rules: int[][], pages: int[]) {
  let fixed = false;
  while (!fixed) {
    fixed = true;
    for (const rule of rules) {
      const idx0 = pages.indexOf(rule[0]);
      const idx1 = pages.indexOf(rule[1]);
      if (idx0 != -1 && idx1 != -1 && idx0 > idx1) {
        // Swap the two pages so they're in the right order and recheck against the rules.
        pages = pages.slice(0, idx1).concat(
                  rule[0],
                  pages.slice(idx1 + 1, idx0),
                  rule[1],
                  pages.slice(idx0 + 1))
        fixed = false;
        break;
      }
    }
  }
  return pages;
}

let sampleData = toLinesArray(
`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`);

console.log("part1(sampleData) = " + part1(sampleData));
console.log("part1 = " + part1(loadData()));
console.log("part2(sampleData) = " + part2(sampleData));
console.log("part2 = " + part2(loadData()));
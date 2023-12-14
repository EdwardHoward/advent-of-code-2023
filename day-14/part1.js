const fs = require('node:fs')

const test = false
const input = fs.readFileSync(test ? './day-14/test.txt' : './day-14/input.txt').toString()

const lines = input.split('\n').map(line => line.split(''))

let hasMoved = true

while (hasMoved) {
  hasMoved = false
  for (var y = 0; y < lines.length - 1; y++) {
    for (var x = 0; x < lines[y].length; x++) {
      const val = lines[y][x]
      if (val === '.') {
        if (lines[y + 1][x] === 'O') {
          lines[y][x] = 'O'
          lines[y + 1][x] = '.'

          hasMoved = true
        }
      }
    }
  }
}

const sum = lines.reduce((acc, line, i) => {
  const score = lines.length - Number(i)
  return acc + line.filter(a => a === 'O').length * score
}, 0)

console.log(sum)

debugger
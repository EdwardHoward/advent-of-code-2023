const fs = require('node:fs')

const test = false
const input = fs.readFileSync(test ? './day-14/test.txt' : './day-14/input.txt').toString()

const lines = input.split('\n').map(line => line.split(''))

function rollNorth(lines) {
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

  return lines
}

function rollSouth(lines) {
  let hasMoved = true

  while (hasMoved) {
    hasMoved = false
    for (var y = lines.length - 1; y > 0; y--) {
      for (var x = 0; x < lines[y].length; x++) {
        const val = lines[y][x]
        if (val === '.') {
          if (lines[y - 1][x] === 'O') {
            lines[y][x] = 'O'
            lines[y - 1][x] = '.'

            hasMoved = true
          }
        }
      }
    }
  }

  return lines
}

function rollEast(lines) {
  let hasMoved = true

  while (hasMoved) {
    hasMoved = false
    for (var x = lines[0].length - 1; x > 0; x--) {
      for (var y = 0; y < lines.length; y++) {
        const val = lines[y][x]
        if (val === '.') {
          if (lines[y][x - 1] === 'O') {
            lines[y][x] = 'O'
            lines[y][x - 1] = '.'

            hasMoved = true
          }
        }
      }
    }
  }

  return lines
}

function rollWest(lines) {
  let hasMoved = true

  while (hasMoved) {
    hasMoved = false
    for (var x = 0; x < lines[0].length; x++) {
      for (var y = 0; y < lines.length; y++) {
        const val = lines[y][x]
        if (val === '.') {
          if (lines[y][x + 1] === 'O') {
            lines[y][x] = 'O'
            lines[y][x + 1] = '.'

            hasMoved = true
          }
        }
      }
    }
  }

  return lines
}

const m = {}

for (var i = 0; i < 150; i++) {
  rollNorth(lines)
  rollWest(lines)
  rollSouth(lines)
  rollEast(lines)

  const sum = lines.reduce((acc, line, i) => {
    const score = lines.length - Number(i)
    return acc + line.filter(a => a === 'O').length * score
  }, 0)

  const f = JSON.stringify(lines)
  if (!m[f]) m[f] = { sum, indexes: [] }

  m[f].indexes.push(i)
}

// I used this to figure out the index that the billionth cycle would end up on 
// Object.entries(m).forEach(([key, value], i) => {
//   console.log(i - 121, value.sum, value.indexes)
// })

console.log(Object.values(m)[((999999999 - 121) % 26) + 121].sum)

debugger

const fs = require('node:fs')

const test = false
const input = fs.readFileSync(test ? './day-11/test.txt' : './day-11/input.txt').toString()

const lines = input.split('\n').map(line => line.split(''))

const expandedY = JSON.parse(JSON.stringify(lines))
let expandedYTimes = 0
for (var y = 0; y < lines.length; y++) {
  const line = lines[y]

  if (line.filter(c => c !== '.').length === 0) {
    expandedY.splice(y + expandedYTimes, 0, line)

    expandedYTimes++
  }
}

const expandedX = JSON.parse(JSON.stringify(expandedY))

let timesExpanded = 0
for (var x = 0; x < expandedY[0].length; x++) {
  let count = 0
  for (var y = 0; y < expandedY.length; y++) {
    if (expandedY[y][x] !== '.') {
      count++
    }
  }

  if (count === 0) {
    for (var y = 0; y < expandedY.length; y++) {
      expandedX[y].splice(x + timesExpanded, 0, '.')
    }
    timesExpanded++
  }
}

const galaxies = []

for (var y = 0; y < expandedX.length; y++) {
  for (var x = 0; x < expandedX[0].length; x++) {
    const char = expandedX[y][x]

    if (char === '#') {
      galaxies.push({ x, y })
    }
  }
}

let sum = 0

for (var a = 0; a < galaxies.length; a++) {
  const galaxyA = galaxies[a]

  for (var b = a + 1; b < galaxies.length; b++) {
    const galaxyB = galaxies[b]

    const manhattan = Math.abs(galaxyA.x - galaxyB.x) + Math.abs(galaxyA.y - galaxyB.y)
    sum += manhattan
  }
}

console.log(sum)
debugger

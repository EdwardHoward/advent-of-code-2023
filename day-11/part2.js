const fs = require('node:fs')

const test = false
const input = fs.readFileSync(test ? './day-11/test.txt' : './day-11/input.txt').toString()

const lines = input.split('\n').map(line => line.split(''))

const expandedYLines = []

for (var y = 0; y < lines.length; y++) {
  const line = lines[y]

  if (line.filter(c => c !== '.').length === 0) {
    expandedYLines.push(y)
  }
}

const expandedXLines = []

for (var x = 0; x < lines[0].length; x++) {
  let count = 0
  for (var y = 0; y < lines.length; y++) {
    if (lines[y][x] !== '.') {
      count++
    }
  }

  if (count === 0) {
    expandedXLines.push(x)
  }
}

const galaxies = []

for (var y = 0; y < lines.length; y++) {
  for (var x = 0; x < lines[0].length; x++) {
    const char = lines[y][x]

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

    const minY = Math.min(galaxyA.y, galaxyB.y)
    const maxY = Math.max(galaxyA.y, galaxyB.y)

    let yMultiplier = 0
    expandedYLines.forEach(y => {
      if (y >= minY && y <= maxY) yMultiplier += 999999
    })

    const minX = Math.min(galaxyA.x, galaxyB.x)
    const maxX = Math.max(galaxyA.x, galaxyB.x)

    let xMultiplier = 0
    expandedXLines.forEach(x => {
      if (x >= minX && x <= maxX) xMultiplier += 999999
    })

    const manhattan = Math.abs(minX - (maxX + xMultiplier)) + Math.abs(minY - (maxY + yMultiplier))

    sum += manhattan
  }
}

console.log(sum)
debugger
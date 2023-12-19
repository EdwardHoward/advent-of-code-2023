const fs = require('node:fs')

const test = false
const input = fs.readFileSync(test ? './day-18/test.txt' : './day-18/input.txt').toString()

const lines = input.split('\n').map(line => {
  const [dir, count, color] = line.split(' ')

  return { dir, count, color: color.replace('(', '').replace(')', '') }
})

const grid = [{ x: 0, y: 0 }]
let x = 0
let y = 0

for (let i = 0; i < lines.length; i++) {
  const { dir, count } = lines[i]

  for (var j = 0; j < count; j++) {
    if (dir === 'U') {
      y--
    }

    if (dir === 'D') {
      y++
    }

    if (dir === 'R') {
      x++
    }

    if (dir === 'L') {
      x--
    }

    grid.push({ x, y })
  }
}


const startX = Math.min(...grid.map(tile => tile.x))
const startY = Math.min(...grid.map(tile => tile.y))

const width = Math.max(...grid.map(tile => tile.x)) + 1
const height = Math.max(...grid.map(tile => tile.y)) + 1
const map = []

grid.forEach((tile) => {
  if (!map[tile.y]) map[tile.y] = []
  map[tile.y][tile.x] = 1
})

let count = 0

for (var yy = startY; yy < height; yy++) {
  for (var xx = startX; xx < width; xx++) {
    if (!map[yy]?.[xx]) {
      if (isInside(grid, xx, yy)) {
        count++
      }
    }
  }
}

function isInside(grid, x, y) {
  let count = 0
  for (let i = 0; i < grid.length; i++) {
    const { x: x1, y: y1 } = grid[i]

    let j = (i + 1) % grid.length

    const { x: x2, y: y2 } = grid[j]

    if (
      (y < y1 !== y < y2) &&
      x < x1 + ((y - y1) / (y2 - y1)) * (x2 - x1)
    ) {
      count++
    }
  }

  return count % 2 === 1
}

console.log(count + grid.length - 1)

debugger
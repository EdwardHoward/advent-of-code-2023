const fs = require('node:fs')

const test = false
const input = fs.readFileSync(test ? './day-10/test.txt' : './day-10/input.txt').toString()

const lines = input.split('\n')

function getTile(map, x, y) {
  try {
    if (x >= 0 && y >= 0 && x < map[0].length && y < map.length && map[y][x]) {
      return { value: map[y][x], x, y }
    }
  } catch {
    debugger
  }
}

function getHeight(map) {
  return map.length
}

function getWidth(map) {
  return map[0].length
}

function getStartNeighbors(map, x, y) {
  let neighbors = []
  const up = getTile(map, x, y - 1)
  const right = getTile(map, x + 1, y)
  const down = getTile(map, x, y + 1)
  const left = getTile(map, x - 1, y)

  if (up && (up.value === 'F' || up.value === '|' || up.value === '7')) {
    neighbors.push(up)
  }

  if (right && (right.value === '-' || right.value === 'J' || right.value === '7')) {
    neighbors.push(right)
  }

  if (down && (down.value === '|' || down.value === 'L' || down.value === 'J')) {
    neighbors.push(down)
  }

  if (left && (left.value === '-' || left.value === 'L' || left.value === 'F')) {
    neighbors.push(left)
  }

  return neighbors
}

const height = getHeight(lines)
const width = getWidth(lines)

const queue = []

for (var y = 0; y < height; y++) {
  for (var x = 0; x < width; x++) {
    const tile = getTile(lines, x, y)

    if (tile.value === 'S') {
      queue.push({ ...tile, distance: 0 })
    }
  }
}

const seen = new Set()

while (queue.length !== 0) {
  const tile = queue.pop()

  if (seen.has(tile.x + ',' + tile.y)) {
    if (tile.value === 'S') {
      break
    }
    continue
  }

  if (tile.value === '.') debugger

  seen.add(tile.x + ',' + tile.y)

  let neighbors = []

  if (tile.value === 'S') {
    neighbors = getStartNeighbors(lines, tile.x, tile.y)
  }

  if (tile.value === '|') {
    neighbors = [
      getTile(lines, tile.x, tile.y - 1),
      getTile(lines, tile.x, tile.y + 1)
    ]
  }

  if (tile.value === '-') {
    neighbors = [
      getTile(lines, tile.x - 1, tile.y),
      getTile(lines, tile.x + 1, tile.y)
    ]
  }

  if (tile.value === 'L') {
    neighbors = [
      getTile(lines, tile.x, tile.y - 1),
      getTile(lines, tile.x + 1, tile.y)
    ]
  }

  if (tile.value === 'J') {
    neighbors = [
      getTile(lines, tile.x, tile.y - 1),
      getTile(lines, tile.x - 1, tile.y)
    ]
  }

  if (tile.value === '7') {
    neighbors = [
      getTile(lines, tile.x - 1, tile.y),
      getTile(lines, tile.x, tile.y + 1)
    ]
  }

  if (tile.value === 'F') {
    neighbors = [
      getTile(lines, tile.x + 1, tile.y),
      getTile(lines, tile.x, tile.y + 1)
    ]
  }

  neighbors.forEach(neighbor => {
    if (neighbor.value !== '.') {
      queue.push({ ...neighbor, distance: tile.distance + 1 })
    }
  })
}

const seenArr = Array.from(seen).map(tile => tile.split(',').map(Number))

const isInside = (x, y) => {
  let count = 0
  for (let i = 0; i < seenArr.length; i++) {
    const [x1, y1] = seenArr[i]

    let j = (i + 1) % seenArr.length

    const [x2, y2] = seenArr[j]

    if (
      (y < y1 !== y < y2) &&
      x < x1 + ((y - y1) / (y2 - y1)) * (x2 - x1)
    ) {
      count++
    }
  }

  return count % 2 === 1
}

const insideCount = lines.reduce((acc, row, y) => {
  const split = row.split('')

  for (let x = 0; x < split.length; x++) {
    if (seen.has(x + ',' + y)) continue

    if (isInside(x, y)) {
      acc++
    }
  }

  return acc
}, 0)

console.log(insideCount)

const fs = require('node:fs')

const test = false
const input = fs.readFileSync(test ? './day-18/test.txt' : './day-18/input.txt').toString()

const nums = ['R', 'D', 'L', 'U']
const lines = input.split('\n').map(line => {
  const [, , color] = line.split(' ')

  const col = color.replace('(', '').replace(')', '')
  const count = parseInt(col.split('#')[1].substring(0, 5), 16)
  const dirNum = Number(col.split('#')[1].at(-1))

  return { dir: nums[dirNum], count, color: color.replace('(', '').replace(')', '') }
})

const grid = []
let x = 0
let y = 0

let total = 0

for (let i = 0; i < lines.length; i++) {
  const { dir, count } = lines[i]

  let startX = Number(x)
  let startY = Number(y)

  if (dir === 'U') {
    y -= count
  }

  if (dir === 'D') {
    y += count
  }

  if (dir === 'R') {
    x += count
  }

  if (dir === 'L') {
    x -= count
  }

  grid.push({ x1: startX, y1: startY, x2: x, y2: y })
}

let perimeter = 0

let area = 0
for (var i = 0; i < grid.length; i++) {
  const current = grid[i]

  area += (current.x1 * current.y2 - current.x2 * current.y1)

  perimeter += Math.sqrt(Math.pow(current.x2 - current.x1, 2) + Math.pow(current.y2 - current.y1, 2))
}

area = area / 2
perimeter = perimeter / 2
console.log(area + perimeter + 1)

debugger
const fs = require('node:fs')
const input = fs.readFileSync('./day-2/input.txt').toString()

const sum = input.split(/\n/).reduce((agg, line) => {
  const split = line.split(':')
  const cubes = split[1].split(';').flatMap(g => g.trim().split(',').map(f => f.trim()))

  const max = {}

  cubes.forEach(cube => {
    const [count, color] = cube.split(' ')

    if (!max[color] || Number(count) > max[color]) max[color] = Number(count)
  })

  return agg + (max.blue * max.green * max.red)
}, 0)

console.log(sum)

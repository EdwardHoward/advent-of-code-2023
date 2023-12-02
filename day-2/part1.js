const fs = require('node:fs')
const input = fs.readFileSync('./day-2/input.txt').toString()

const possible = {
  red: 12,
  green: 13,
  blue: 14
}

const gameIds = input.split(/\n/).reduce((agg, line) => {
  const [game, cubes] = line.split(':')
  const id = game.split(' ')[1]

  agg.add(id)

  cubes
    .split(';')
    .flatMap(g =>
      g.split(',').map(f => f.trim())
    )
    .forEach(b => {
      const [count, color] = b.split(' ')

      if (possible[color] < count) {
        agg.delete(id)
      }
    })

  return agg
}, new Set())

console.log(Array.from(gameIds).reduce((agg, val) => agg + Number(val), 0))
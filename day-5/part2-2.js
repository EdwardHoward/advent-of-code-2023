const fs = require('node:fs')

const test = false
const input = fs.readFileSync(test ? './day-5/test.txt' : './day-5/input.txt').toString()

const lines = input//.split('\n')

const [seeds, ...rest] = lines.split(/\n\n/g).map(section => section.split(':')[1].trim().split(/\n/g))

const splitRest = rest.map(map => map.map(line => line.split(' ').map(Number)))
let location = Infinity

const seedPairs = seeds[0].split(' ').map(Number)

for (var seedPair = 0; seedPair < seedPairs.length; seedPair += 2) {
  const s = seedPairs[seedPair]
  const g = seedPairs[seedPair + 1]
  for (var i = s; i < s + g; i += 1) {
    let lastVal = i

    for (const map of splitRest) {
      for (const line of map) {
        const [destination, source, range] = line

        if (lastVal >= source && lastVal <= source + range) {
          lastVal = destination + (lastVal - source)

          break
        }
      }
    }

    if (lastVal < location) {
      console.log(seedPair, lastVal)
      location = lastVal

      // break
    }
  }
}

console.log(location)
debugger
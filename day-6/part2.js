const fs = require('node:fs')

const test = false
const input = fs.readFileSync(test ? './day-6/test.txt' : './day-6/input.txt').toString()

const lines = input.split('\n')

const [times, distances] = lines.map(line => {
  return Number(line.split(': ')[1].split(' ').map(Number).filter(a => a).join(''))
})

let s = 1
const time = times
let count = 0
for (var i = 0; i < time; i++) {
  const dist = time - i

  const t = i * dist

  if (t > distances) {
    count++
  }
}

s *= count

console.log(s)

debugger
const fs = require('node:fs')

const test = true
const input = fs.readFileSync(test ? './day-4/input.txt' : './day-4/test.txt').toString()

const lines = input.split('\n')

console.log(lines)

let total = 0
for (var line of lines) {
  const [, numbers] = line.split(': ')
  const [winning, player] = numbers.split(' | ')

  const playerNumbers = new Set(player.match(/\d*/g).filter(str => str !== '').map(Number))
  const winningNumbers = new Set(winning.match(/\d*/g).filter(str => str !== '').map(Number))

  let count = 0
  for (const value of playerNumbers) {
    if (winningNumbers.has(value)) {
      if (count === 0) {
        count = 1
      } else {
        count = count * 2
      }
    }
  }

  total += count
}

console.log(total)
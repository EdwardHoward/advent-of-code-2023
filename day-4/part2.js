const fs = require('node:fs')

const test = false
const input = fs.readFileSync(!test ? './day-4/input.txt' : './day-4/test.txt').toString()

const lines = input.split('\n')

let total = 0

const lineCounts = []
const queue = []
for (var i = 0; i < lines.length; i++) {
  if (!queue[i]) queue[i] = 1
  const line = lines[i]
  const [card, numbers] = line.split(': ')
  const [winning, player] = numbers.split(' | ')

  const playerNumbers = new Set(player.match(/\d*/g).filter(str => str !== '').map(Number))
  const winningNumbers = new Set(winning.match(/\d*/g).filter(str => str !== '').map(Number))

  let count = 0
  for (const value of playerNumbers) {
    if (winningNumbers.has(value)) {
      count++
    }
  }

  for (var j = 1; j < count + 1; j++) {
    if (!queue[i + j]) queue[i + j] = 1
    queue[i + j] += queue[i]
  }

  lineCounts.push(count)
}

console.log(queue.reduce((agg, val) => agg + val, 0))

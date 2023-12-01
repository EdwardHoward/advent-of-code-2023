const fs = require('node:fs')

let sum = 0;

const input = fs.readFileSync('./day-1/input.txt').toString()

input
  .split(/\n/)
  .map(lines => {
    const numbers = lines.split('')
      .filter(Number)
    const number = numbers.at(0) + '' + numbers.at(-1)
    sum += Number(number)
  })

console.log(sum)
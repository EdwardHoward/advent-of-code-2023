const fs = require('node:fs')

const input = fs.readFileSync('./day-1/input.txt').toString()

const includes = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', '1', '2', '3', '4', '5', '6', '7', '8', '9']
let sum = 0

input
  .split(/\n/)
  .map(lines => {
    const numbers = includes
      .flatMap((num, index) => (
        [
          {
            position: lines.indexOf(num),
            value: Number(num) ? Number(num) : index + 1
          },
          {
            position: lines.lastIndexOf(num),
            value: Number(num) ? Number(num) : index + 1
          }
        ]
      ))
      .filter(num => num.position > -1)
      .sort((a, b) => a.position - b.position)

    const number = numbers.at(0).value + '' + numbers.at(-1).value

    sum += Number(number)
  })

console.log(sum)

const fs = require('node:fs')

const test = true
const input = fs.readFileSync(test ? './day-3/input.txt' : './day-3/test.txt').toString()

const lines = input.split('\n')

const numbers = []
const symbols = {}

lines.forEach((line, y) => {
  let isNum = false
  let numbs = []

  line.split('').forEach((val, x) => {
    if (!isNaN(Number(val))) {
      isNum = true

      numbs.push({ val, x, y })

      // This lost me like 20 minutes
      if (x === lines[0].length - 1) {
        numbers.push(numbs)
        numbs = []
        isNum = false
      }

      return
    }

    if (isNum) {
      numbers.push(numbs)
      numbs = []
      isNum = false
    }


    if (val !== '.') symbols[x + ',' + y] = { val }
  })
})


function getAtCoord(x, y) {
  return symbols[x + ',' + y]
}

let sum = 0

numbers.forEach((number) => {
  let match = false
  number.forEach((num) => {
    const { x, y } = num

    if (getAtCoord(x - 1, y - 1) || getAtCoord(x, y - 1) || getAtCoord(x + 1, y - 1)
      || getAtCoord(x - 1, y) || getAtCoord(x + 1, y)
      || getAtCoord(x - 1, y + 1) || getAtCoord(x, y + 1) || getAtCoord(x + 1, y + 1)) {
      match = true
    }
  })

  if (match) {
    sum += Number(number.reduce((agg, val) => agg + val.val, ''))
  }
})

console.log(sum)

debugger
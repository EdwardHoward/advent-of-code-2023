const fs = require('node:fs')

const test = false
const input = fs.readFileSync(test ? './day-15/test.txt' : './day-15/input.txt').toString()

function hash(str) {
  let currentValue = 0

  for (let i = 0; i < str.length; i++) {
    const ascii = str.charCodeAt(i)

    currentValue += ascii

    currentValue *= 17
    currentValue %= 256
  }

  return currentValue
}

const sum = input.split(',').reduce((acc, str) => {
  return acc + hash(str)
}, 0)

console.log(sum)
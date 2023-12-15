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

const sum = input.split(',').reduce((boxes, str) => {
  const operation = str.includes('=') ? 'set' : 'delete'

  if (operation === 'set') {
    const [label, length] = str.split('=')
    const hashValue = hash(label)

    if (!boxes[hashValue]) boxes[hashValue] = []

    const lensIndex = boxes[hashValue].findIndex(lens => lens.label === label)

    if (lensIndex > -1) {
      boxes[hashValue][lensIndex] = { label, length }
    } else {
      boxes[hashValue].push({ label, length })
    }
  }

  if (operation === 'delete') {
    const [label] = str.split('-')
    const hashValue = hash(label)

    if (!boxes[hashValue]) return boxes

    const lensIndex = boxes[hashValue].findIndex(lens => lens.label === label)

    if (lensIndex > -1) {
      boxes[hashValue].splice(lensIndex, 1)
    }
  }

  return boxes
}, [])

let total = 0
for (let i = 0; i < sum.length; i++) {
  const box = sum[i]

  if (!box) continue

  for (let j = 0; j < box.length; j++) {
    total += (i + 1) * (j + 1) * Number(box[j].length)
  }
}

console.log(total)

debugger
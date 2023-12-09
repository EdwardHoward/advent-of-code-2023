const fs = require('node:fs')

const test = false
const input = fs.readFileSync(test ? './day-9/test.txt' : './day-9/input.txt').toString()

const lines = input.split('\n')

const sequences = lines.reduce((acc, line) => {
  let currentVal = line.split(' ').map(Number)
  const sequenceList = [currentVal]

  while (!currentVal.every(val => val === 0)) {
    let sequence = []

    for (let i = 0; i < currentVal.length - 1; i++) {
      sequence.push(currentVal[i + 1] - currentVal[i])
    }

    currentVal = sequence
    sequenceList.push(sequence)
  }

  acc.push(sequenceList)

  return acc
}, [])

const sum = sequences.reduce((acc, sequence) => {
  sequence.reverse()

  for (let i = 0; i < sequence.length; i++) {
    if (i === 0) {
      sequence.at(i).push(0)
    } else {
      sequence.at(i).push(sequence.at(i).at(-1) + sequence.at(i - 1).at(-1))
    }
  }

  return acc + sequence.at(-1).at(-1)
}, 0)

console.log(sum)
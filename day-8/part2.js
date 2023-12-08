const fs = require('node:fs')

const test = false
const input = fs.readFileSync(test ? './day-8/test.txt' : './day-8/input2.txt').toString()

const lines = input.split('\n')

class Node {
  left
  right

  constructor(value) {
    this.value = value
  }
}

const instructions = lines.shift()
lines.shift()

const nodes = {}

for (const line of lines) {
  const [value] = line.split(' = (')

  nodes[value] = new Node(value)
}

for (const line of lines) {
  const [value, rest] = line.split(' = (')

  const [a, b] = rest.replace(')', '').split(', ')

  nodes[value].left = nodes[a]
  nodes[value].right = nodes[b]
}

let ANodes = Object.entries(nodes).filter(node => node[1].value.at(-1) === 'A').map(([, node]) => node)

const sums = []

ANodes.forEach((node) => {
  let i = 0
  let sum = 0
  while (node.value[2] !== 'Z') {
    const instruction = instructions[i]

    if (instruction === 'R') {
      node = node.right
    } else {
      node = node.left
    }

    i = (i + 1) % instructions.length
    sum++
  }

  sums.push(sum)
})

console.log(sums)
// Then I took these numbers and used an online calculator to find the common multiple
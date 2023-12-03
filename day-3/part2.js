
const fs = require('node:fs')

const test = false
const input = fs.readFileSync(test ? './day-3/test.txt' : './day-3/input.txt').toString()

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


    if (val === '*') symbols[x + ',' + y] = { val, x, y }
  })
})


function getAtCoord(x, y) {
  return symbols[x + ',' + y]
}

function getGear(x, y) {
  return [getAtCoord(x - 1, y - 1), getAtCoord(x, y - 1), getAtCoord(x + 1, y - 1)
    , getAtCoord(x - 1, y), getAtCoord(x + 1, y)
    , getAtCoord(x - 1, y + 1), getAtCoord(x, y + 1), getAtCoord(x + 1, y + 1)].filter(Boolean)
}

let sum = 0

const gears = {}
numbers.forEach((number) => {
  const numberGears = {}

  number.forEach((num) => {
    const { x, y } = num

    const neighborGears = getGear(x, y)

    neighborGears.forEach(gear => {
      if (!numberGears[gear.x + ',' + gear.y]) numberGears[gear.x + ',' + gear.y] = []
      numberGears[gear.x + ',' + gear.y] = gear
    })
  })

  Object.values(numberGears).forEach(gear => {
    if (!gears[gear.x + ',' + gear.y]) gears[gear.x + ',' + gear.y] = []

    gears[gear.x + ',' + gear.y].push(Number(number.reduce((agg, val) => agg + val.val, '')))
  })
})

Object.values(gears).forEach(gear => {
  if (gear.length === 2) {
    sum += gear.reduce((agg, val) => agg * val, 1)
  }
})

console.log(sum)

debugger
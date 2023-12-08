const fs = require('node:fs')

const test = false
const input = fs.readFileSync(test ? './day-7/test.txt' : './day-7/input.txt').toString()

const lines = input.split('\n')

const getStrength = (cards) => {
  const cardScores = cards.map(card => card[1])

  const uniqueCards = new Set(cardScores)

  const cardLabels = cards.map(card => card[0])
  const uniqueLabels = new Set(cardLabels)

  if (uniqueCards.has(2) && uniqueCards.has(1)) {
    if (uniqueLabels.size === 3) {
      return 'two pair'
    }

    if (uniqueLabels.size === 4) {
      return 'pair'
    }
  }

  if (uniqueCards.has(3) && uniqueCards.has(2)) {
    return 'full house'
  }

  if (uniqueCards.has(3) && uniqueCards.has(1)) {
    return 'three'
  }

  if (uniqueCards.has(4)) {
    return 'four'
  }

  if (uniqueCards.has(5)) {
    return 'five'
  }

  return 'high'
}

const ranks = []
lines.forEach(line => {
  const [hand, score] = line.split(' ')

  const handObj = { score: Number(score), cards: {} }
  hand.split('').forEach(val => {
    if (!handObj.cards[val]) handObj.cards[val] = 0

    handObj.cards[val] += 1
  })

  const entries = Object.entries(handObj.cards)
  const sorted = entries.toSorted((a, b) => b[1] - a[1])
  const strength = getStrength(sorted)

  ranks.push({ ...handObj, original: hand, cards: sorted, strength })
})

const order = [
  'five',
  'four',
  'full house',
  'three',
  'two pair',
  'pair',
  'high'
]

const cardOrder = ['A', 'K', 'Q', 'J', 'T']

const sortedRanks = ranks.toSorted((aHand, bHand) => {
  const a = aHand.strength
  const b = bHand.strength

  if (a !== b) {
    return order.indexOf(b) - order.indexOf(a)
  }

  for (var i = 0; i < aHand.original.length; i++) {
    const a = aHand.original[i]
    const b = bHand.original[i]

    if (a === b) continue

    if (isNaN(Number(a)) && !isNaN(Number(b))) {
      return 1
    }

    if (isNaN(Number(b)) && !isNaN(Number(a))) {
      return -1
    }

    if (!isNaN(Number(a) && !isNaN(Number(b)))) {
      return Number(a) - Number(b)
    }

    return cardOrder.indexOf(b) - cardOrder.indexOf(a)
  }
})

console.log(sortedRanks.reduce((acc, val, i) => acc + val.score * (i + 1), 0))

debugger
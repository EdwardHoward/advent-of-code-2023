const fs = require('node:fs')

const test = false
const input = fs.readFileSync(test ? './day-7/test.txt' : './day-7/input.txt').toString()

const lines = input.split('\n')

const getScore = (cards) => {
  if ((cards.length === 1) || !cards[0] || cards[0] === 3 && !cards[1]) return 'wild five'
  if (cards[0] === 1 && cards[1] === 1 && !cards[2]) return 'wild four'
  if (cards[0] === 1 && cards[1] === 1 && cards[2] === 1 && !cards[3]) return 'wild pair'
  if (cards[0] === 2 && cards[1] === 2) return 'two pair'
  if (cards[0] === 2) return 'pair'
  if (cards[0] === 3 && cards[1] === 2) return 'full house'
  if (cards[0] === 3) return 'three'
  if (cards[0] === 4) return 'four'

  if (cards[0] === 5) return 'five'

  return 'high'
}

const types = [
  'high',
  'pair',
  'two pair',
  'three',
  'full house',
  'four',
  'five'
]

const getStrength = (cards) => {
  const cardScores = cards
    .filter(card => card[0] !== 'J')
    .map(card => card[1])
    .sort((a, b) => b - a)

  const score = getScore(cardScores)

  const wilds = cards.find(card => card[0] === 'J')?.[1] || 0

  if (score === 'wild pair') return 'three'
  if (score === 'wild five') return 'five'
  if (score === 'wild four') return 'four'

  if (score === 'high') {
    return types[wilds]
  }

  if (score === 'pair') {
    if (wilds === 1) {
      return 'three'
    }

    if (wilds === 2) {
      return 'four'
    }

    if (wilds === 3) {
      return 'five'
    }
  }

  if (score === 'two pair') {
    if (wilds === 1) {
      return 'full house'
    }
  }

  if (score === 'three') {
    if (wilds === 1) {
      return 'four'
    }

    if (wilds === 2) {
      return 'full house'
    }
  }

  if (score === 'four') {
    if (wilds === 1) return 'five'
  }

  return score
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

  const strength = getStrength(entries)

  ranks.push({ ...handObj, original: hand, cards: entries, strength })
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

const cardOrder = ['A', 'K', 'Q', 'T']

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

    if (a === 'J') return -1
    if (b === 'J') return 1

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

const jacksOnly = sortedRanks.filter(hand => hand.original.split('').filter(a => a === 'J').length > 0)

console.log(sortedRanks.reduce((acc, val, i) => acc + val.score * (i + 1), 0))

debugger
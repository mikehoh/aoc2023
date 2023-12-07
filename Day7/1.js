const fs = require('fs')

const filePath = './input.txt'
const fileContent = fs.readFileSync(filePath, 'utf-8')
const lines = fileContent.split('\n')

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const handTypes = [
  {
    type: 'high-card',
    isType: (hand) => {
      const cardMap = {}
      for (let card of hand) {
        cardMap[card] = (cardMap[card] || 0) + 1
      }
      return (Object.keys(cardMap).length === 5) ? true : false
    },
  },
  {
    type: 'one-pair',
    isType: (hand) => {
      const cardMap = {}
      let pair = false
      for (let card of hand) {
        cardMap[card] = (cardMap[card] || 0) + 1
        if (cardMap[card] === 2) {
          pair = true
        }
      }
      return (pair && Object.keys(cardMap).length === 4) ? true : false
    },
  },
  {
    type: 'two-pair',
    isType: (hand) => {
      const cardMap = {}
      let pairCount = 0
      for (let card of hand) {
        cardMap[card] = (cardMap[card] || 0) + 1
        if (cardMap[card] === 2) {
          pairCount += 1
        }
      }
      return (pairCount == 2 && Object.keys(cardMap).length === 3) ? true : false
    },
  },
  {
    type: 'three-of-a-kind',
    isType: (hand) => {
      const cardMap = {}
      let threeCards = false
      for (let card of hand) {
        cardMap[card] = (cardMap[card] || 0) + 1
        if (cardMap[card] === 3) {
          threeCards = true
        }
      }
      return (threeCards && Object.keys(cardMap).length === 3) ? true : false
    },
  },
  {
    type: 'full-house',
    isType: (hand) => {
      const cardMap = {}
      let threeCards = false
      let twoCards = false
      for (let card of hand) {
        cardMap[card] = (cardMap[card] || 0) + 1
        if (cardMap[card] === 3) {
          threeCards = true
        }
        if (cardMap[card] === 2) {
          twoCards = true
        }
      }
      return (threeCards && twoCards && Object.keys(cardMap).length === 2 && [2, 3].includes(cardMap[Object.keys(cardMap)[0]])) ? true : false
    },
  },
  {
    type: 'four-of-a-kind',
    isType: (hand) => {
      const cardMap = {}
      let fourCards = false
      for (let card of hand) {
        cardMap[card] = (cardMap[card] || 0) + 1
        if (cardMap[card] === 4) {
          fourCards = true
        }
      }
      return (fourCards && Object.keys(cardMap).length === 2) ? true : false
    },
  },
  {
    type: 'five-of-a-kind',
    isType: (hand) => hand.split('').every(card => card === hand[0]),
  }
]

const handsData = []
for(let line of lines) {
  const [hand, bid] = line.split(' ')
  for (let [index, handType] of handTypes.entries()) {
    if (handType.isType(hand)) {
      handsData.push({
        hand,
        bid: parseInt(bid),
        strength: index,
      })
      break
    }
  }
}

const sortedHandsData = handsData.sort((a, b) => {
  if (a.strength === b.strength) {
    for(let i = 0; i < a.hand.length; i++) {
      if (a.hand[i] !== b.hand[i]) {
        return cards.indexOf(b.hand[i]) - cards.indexOf(a.hand[i])
      }
    }
  }
  return a.strength - b.strength
})

const result = sortedHandsData.reduce((acc, handData, index) => acc + handData.bid * (index + 1), 0)

console.log(result)
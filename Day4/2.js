const fs = require('fs')

const filePath = './input.txt'
const fileContent = fs.readFileSync(filePath, 'utf-8')
const lines = fileContent.split('\n')

const cards = []
for (let i = 0; i < lines.length; i++) {
  const winningNumbers = lines[i].match(/Card.+\d+: ([\d\s]+) \|/)[1].trim().split(/\s+/).map(Number)
  const myNumbers = lines[i].match(/\| ([\d\s]+)$/)[1].trim().split(/\s+/).map(Number)
  const myWinningNumbers = myNumbers.filter(number => winningNumbers.includes(number))
  cards.push({ winningNumbers: myWinningNumbers.length, card: i })
}

for (let i = 0; i < cards.length; i++) {
  for (let j = 0; j < cards[i].winningNumbers; j++) {
    cards.push(cards[cards[i].card + j + 1])
  }
}

console.log(cards.length)
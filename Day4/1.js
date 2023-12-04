const fs = require('fs')

const filePath = './input.txt'
const fileContent = fs.readFileSync(filePath, 'utf-8')
const lines = fileContent.split('\n')

let sum = 0
for (let i = 0; i < lines.length; i++) {
  const winningNumbers = lines[i].match(/Card.+\d+: ([\d\s]+) \|/)[1].trim().split(/\s+/).map(Number)
  const myNumbers = lines[i].match(/\| ([\d\s]+)$/)[1].trim().split(/\s+/).map(Number)
  const myWinningNumbers = myNumbers.filter(number => winningNumbers.includes(number))
  if (myWinningNumbers.length > 0) {
    const cardPonts = 2 ** (myWinningNumbers.length - 1)
    sum += cardPonts
  }
}

console.log(sum)
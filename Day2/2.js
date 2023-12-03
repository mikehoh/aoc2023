const fs = require('fs')

const filePath = './input.txt'
const fileContent = fs.readFileSync(filePath, 'utf-8')
const lines = fileContent.split('\n')

let sum = 0
for (let i = 0; i < lines.length; i++) {
  const game = lines[i].split(':')[1].trim().split(';')
  const maxValues = {}
  game.map(set => {
    const items = set.split(',')
    items.forEach(item => {
      const [count, color] = item.trim().split(' ')
      if (maxValues[color] < parseInt(count) || !maxValues[color]) {
        maxValues[color] = parseInt(count)
      }
    })
  })
  const power = Object.values(maxValues).reduce((acc, value) => acc * value, 1)
  sum += power
}

console.log(sum)
const fs = require('fs')

const filePath = './input.txt'
const fileContent = fs.readFileSync(filePath, 'utf-8')
const lines = fileContent.split('\n')

const bag = {
  red: 12,
  green: 13,
  blue: 14
}

let sum = 0
for (let i = 0; i < lines.length; i++) {
  const game = lines[i].split(':')[1].trim().split(';')
  const gameSets = game.map(set => {
    const items = set.split(',')
    const setObject = {}
    items.forEach(item => {
      const [count, color] = item.trim().split(' ')
      if (bag[color] < parseInt(count)) {
        setObject[color] = parseInt(count)
      }
    })
    return setObject
  })
  const isEmpty = gameSets.every(obj => Object.keys(obj).length === 0)
  if (isEmpty) {
    sum += i + 1
  }
}

console.log(sum)
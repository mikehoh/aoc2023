const fs = require('fs')

const filePath = './input.txt'
const fileContent = fs.readFileSync(filePath, 'utf-8')
const lines = fileContent.split('\n')

const time = parseInt(lines[0].match(/\d+/g).reduce((acc, cur) => acc + cur, ''))
const record = parseInt(lines[1].match(/\d+/g).reduce((acc, cur) => acc + cur, ''))

let waysWin = 0
for (let hold = 1; hold < time; hold++) {
  const distance = hold * (time - hold)
  if (distance > record) {
    waysWin++
  }
}
console.log(waysWin)
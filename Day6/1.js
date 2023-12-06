const fs = require('fs')

const filePath = './input.txt'
const fileContent = fs.readFileSync(filePath, 'utf-8')
const lines = fileContent.split('\n')

const time = lines[0].match(/\d+/g).map(Number)
const record = lines[1].match(/\d+/g).map(Number)

let result = 1
for (let i = 0; i < time.length; i++) {
  let waysWin = 0
  for (let hold = 1; hold < time[i]; hold++) {
    const distance = hold * (time[i] - hold)
    if (distance > record[i]) {
      waysWin++
    }
  }
  result *= waysWin
}

console.log(result)
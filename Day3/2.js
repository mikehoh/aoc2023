const fs = require('fs')

const filePath = './input.txt'
const fileContent = fs.readFileSync(filePath, 'utf-8')
const lines = fileContent.split('\n')

const adjacent = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1]
]

const foundDigits = []
const foundNumbers = []
let numberStart = false
let foundNumber

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    if (lines[i][j] === '*') {
      const gear = {
        pos: `${i}-${j}`,
        digitsAround: []
      }
      adjacent.forEach(pos => {
        if (lines[i + pos[0]] && lines[i + pos[0]][j + pos[1]] && !isNaN(parseInt(lines[i + pos[0]][j + pos[1]], 10))) {
          gear.digitsAround.push(`${i + pos[0]}-${j + pos[1]}`)
        }
      })
      foundDigits.push(gear)
    }

    if (!isNaN(parseInt(lines[i][j], 10))) {
      if (!numberStart) {
        numberStart = true
        foundNumber = {
          pos: [`${i}-${j}`],
          value: lines[i][j]
        }
      } else {
        foundNumber.pos.push(`${i}-${j}`)
        foundNumber.value += lines[i][j]
      }
    } else {
      if (numberStart) {
        numberStart = false
        foundNumbers.push(foundNumber)
        foundNumber = null
      }
    }
  }
}

const gearsNumbers = {}
for (let i = 0; i < foundNumbers.length; i++) {
  for (let j = 0; j < foundDigits.length; j++) {
    if (foundNumbers[i].pos.some(pos => foundDigits[j].digitsAround.includes(pos))) {
      if (gearsNumbers[foundDigits[j].pos]) {
        gearsNumbers[foundDigits[j].pos].push(foundNumbers[i].value)
      } else {
        gearsNumbers[foundDigits[j].pos] = [foundNumbers[i].value]
      }
    }
  }
}

const sum = Object.keys(gearsNumbers)
            .filter(key => gearsNumbers[key].length === 2)
            .map(key => gearsNumbers[key].reduce((acc, cur) => acc * cur, 1))
            .reduce((acc, cur) => acc + cur, 0)

console.log(sum)
const fs = require('fs')

const filePath = './input.txt'
const fileContent = fs.readFileSync(filePath, 'utf-8')
const lines = fileContent.split('\n')

const regex = /[^0-9.]/
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
    if (regex.test(lines[i][j])) {
      adjacent.forEach(pos => {
        if (lines[i + pos[0]] && lines[i + pos[0]][j + pos[1]] && !isNaN(parseInt(lines[i + pos[0]][j + pos[1]], 10))) {
          foundDigits.push(`${i + pos[0]}-${j + pos[1]}`)
        }
      })
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

let sum = 0
for (let i = 0; i < foundNumbers.length; i++) {
  if (foundNumbers[i].pos.some(pos => foundDigits.includes(pos))) {
    sum += parseInt(foundNumbers[i].value)
  }
}

console.log(sum)
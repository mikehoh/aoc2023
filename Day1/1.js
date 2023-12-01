const fs = require('fs')

const filePath = './input.txt'
const fileContent = fs.readFileSync(filePath, 'utf-8')
const lines = fileContent.split('\n')

let sum = 0
const regex = /\d/g

for (const line of lines) {
  const lineMatches = []
  let mtch
  while ((mtch = regex.exec(line)) !== null) {
    if (mtch.index === regex.lastIndex) {
      regex.lastIndex++
    }
    mtch.forEach((match, groupIndex) => {
      if (groupIndex === 0) {
        lineMatches.push(match)
      }
    })
  }
  const firstDigit = lineMatches[0]
  const lastDigit = lineMatches[lineMatches.length - 1]
  const calibrationValue = firstDigit + lastDigit
  sum += parseInt(calibrationValue)
}

console.log(sum)

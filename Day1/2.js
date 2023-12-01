const fs = require('fs')

const filePath = './input.txt'
const fileContent = fs.readFileSync(filePath, 'utf-8')
const lines = fileContent.split('\n')

const digitsMap = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 }

let sum = 0
const regex = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g

for (const line of lines) {
  const lineMatches = []
  let mtch
  while ((mtch = regex.exec(line)) !== null) {
    if (mtch.index === regex.lastIndex) {
      regex.lastIndex++
    }
    mtch.forEach((match, groupIndex) => {
      if (groupIndex === 1) {
        lineMatches.push(match)
      }
    })
  }
  const firstDigit = digitsMap[lineMatches[0]] || lineMatches[0]
  const lastDigit = digitsMap[lineMatches[lineMatches.length - 1]] || lineMatches[lineMatches.length - 1]
  const calibrationValue = `${firstDigit}${lastDigit}`
  sum += parseInt(calibrationValue)
}

console.log(sum)

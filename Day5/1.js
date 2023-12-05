const fs = require('fs')

const filePath = './input.txt'
const fileContent = fs.readFileSync(filePath, 'utf-8')
const lines = fileContent.split('\n')

const seeds = lines[0].split('seeds: ')[1].split(' ').map(Number)
const mapLines = lines.slice(2)
const maps = {}

const mapNames = []
let currentMapName = ''
let currentMaps = []

for (const line of mapLines) {
  if (line.endsWith('map:')) {
    currentMapName = line.replace(' map:', '')
    mapNames.push(currentMapName)
    currentMaps = []
  } else if (line.length > 0) {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = line.split(' ').map(Number)
    currentMaps.push({
      destinationRangeStart,
      sourceRangeStart,
      rangeLength,
    })
  } else {
    continue
  }

  if (currentMapName && currentMaps.length > 0) {
    maps[currentMapName] = currentMaps
  }
}

const findLocation = (numbers, mapIndex) => {
  const activeMap = mapNames[mapIndex]
  const map = maps[activeMap]
  const newNumbers = []
  for (const number of numbers) {
    const mapRange = map.find(({ sourceRangeStart, rangeLength }) => {
      return number >= sourceRangeStart && number < sourceRangeStart + rangeLength
    })
    if (mapRange) {
      const newNumber = mapRange.destinationRangeStart + number - mapRange.sourceRangeStart
      newNumbers.push(newNumber)
    } else {
      newNumbers.push(number)
    }
  }
  if (mapIndex < mapNames.length - 1) {
    return findLocation(newNumbers, mapIndex + 1)
  } else {
    return Math.min(...newNumbers)
  }
}

console.log(findLocation(seeds, 0))
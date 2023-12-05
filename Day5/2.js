const fs = require('fs')

const filePath = './input.txt'
const fileContent = fs.readFileSync(filePath, 'utf-8')
const lines = fileContent.split('\n')

const seedsLine = lines[0].split('seeds: ')[1].split(' ').map(Number)

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

const findLocation = (number, mapIndex) => {
  const activeMap = mapNames[mapIndex]
  const map = maps[activeMap]

  let newNumber
  const mapRange = map.find(({ sourceRangeStart, rangeLength }) => {
    return number >= sourceRangeStart && number < sourceRangeStart + rangeLength
  })
  if (mapRange) {
    newNumber = mapRange.destinationRangeStart + number - mapRange.sourceRangeStart
  } else {
    newNumber = number
  }

  if (mapIndex < mapNames.length - 1) {
    return findLocation(newNumber, mapIndex + 1)
  } else {
    return newNumber
  }
}

let lowest = Infinity
for (let i = 0; i < seedsLine.length; i += 2) {
  const start = seedsLine[i]
  const length = seedsLine[i + 1]

  for (let j = 0; j < length - 1; j++) {
    const location = findLocation(start + j, 0)
    if (location < lowest) {
      lowest = location
    }
  }
}

console.log(lowest)
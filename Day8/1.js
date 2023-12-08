const fs = require('fs')

const filePath = './input.txt'
const fileContent = fs.readFileSync(filePath, 'utf-8')
const lines = fileContent.split('\n')

const instruction = lines[0].split('')

const nodeLines = lines.slice(2)
const nodes = {}
for (let line of nodeLines) {
  const nodeData = line.split(' = ')
  nodes[nodeData[0]] = {
    left: nodeData[1].split(', ')[0].slice(1),
    right: nodeData[1].split(', ')[1].slice(0, -1),
  }
}

let step = 0
let currentStep = 0
let currentNode = 'AAA'
while (currentNode != 'ZZZ') {
  if (instruction[currentStep] == 'L') {
    currentNode = nodes[currentNode].left
  } else if (instruction[currentStep] == 'R') {
    currentNode = nodes[currentNode].right
  }
  step += 1
  if (currentStep == instruction.length - 1) {
    currentStep = 0
  } else {
    currentStep += 1
  }
}

console.log(step)
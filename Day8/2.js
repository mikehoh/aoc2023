const fs = require('fs')

const filePath = './input2.txt'
const fileContent = fs.readFileSync(filePath, 'utf-8')
const lines = fileContent.split('\n')

const instruction = lines[0].split('')

const nodeLines = lines.slice(2)
const nodes = {}
const startingNodes = []
for (let line of nodeLines) {
  const nodeData = line.split(' = ')
  nodes[nodeData[0]] = {
    left: nodeData[1].split(', ')[0].slice(1),
    right: nodeData[1].split(', ')[1].slice(0, -1),
  }
  if (nodeData[0][2] == 'A') {
    startingNodes.push(nodeData[0])
  }
}

const nodeSteps = []

for (let startingNode of startingNodes) {
  let step = 0
  let currentStep = 0
  let currentNode = startingNode
  while (currentNode.charAt(2) !== 'Z') {
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
  nodeSteps.push(step)
}

const greatestCommonDivisor = (a, b) => {
  if (b == 0) {
    return a
  }
  return greatestCommonDivisor(b, a % b)
}

const leastCommonMultiple = (a, b) => {
  return (a * b) / greatestCommonDivisor(a, b)
}

const result = nodeSteps.reduce((acc, num) => leastCommonMultiple(acc, num), 1)
console.log(result)
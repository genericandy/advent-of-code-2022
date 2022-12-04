const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n/})

const results = 'XYZ'
const shapes = 'ABC'

// L T W
const myResults = [
    'YZX', // rock
    'XYZ', // paper
    'ZXY' // scissors
]

function calcScore(str) {
    const [opponent, goal] = str.match(/\w/g)
    const opponentScore = shapes.indexOf(opponent)
    const myShapeScore = myResults[opponentScore].indexOf(goal)
    return myShapeScore + 1 + results.indexOf(goal) * 3
}

const result = data.map(calcScore).reduce((t, n) => t + n, 0)

console.log(result);
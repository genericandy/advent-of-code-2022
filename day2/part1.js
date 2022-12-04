const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n/})

const shapes = 'XYZ'

// L T W
const outcomes = [
    'BAC', // rock
    'CBA', // paper
    'ACB' // scissors
]

function calcScore(str) {
    const [opponent, me] = str.match(/\w/g)
    const myShapeScore = shapes.indexOf(me)
    const outcome = outcomes[myShapeScore].indexOf(opponent)
    return myShapeScore + 1 + outcome * 3
}

const result = data.map(calcScore).reduce((t, n) => t + n, 0)

console.log(result);
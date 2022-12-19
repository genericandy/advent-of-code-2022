const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src)
const chars = 4

const result = data
    .split('')
    .map( (c, i, arr) => i < chars - 1 ? [] : arr.slice( i - chars, i))
    .findIndex(a => new Set(a).size === chars )

console.log(result);
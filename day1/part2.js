const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n\r\n/})

const result = data.map(
    str => str.split(/\r\n/)
                .map(Number)
                .reduce((t, n) => t + n, 0))
                .sort((a, b) => b - a)
                

console.log(result[0] + result[1] + result[2]);
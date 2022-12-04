const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n/})

const result = data.map( str => str.match(/\d+/g).map(Number))
                    .map(([a1, a2, b1, b2]) => Math.min(a2, b2) - Math.max(a1, b1))
                    .filter(n => n >= 0)

console.log(result.length);
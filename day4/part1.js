const loadFile = require('../utils/loadFile')
const src = './sampledata.txt'
// const src = './data.txt'
const data = loadFile(src, { split: /\r\n/})

const result = data.map( str => str.match(/\d+/g).map(Number))
                .filter(([a1, a2, b1, b2]) => (a1 <= b1 && a2 >= b2) || (a1 >= b1 && a2 <= b2))


console.log(result.length);
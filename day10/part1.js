const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n/})

const result = data
    .map( str => str.split(/\s/))
    .reduce((signals, [ action, val ]) => action === 'noop' 
        ? [...signals, signals.slice(-1)[0] ] 
        : [...signals, signals.slice(-1)[0], signals.slice(-1)[0] + Number(val)], [1])
    .reduce((sum, x, i) => (i - 19) % 40 === 0 ? sum + x * (i + 1) : sum, 0)

console.log(result);
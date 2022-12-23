const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n/})

const result = data
    .map( str => str.split(/\s/))
    .reduce((signals, [ action, val ]) => action === 'noop' 
        ? [...signals, signals.slice(-1)[0] ] 
        : [...signals, signals.slice(-1)[0], signals.slice(-1)[0] + Number(val)], [1])
    .map((x, i) => x > i%40 - 2 && x < i%40 + 2 ? '#' : '.')
    .reduce((arr, x, i) => {
        const row = i/40|0

        if (arr.length < row + 1) {
            arr.push([x])
        } else {
            arr[row].push(x)
        }
        return arr
    }, [])
    .map(arr => arr.join(''))

console.log(result);
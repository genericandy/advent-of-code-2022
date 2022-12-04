const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n/})
const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const sum = data.map( str => [str.substring(0, str.length/2),str.substring(str.length/2)])
                .map(([s1, s2]) => [...s1].find(l => s2.indexOf(l) != -1))
                .reduce((t,l) => t + letters.indexOf(l) + 1, 0)

console.log(sum);
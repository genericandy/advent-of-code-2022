const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n/})
const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const sum = data.reduce( (t, s, i) => i%3 === 0 ? [...t, [s, data[i+1], data[i+2]] ] : t, [])
                .map(([s1, s2, s3]) => [...s1].find(l => s2.indexOf(l) != -1 && s3.indexOf(l) != -1))
                .reduce((t,l) => t + letters.indexOf(l) + 1, 0)

console.log(sum);
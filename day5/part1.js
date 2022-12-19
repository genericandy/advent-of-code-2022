const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n\r\n/})
const stacks = []

data[0]
    .split(/\r\n/)
    .filter(str => str.match(/\[\D\]/))
    .map(row => [...row].filter((c, i) => !((i - 1) % 4))
    .forEach((c, i) => stacks[i] = c == ' ' ? stacks[i] : [...stacks[i] || [], c] )
)

const instructions = data[1]
    .split(/\r\n/)
    .map(str => str.match(/\d+/g).map(Number).map(n => n))

instructions.forEach(
    ([count, col1, col2]) => {
        stacks[col2 - 1] = [
            ...(stacks[col1 - 1].splice(0, count).reverse()),
            ...stacks[col2 - 1]
        ]
    }
)

console.log(stacks.map(col => col[0]).join(''));
const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n/})

const checkVisible = (trees, target) => trees.findIndex(l => l >= target) === -1

const visibleTrees = data
    .map( row => row.split('').map(Number))
    .reduce((gridSum, row, rowNum, grid) => {
        const rowSum = row.reduce((colSum, tree, colNum) => {
            const col = grid.map(r => r[colNum])
            return (!rowNum 
                || !colNum 
                || colNum === row.length - 1 
                || rowNum === grid.length - 1
                || checkVisible(row.slice(0, colNum), tree)
                || checkVisible(row.slice(colNum + 1), tree)
                || checkVisible(col.slice(0, rowNum), tree)
                || checkVisible(col.slice(rowNum + 1), tree)
                ) ? colSum + 1 : colSum
        }, 0)
        return gridSum + rowSum
    }, 0)

console.log(visibleTrees);
const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n/})

const getScenicScore = (trees, target) => trees.findIndex((t, i) => t >= target || i === trees.length - 1) + 1

const maxScore =  data
    .map( row => row.split('').map(Number))
    .reduce((gridMax, row, rowNum, grid) =>
        Math.max(
            gridMax,
            row.reduce((colMax, tree, colNum) => {
                const col = grid.map(r => r[colNum])
                return Math.max( colMax, 
                    getScenicScore(row.slice(0, colNum).reverse(), tree)
                    * getScenicScore(row.slice(colNum + 1), tree)
                    * getScenicScore(col.slice(0, rowNum).reverse(), tree)
                    * getScenicScore(col.slice(rowNum + 1), tree))
            }, 0)
        ), 0)

console.log(maxScore);
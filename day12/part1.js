const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n/})

let start = []
let exit = []
let exitFound = false

const dirs = [ [-1, 0], [1, 0], [0, -1], [0, 1]]

const map = data
    .map( (row, rowNum) => row
        .split('')
        .map((ltr, ltrNum) => {
            const num = ltr.charCodeAt(0) - 96
            if (num === -13) {
                start = [rowNum, ltrNum]
                return { val: 0, shortestPath: [] }
            }
            if (num === -27) {
                exit = [rowNum, ltrNum]
                return { val: 27, shortestPath: [] }
            }
            return {val: num, tested: false }
        })
)

function addBranch(branches) {
    return branches
        .map(branch => {
            const [row, col] = branch.map( str => str.split('-').map(Number)).slice(-1)[0]
            const end = map[row][col]
            end.tested = true
            if (end.val === 27) {
                exitFound = true
                console.log(branch.length - 1)
            }
            const newEnds = dirs
                .map( ([dirRow, dirCol]) => [row + dirRow, col + dirCol])
                .filter(([r,c]) => map[r]?.[c]?.val <= end.val + 1) // ensure it is 1 higher max
                .filter(([r,c]) => !map[r]?.[c]?.tested) // ensure it is not tested already
                .filter(newEnd => !branch.includes(newEnd.join('-'))) // dont let it loop back on itself
                .map(newEnd => [...branch, newEnd.join('-')])
            return newEnds
        })
        .flat()
        .filter((branch, branchNum, newBranches) => {
            const last = branch.slice(-1)[0]
            const lasts = newBranches.map(br => br.slice(-1)[0])
            return lasts.indexOf(last) === branchNum
        })
}

let paths = addBranch([[start.join('-')]])

while (!exitFound) {
    paths = addBranch(paths)
}

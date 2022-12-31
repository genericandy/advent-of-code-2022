const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n/})

const Types = {
    Rock: 0,
    Sand: 1
}

const path = [[500, 0]]
let floor = 0

const map = data.map(
            str => str
                .split(/\s\-\>\s/)
                .map(str => str.match(/\d+/g).map(Number))
        )
        .map( pos => pos.map(createRockAraay).flat())
        .flat()
        .reduce(mapRocks, new Map())

function createRockAraay([x, y], i, arr) {
    if (i === arr.length - 1) return [[x,y]]
    const rocks = []
    const [x1, y1] = arr[i+1]
    const dir = { x: Math.min(1, Math.max(-1, x1 - x)), y: Math.min(1, Math.max(-1, y1 - y)) }
    while (x !== x1 || y !== y1) {
        if (y + 2 > floor) {
            floor = y + 2
        }
        rocks.push([x,y])
        x += dir.x
        y += dir.y
    }
    return rocks
}

function mapRocks(map, pos) {
    map.set(pos.join(','), Types.Rock )
    return map
}

function dropSand() {
    const [x,y] = path.slice(-1)[0]
    if (y === floor - 1) {
        map.set(x+','+y, Types.Sand)
        path.pop()
    } else if (!map.has(x+','+(y+1))) {
        path.push([x, y + 1])
    } else if (!map.has((x - 1)+','+(y+1))) {
        path.push([x - 1, y + 1])
    } else if (!map.has((x + 1)+','+(y+1))) {
        path.push([x + 1, y + 1])
    } else {
        map.set(x+','+y, Types.Sand)
        path.pop()
    }
}

while (path.length) {
    dropSand()
}

console.log(Array.from(map.values()).reduce((sum, type) => sum + type))
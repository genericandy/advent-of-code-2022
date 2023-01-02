const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n/})

// const mapSize = 20
const mapSize = 4000000

const sensors = data.map( str => str.match(/\-?\d+/g).map(Number))
                    .map(([sx, sy, bx, by]) => ({ 
                        s: { x: sx, y: sy },
                        b: { x: bx, y: by },
                        max: Math.abs(bx - sx) + Math.abs(by - sy)
                    }))



function checkRowIntersection(row) {
    const points = sensors
                    .filter(({s, max}) => Math.abs(s.y - row) <= max)
                    .map(({ s, max }) => {
                        const x = max - Math.abs(s.y - row)
                        return { min: Math.max(0, s.x - x), max: Math.min(mapSize, s.x + x) }
                    })
                    .sort((a,b) => a.min - b.min)
                    .reduce((arr, b) => {
                        const arrLast = arr[arr.length - 1]
                        if (b.min <= arrLast.max + 1) {
                            arr[arr.length - 1] = { min: arrLast.min, max: Math.max(arrLast.max, b.max)}
                        } else {
                            arr.push(b)
                        }
                        return arr
                    }, [ {min: 0, max: 0}])
    return points
}

for (let i = 0; i < mapSize; i++) {
    const pointRows = checkRowIntersection(i)
    if (pointRows.length > 1) {
        console.log((pointRows[0].max + 1) * mapSize + i)
    }
}
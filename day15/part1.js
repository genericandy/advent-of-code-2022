const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n/})

const sensors = data.map( str => str.match(/\-?\d+/g).map(Number))
                    .map(([sx, sy, bx, by]) => ({ 
                        s: { x: sx, y: sy },
                        b: { x: bx, y: by },
                        max: Math.abs(bx - sx) + Math.abs(by - sy)
                    }))



function checkRowIntersection(row) {
    const points = sensors
                    .filter(({s, max}) => Math.abs(s.y - row) <= max)
                    .map(({ s, b, max }) => {
                        const x = max - Math.abs(s.y - row)
                        return { b, min: s.x - x, max: s.x + x }
                    })
                    .reduce((set, bRow) => {
                        for (let i = bRow.min; i <= bRow.max; i++) {
                            set.add(i)
                        }
                        return set
                    }, new Set())
    
    sensors.forEach(({ b }) => {
        if (b.y === row) {
            points.delete(b.x)
        }
    })

    return points

}

const result = checkRowIntersection(2000000)
// const result = checkRowIntersection(10)

console.log(result.size);
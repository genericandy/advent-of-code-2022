const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n\r\n/})

const Result = {
    VALID: -1,
    INVALID: 1,
    NEXT: 0
}

const sortedPairs = [...data, '[6]\r\n[2]']
    .map( str => str.split(/\r\n/).map(str => JSON.parse(str)))
    .flat()
    .sort(sortPairs)
    .map(JSON.stringify)

function flattenPairs([l, r], d) {
    const maxL = Math.max(l.length, r.length)
    let flatL = []
    let flatR = []
    for (let i = 0; i < maxL; i++) {
        const typeL = typeof l[i]
        const typeR = typeof r[i]
        if (typeL === 'number' && typeR === 'number') {
            flatL.push(l[i])
            flatR.push(r[i])
        } else {
            const subflat = flattenPairs([
                typeL === 'undefined' ? [-99 + d] : typeL === 'number' ? [l[i]] : l[i],
                typeR === 'undefined' ? [-99 + d] : typeR === 'number' ? [r[i]] : r[i],
            ], d + 1)
            
            flatL.push(...subflat[0])
            flatR.push(...subflat[1])
        }
    }
    return [flatL, flatR]
}

function comparePairs([l, r]) {
    return l.reduce((res, lv, i) => {
        if (res !== Result.NEXT) return res
        const rv = r[i]
        if (lv === rv) return Result.NEXT
        if (lv < rv) return Result.VALID
        if (rv < lv) return Result.INVALID
    }, Result.NEXT)
}

function sortPairs(a, b) {
    return comparePairs(flattenPairs([a, b], 0))
}

console.log((sortedPairs.indexOf('[6]') + 1) * (sortedPairs.indexOf('[2]') + 1))
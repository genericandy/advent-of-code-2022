const loadFile = require('../utils/loadFile')
// const src = './sampledata2.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n/})

const dirs = {
    U: { y: -1, x: 0},
    D: { y: 1, x: 0},
    R: { y: 0, x: 1},
    L: { y: 0, x: -1},
}

function getPrimeSteps(steps, step) {
    for (let i = 0; i < step.dist; i++) {
        const prev = steps.slice(-1)[0]
        const h = {
            x: prev.x + step.x,
            y: prev.y + step.y
        }
        steps.push(h)  
    }
    return steps         
}

function addFollower(newSteps, headStep, i) {
    if (i === 0) {
        return [headStep]
    }

    const prevStep = newSteps[i-1]

    const diff = {
        x: headStep.x - prevStep.x,
        y: headStep.y - prevStep.y
    }

    let nextStep = { ...prevStep }
        
    if (Math.abs(diff.x) >= 2) {
        nextStep.x += diff.x > 0 ? 1 : -1
        nextStep.y += Math.abs(diff.y) === 1 ? diff.y : 0
    }
    
    if (Math.abs(diff.y) >= 2) {
        nextStep.y += diff.y > 0 ? 1 : -1
        nextStep.x += Math.abs(diff.x) === 1 ? diff.x : 0
    }
    
    return [...newSteps, nextStep]
}

const result = data
    .map( str => ({ ...dirs[str.match(/\w/)[0]], dist: Number( /\d+/.exec(str))}))
    .reduce(getPrimeSteps, [{x: 0, y: 0}])
    .reduce(addFollower, [])
    .reduce(addFollower, [])
    .reduce(addFollower, [])
    .reduce(addFollower, [])
    .reduce(addFollower, [])
    .reduce(addFollower, [])
    .reduce(addFollower, [])
    .reduce(addFollower, [])
    .reduce(addFollower, [])
    .map(( pos => JSON.stringify(pos)))

// console.log(result);
console.log(new Set(result).size);


const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n\r\n/})

const execOperation = (op, val) => eval(op.replace(/x/g, val))

const monkeyList = data
    .map( str => str
        .split(/\r\n/g)
        .map(str => str.replace(/\s/g, ''))
        .map(str => str.match(/(old|\+|\*|\d+)/g))
    )
    .map(([_, items, operation, test, t, f]) => ({ 
            items: items.map(Number),
            operation: operation.join('').replace(/old/g, 'x'),
            test: Number(test[0]),
            t: Number(t[0]),
            f: Number(f[0]),
            inspected: 0
        })
    )


function processMonkey (monkey, _, monkeys) {
    monkey.inspected += monkey.items.length
    const items = monkey.items.map(item => (execOperation(monkey.operation, item) / 3) | 0)
    items.forEach(item => monkeys[item % monkey.test ? monkey.f : monkey.t].items.push(item));
    monkey.items = []
}

for (let i = 0; i < 20; i++) {
    monkeyList.forEach(processMonkey)
}

const sorted = monkeyList.sort((a,b) => b.inspected - a.inspected).map(({ inspected }) => inspected)
console.log(sorted[0] * sorted[1]);
const loadFile = require('../utils/loadFile')
// const src = './sampledata.txt'
const src = './data.txt'
const data = loadFile(src, { split: /\r\n/})

let curPath = ''

function updateFolderSize(folders, folder, size) {
    folder.size += size
    if (folder.parent !== '') {
        updateFolderSize(folders, folders.get(folder.parent), size)
    }
}

const allFolders = data
    .map( str => str.split(/\s/g))
    .reduce((folders, cmd) => {
        if (cmd[1] === 'cd') {
            if (cmd[2] === '/') {
                curPath = '/'
                if (!folders.has('/')) {
                    folders.set( '/', { size: 0, parent: '' })
                }
            } else if (cmd[2] === '..') {
                curPath = curPath.replace(/\/[^/]*$/, '')
            } else {
                folders.set(  curPath + '/' + cmd[2], { size: 0, parent: curPath })
                curPath += '/' + cmd[2]
            }
        }

        if (parseInt(cmd[0])) {
            updateFolderSize(folders, folders.get(curPath), +cmd[0])
        }
        
        return folders
    }, new Map())

const removal = Array.from(allFolders.values())
    .map(({ size }) => size)
    .sort((a, b) => a - b)
    .find(size => allFolders.get('/').size - size < 40000000)

console.log(removal);
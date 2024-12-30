
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY = 'codeBlockDB'
_createCodeBlock()
export const codeBlockService = {
    query,
    getById,
}


async function query() {
    var codeBlocks = await storageService.query(STORAGE_KEY)
    console.log(codeBlocks);

    return codeBlocks
}

function getById(codeBlockId) {
    return storageService.get(STORAGE_KEY, codeBlockId)
}

function _createCodeBlock() {
    let codeBlocks = utilService.loadFromStorage(STORAGE_KEY)
    if (!codeBlocks || !codeBlocks.length) {
        codeBlocks = [
            { _id: utilService.makeId(), subject: 'Loops' },
            { _id: utilService.makeId(), subject: 'Arrays' },
            { _id: utilService.makeId(), subject: 'Objects' },
            { _id: utilService.makeId(), subject: 'HTML5-ES6' },
            { _id: utilService.makeId(), subject: 'Promises' },
            { _id: utilService.makeId(), subject: 'Async await' },
        ]
        utilService.saveToStorage(STORAGE_KEY, codeBlocks)
    }
}







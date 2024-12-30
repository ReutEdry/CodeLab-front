
import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { userService } from './user.service'

const STORAGE_KEY = 'codeBlockDB'

export const codeBlockService = {
    query,
    getById,
}


async function query() {
    var codeBlocks = await storageService.query(STORAGE_KEY)
    return codeBlocks
}

function getById(codeBlockId) {
    return storageService.get(STORAGE_KEY, codeBlockId)
}









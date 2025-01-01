
// import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'


const STORAGE_KEY = 'block'

export const codeBlockService = {
    query,
    getById,
    // save,
    // remove,
    // getEmptyCar,
    // addCarMsg
}


async function query() {
    return httpService.get(STORAGE_KEY)
}

function getById(codeBlockId) {
    return httpService.get(`block/${codeBlockId}`)
}















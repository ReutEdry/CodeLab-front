
import axios from 'axios'
import { httpService } from './http.service'

const STORAGE_KEY = 'block'

export const codeBlockService = {
    query,
    getById,
}


async function query() {
    return httpService.get(STORAGE_KEY)
}

function getById(codeBlockId) {
    return httpService.get(`block/${codeBlockId}`)
}















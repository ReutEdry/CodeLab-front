import axios from 'axios'
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY = 'codeBlockDB'
_createCodeBlock()

export const codeBlockService = {
    query,
    getById,
    executeCode
}


async function query() {
    var codeBlocks = await storageService.query(STORAGE_KEY)
    return codeBlocks
}

function getById(codeBlockId) {
    return storageService.get(STORAGE_KEY, codeBlockId)
}


async function executeCode(outputCode) {

    // try {
    //     const response = await axios.get(" https://emkc.org/api/v2/piston/runtimes");
    //     console.log(response.data); // Log the data property of the response
    // } catch (error) {
    //     console.error("Error fetching data:", error.message); // Handle errors
    // }

    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
        "language": "js",
        "version": "18.15.0",
        "files": [
            {
                "content": outputCode
            }
        ]
    })
    return response.data.run.output
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







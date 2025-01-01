
// import { storageService } from './async-storage.service'
import axios from 'axios'
import { httpService } from './http.service'
import { utilService } from './util.service'


const STORAGE_KEY = 'block'

export const codeBlockService = {
    query,
    getById,
    executeCode
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

async function executeCode(outputCode) {

    if (!outputCode) return

    // 
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
    console.log(response);

    return response.data.run.output
}















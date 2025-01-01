import axios from "axios"

export async function executeCode(outputCode) {
    if (!outputCode) return
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
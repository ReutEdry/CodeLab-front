import { useState } from "react";
import { codeBlockService } from "../services/code-block.service.local";

export function Output({ output }) {

    const [blockResult, setBlockResult] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function runCode() {
        console.log(output);

        try {
            setIsLoading(true)
            const result = await codeBlockService.executeCode(output)
            setBlockResult(result)
        } catch (error) {
            console.log('Could not execute the code =>', error);
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <section>
            <p>Output</p>
            <button onClick={runCode}>Run Code:</button>
            {isLoading ? (
                <span class="loader"></span>
            ) : (
                <div>
                    {blockResult ? blockResult : 'Click run code button to see the result 😊'}
                </div>
            )}
        </section>
    )
}
import { useEffect } from "react"
import { useState } from "react"
import { codeBlockService } from "../services/code-block.service.local"
import { CodeBlockList } from "../cmps/CodeBlockList"

export function Lobby() {

    const [codeBlocks, setCodeBlocks] = useState(null)

    useEffect(() => {
        if (!codeBlocks) loadCodeBlocks()
    }, [])

    async function loadCodeBlocks() {
        try {
            const codeBlocks = await codeBlockService.query()
            setCodeBlocks(codeBlocks)
        } catch (error) {
            console.log('Can not load code blocks', error);

        }
    }

    if (!codeBlocks || !codeBlocks.length) return <div>loading</div>
    return (
        <section>
            <h1>Choose code block</h1>
            <CodeBlockList codeBlocks={codeBlocks} />
        </section >
    )
}

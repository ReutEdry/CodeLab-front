import { useEffect } from "react"
import { useState } from "react"
import { codeBlockService } from "../services/code-block.service.local"
import { CodeBlockList } from "../cmps/CodeBlockList"
import { svgs } from "../cmps/Svg"

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
        <section className="lobby-container">
            <header className="flex align-center ">
                <span>{svgs.lab}</span>
                <h1>Tom's Lab</h1>
            </header>
            <section className="blocks-container flex column">
                <h2>Choose code block and let's code together!</h2>
                <CodeBlockList codeBlocks={codeBlocks} />
            </section>
        </section >
    )
}

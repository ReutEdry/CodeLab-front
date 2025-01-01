import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { codeBlockService } from "../services/code-block.service";
import Editor, { loader } from '@monaco-editor/react'
import { Output } from "../cmps/Output";

export function CodeEditor() {

    const [block, setBlock] = useState(null)
    const [blockValue, setBlockValue] = useState('')
    const [blockResult, setBlockResult] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    let editorRef = useRef()
    const { blockId } = useParams()

    useEffect(() => {
        loadBlock()
    }, [blockId])

    async function loadBlock() {
        try {
            const block = await codeBlockService.getById(blockId)
            setBlock(block)
            // setBlockValue(block.quest)
        } catch (error) {
            console.log('Could not load code block', error);

        }
    }

    function onMount(editor) {
        editorRef.current = editor
        editorRef.current.focus()
    }

    async function runCode() {
        try {
            setIsLoading(true)
            const result = await codeBlockService.executeCode(blockValue)
            setBlockResult(result)
        } catch (error) {
            console.log('Could not execute the code =>', error);
        } finally {
            setIsLoading(false)
        }

    }

    function clearEditor() {
        editorRef.current.setValue(`/*\n${block.quest
            .split('\n')
            .map(line => line.trimStart())
            .join('\n')}\n*/`)
        // monaco.editor.getModels().forEach(model => model.setValue(`/*\n${block.quest
        //     .split('\n')
        //     .map(line => line.trimStart())
        //     .join('\n')}\n*/`))
    }

    if (!block) return <div>loading</div>
    return (
        <section className="editor-container">

            <div className="editor-header flex align-center">
                <h2>{block.subject}</h2>
                <div className="">
                    <p>Role: <span>Mentor</span></p>
                    <p>Currently in the room: <span>0</span> </p>
                </div>
            </div>

            <div className="editor-btn-aciton flex">
                <button className="clear" onClick={clearEditor}>Clear Editor</button>
                <button className="run" onClick={runCode}>Run Code:</button>
            </div>

            <div className="editor-display flex">
                <div className="editor-box">
                    <Editor
                        theme="vs-dark"
                        height='70vh'
                        width='60vw'
                        fontSize='20px'
                        defaultLanguage="javascript"
                        onChange={(value) => setBlockValue(value)}
                        value={`/*\n${block.quest
                            .split('\n')
                            .map(line => line.trimStart())
                            .join('\n')}\n*/`}
                        onMount={onMount}
                        options={{
                            fontSize: 22
                        }}
                    />
                </div>

                <div className="output-box">
                    <Output solution={block.solution} output={blockResult} isLoading={isLoading} />
                </div>

            </div>
        </section>
    )
}
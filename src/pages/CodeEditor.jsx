import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { codeBlockService } from "../services/code-block.service.local";
import Editor, { loader } from '@monaco-editor/react'
import { Output } from "../cmps/Output";

export function CodeEditor() {

    const [block, setBlock] = useState(null)
    const [blockValue, setBlockValue] = useState('')
    const [blockResult, setBlockResult] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // let editorRef = useRef().current
    const { blockId } = useParams()

    useEffect(() => {
        loadBlock()
    }, [blockId])

    async function loadBlock() {
        try {
            const block = await codeBlockService.getById(blockId)
            setBlock(block)
            setBlockValue(block.quest)
        } catch (error) {
            console.log('Could not load code block', error);

        }
    }

    function handleEditorChange(value, event) {
        setBlockValue(value)
    }

    function onMount(editor) {
        // editorRef = editor
        // editorRef.focus()
        editor.focus()
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

        // monaco.editor.getModel().setValue(`/*\n${block.quest
        //     .split('\n')
        //     .map(line => line.trimStart())
        //     .join('\n')}\n*/`)
        monaco.editor.getModels().forEach(model => model.setValue(`/*\n${block.quest
            .split('\n')
            .map(line => line.trimStart())
            .join('\n')}\n*/`))
    }

    if (!block) return <div>loading</div>
    return (
        <section className="editor-container">
            <div className="editor-header">
                <h2>{block.subject}</h2>
                <p>Role: <span>Mentor</span></p>
                <p>Currently in the room: <span>0</span> </p>
            </div>
            <div className="flex">
                <button onClick={runCode}>Run Code:</button>
                <button onClick={clearEditor}>Clear Editor</button>


                <div>
                    <Editor
                        theme="vs-dark"
                        height='80vh'
                        width='60vw'
                        defaultLanguage="javascript"
                        // defaultValue={`// ${blockValue}`}
                        onChange={handleEditorChange}
                        value={`/*\n${block.quest
                            .split('\n')
                            .map(line => line.trimStart())
                            .join('\n')}\n*/`}
                        onMount={onMount}
                    />
                </div>

                <div >
                    <p>Output</p>
                    <Output solution={block.solution} output={blockResult} isLoading={isLoading} />
                </div>

            </div>
        </section>
    )
}
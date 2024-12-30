import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { codeBlockService } from "../services/code-block.service.local";
import Editor, { loader } from '@monaco-editor/react'
import { Output } from "../cmps/Output";

export function CodeEditor() {

    const [block, setBlock] = useState(null)
    const [blockValue, setBlockValue] = useState('')
    let editorRef = useRef().current
    const { blockId } = useParams()

    useEffect(() => {
        loadBlock()
    }, [blockId])

    async function loadBlock() {
        try {
            const block = await codeBlockService.getById(blockId)
            setBlock(block)
        } catch (error) {
            console.log('Could not load code block', error);

        }
    }

    function handleEditorChange(value, event) {
        // here is the current value
        // console.log('handleEditorChange', value);
        setBlockValue(value)

    }

    function onMount(editor) {
        editorRef = editor
        editorRef.focus()
    }

    function handleEditorValidation(markers) {
        // model markers
        // markers.forEach(marker => console.log('onValidate:', marker.message));
    }

    if (!block) return <div>loading</div>
    return (
        <section className="editor-container">
            <div className="editor-header">
                <h2>{block.subject}</h2>
                <p>Role: <span>Mentor</span></p>
                <p>Currently in the room: <span>0</span> </p>
            </div>
            <div>

                <div>

                    <Editor
                        theme="vs-dark"
                        height='60vh'
                        width='70vw'
                        defaultLanguage="javascript"
                        defaultValue="// some comment"
                        onChange={handleEditorChange}
                        value={blockValue}
                        onMount={onMount}
                    // onValidate={handleEditorValidation}
                    />
                </div>

                <div>
                    <Output output={blockValue} />
                </div>

            </div>
        </section>
    )
}
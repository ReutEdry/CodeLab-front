import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { codeBlockService } from "../services/code-block.service";
import Editor from '@monaco-editor/react'
import { Output } from "../cmps/Output";
import { SOCKET_EMIT_LEAVE_BLOCK, SOCKET_EMIT_SET_BLOCK, SOCKET_EMIT_WRITE_CODE, SOCKET_EMIT_WRITE_OUTPUT, SOCKET_EVENT_ADD_CODE, SOCKET_EVENT_ADD_OUTPUT, SOCKET_EVENT_IS_MENTOR, SOCKET_EVENT_MENTOR_LEAVES, SOCKET_EVENT_USERS_COUNT, socketService } from "../services/socket-service";

export function CodeEditor() {

    const [block, setBlock] = useState(null)
    const [blockValue, setBlockValue] = useState('')
    const [blockResult, setBlockResult] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // states for sockets info
    const [isMentor, setIsMentor] = useState(false)
    const [connectedUsersCount, setConnectedUsersCount] = useState(false)

    let editorRef = useRef()
    const { blockId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!blockId) return
        loadBlock()

        // connect to socket here - evrytime i enetr a code block room
        socketService.setup()

        // assign to a specific block
        socketService.emit(SOCKET_EMIT_SET_BLOCK, blockId)

        // getting uses connected count
        socketService.on(SOCKET_EVENT_USERS_COUNT, usersCount => {
            setConnectedUsersCount(usersCount)
        })

        // is Mentor? 
        socketService.on(SOCKET_EVENT_IS_MENTOR, isMentor => {
            setIsMentor(isMentor)
        })

        // if mentor leaves
        socketService.on(SOCKET_EVENT_MENTOR_LEAVES, msg => {
            alert(msg)
            navigate('/')
        })

        // updated code
        socketService.on(SOCKET_EVENT_ADD_CODE, value => {
            setBlockValue(value)
        })

        // update output
        socketService.on(SOCKET_EVENT_ADD_OUTPUT, value => {
            setBlockResult(value)
        })


        return () => {
            socketService.emit(SOCKET_EMIT_LEAVE_BLOCK, blockId)

            socketService.off(SOCKET_EVENT_USERS_COUNT)
            socketService.off(SOCKET_EVENT_IS_MENTOR)
            socketService.off(SOCKET_EVENT_MENTOR_LEAVES)
            socketService.off(SOCKET_EVENT_ADD_CODE)
            socketService.off(SOCKET_EVENT_ADD_OUTPUT)

            socketService.terminate()
        }

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

    function onHandleEditorChange(value) {
        if (isMentor) return
        socketService.emit(SOCKET_EMIT_WRITE_CODE, value)
        setBlockValue(value)
    }

    function onMount(editor) {
        editorRef.current = editor
        editorRef.current.focus()
    }

    async function runCode() {
        try {
            setIsLoading(true)
            const result = await codeBlockService.executeCode(blockValue)
            socketService.emit(SOCKET_EMIT_WRITE_OUTPUT, result)
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


    if (!block) return <div className="loader page-loader"></div>
    return (
        <section className="editor-container">

            <div className="editor-header flex align-center">
                <h2>{block.subject}</h2>
                <div className="">
                    <p>Role: <span>{isMentor ? 'Mentor' : 'Student'}</span></p>
                    <p>Currently in the room: <span>{connectedUsersCount}</span> </p>
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
                        // height='70vh'
                        // width='60vw'
                        fontSize='18px'
                        defaultLanguage="javascript"
                        defaultValue={`/*\n${block.quest
                            .split('\n')
                            .map(line => line.trimStart())
                            .join('\n')}\n*/`}
                        onChange={onHandleEditorChange}
                        value={blockValue}
                        onMount={onMount}
                        options={{
                            fontSize: 16,
                            readOnly: isMentor
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
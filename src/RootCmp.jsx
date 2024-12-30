import React from 'react'
import { Routes, Route } from 'react-router'
import { Lobby } from './pages/Lobby'
import { CodeEditor } from './pages/CodeEditor'

export function RootCmp() {
    return (
        <div>
            <main>
                <Routes>
                    <Route path="/" element={<Lobby />} />
                    <Route path="/editor/:blockId" element={<CodeEditor />} />
                </Routes>
            </main>
        </div>
    )
}



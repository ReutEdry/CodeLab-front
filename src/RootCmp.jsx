import React from 'react'
import { Routes, Route } from 'react-router'
import { Lobby } from './pages/Lobby'
import { CodeBlockIndex } from './pages/CodeBlockIndex'

export function RootCmp() {
    return (
        <div>
            <main>
                <Routes>
                    <Route path="/" element={<Lobby />} />
                    <Route path="/blockCode/:blockId" element={<CodeBlockIndex />} />
                </Routes>
            </main>
        </div>
    )
}



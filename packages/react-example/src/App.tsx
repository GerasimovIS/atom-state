import { useState } from 'react';
import { useStore } from '@atom-state/react'
import { count as countStore, increment } from './count-store'
import { post as postStore, isPostLoading as isPostLoadingStore, fetchPostEffect } from './post-store'
import logo from './logo.svg'
import './App.css'

let id = 1

function App() {
  const count = useStore(countStore)
  const post = useStore(postStore)
  const isPostLoading = useStore(isPostLoadingStore)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => increment()}>
            count is: {count}
          </button>
        </p>
        <pre>{isPostLoading ? 'loading' : 'loaded'}</pre>
        <button type="button" onClick={() => fetchPostEffect(id++)}>Load</button>
        <div>{JSON.stringify(post)}</div>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App

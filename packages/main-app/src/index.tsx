// app entry
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'


function render () {
  const root = ReactDOM.createRoot(document.getElementById('app') as Element)
  root.render(
    <App />
  )
}

render()
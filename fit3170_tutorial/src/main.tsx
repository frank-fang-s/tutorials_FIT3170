import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Imports your calculator

// Find the div from Vite's vanilla index.html
const rootElement = document.getElementById('app')!

// Render the calculator inside it
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
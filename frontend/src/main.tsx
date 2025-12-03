// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { InteractionProvider } from './lib/interaction-context'

createRoot(document.getElementById('root')!).render(
  <InteractionProvider>
    <App />
  </InteractionProvider>
)

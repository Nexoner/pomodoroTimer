import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PomodoroContainer from './pages/PomodoroContainer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PomodoroContainer />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './styles/index.css'
import PomodoroContainer from './pages/PomodoroContainer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PomodoroContainer />
    </Provider>
  </StrictMode>,
)

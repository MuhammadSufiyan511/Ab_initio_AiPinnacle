import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { initI18n } from './i18n'
import App from './App.tsx'

async function bootstrap() {
  await initI18n()
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void bootstrap()

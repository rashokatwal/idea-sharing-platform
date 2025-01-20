import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './Styles/main.css';
import { LoadingBarContainer } from "react-top-loading-bar";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingBarContainer>
      <App />
    </LoadingBarContainer>
  </StrictMode>,
)

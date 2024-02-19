import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import axios from 'axios'
import { HelmetProvider } from 'react-helmet-async'
import { UserProvider } from './user.tsx'


axios.defaults.baseURL = 'http://localhost:3000'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </UserProvider>
  </React.StrictMode>,
)

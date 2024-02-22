import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import axios from 'axios'
import { HelmetProvider } from 'react-helmet-async'
import { UserProvider } from './user.tsx'

const baseURL=import.meta.env.VITE_BASE_URL ||'http://localhost:3000';
axios.defaults.baseURL = baseURL;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </UserProvider>
  </React.StrictMode>,
)

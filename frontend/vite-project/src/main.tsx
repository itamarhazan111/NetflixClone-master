import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import axios from 'axios'
import { HelmetProvider } from 'react-helmet-async'
import { UserProvider } from './Context/user.tsx'

const baseURL=import.meta.env.VITE_BASE_URL ||'http://localhost:3000';
axios.defaults.baseURL = baseURL;

ReactDOM.createRoot(document.getElementById('root')!).render(

    <UserProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </UserProvider>

)

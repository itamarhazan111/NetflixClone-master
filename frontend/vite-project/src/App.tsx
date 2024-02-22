import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import HomePage from './Pages/HomePage';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import MoviesPage from './Pages/MoviesPage';
import SeriesPage from './Pages/SeriesPage';

function App() {


  return (
    <BrowserRouter>
      <ToastContainer position='bottom-center' limit={1} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/series" element={<SeriesPage />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

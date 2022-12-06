import './App.css';
import HomePage from './pages/homepage/HomePage';
import Connexion from './pages/connexion/Connexion';
import Inscription from './pages/inscription/Inscription';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import {useState} from 'react';
import Header from './components/Header/Header';
import Test from './components/test/test'


function App() {

  const[isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'))

  if(!isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/connexion' element={<Connexion />} />
          <Route path='/inscription' element={<Inscription />} />
        </Routes>
      </BrowserRouter> 
    )
  } 

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/test' element={<Test />} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
   );   
}

export default App;

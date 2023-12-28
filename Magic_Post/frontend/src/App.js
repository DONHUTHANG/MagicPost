import React from 'react';
import Home from './pages/HomePage/HomePage';
// import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import './App.css';
import {ToastContainer} from "react-toastify";
// import Navbar from './components/Navbar/Navbar';
// import Services from './components/Services/Services';
// import Search from './components/Search/Search';
// import About from './components/About/About';
// import Support from './components/Support/Support';

function App() {
  return (
    <div className="App">
      <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<Home />} />
          <Route path='/services' element={<Home />} />
          <Route path='/search' element={<Home />} />
          <Route path='/support' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
      <ToastContainer />
      </>

    </div>
  );
}

export default App;

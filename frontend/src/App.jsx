import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home.jsx';
import Navbar from './Components/Navbar.jsx';
import Products from './Components/Products.jsx';
import RegisterPage from "./Components/RegisterPage";



import './App.css'
import Contact from './Components/Contacts.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
     <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App

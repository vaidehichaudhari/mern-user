import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/login';
import Register from './components/Register';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import ProductDetails from './pages/ProductDetails';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import {  Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails/> } />
        </Routes>
    </>
  )
}

export default App

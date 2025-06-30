import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
      <Header></Header>
      <Hero></Hero>
      <ProductGrid />
      <Footer></Footer>
    </div>
  )
}

export default Home;

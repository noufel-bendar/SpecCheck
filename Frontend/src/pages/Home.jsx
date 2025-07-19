import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import React, { useState } from 'react';


const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const scrollToFooter = () => {
  const element = document.getElementById("about-us");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
const scrollToShop = () => {
  const element = document.getElementById("shop-section");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
  return (
    <div className='home'>
      <Header onSearch={setSearchTerm}  onAboutClick={scrollToFooter} onShopClick={scrollToShop} ></Header>
      <Hero></Hero>
      <ProductGrid searchTerm={searchTerm} />
      <div id="about-us"></div>
      <Footer></Footer>
    </div>
  )
}

export default Home;

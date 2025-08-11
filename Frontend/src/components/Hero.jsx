import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from "../config";

function Hero() {
  const [products, setProducts] = useState([]);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    autoplaySpeed: 4000,
    autoplay: true,
    pauseOnHover: false,
    slidesToScroll: 1,
    cssEase: 'ease-in-out'
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });

    fetch(`${API_BASE_URL}/api/products/`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, []);

  return (
    <div className='pt-20 sm:pt-24 px-4 sm:px-8'>
      <div className='bg-opacity-90 p-4 sm:p-6 rounded-lg shadow-lg mb-6 min-h-[250px] sm:min-h-[320px] lg:min-h-[280px] bg-gradient-to-r from-indigo-200 to-blue-200'>
        <Slider {...settings}>
          {products.slice(0, 3).map((item) => (
            <div key={item.id} className='flex flex-col items-center justify-center text-center gap-4 sm:pl-3 pt-12 sm:pt-0 sm:text-left order-2 sm:order-1'>
              <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-8'>
                <div className='space-y-5 text-left sm:text-left' data-aos="fade-right">
                  <h1 className='text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight'>{item.title}</h1>
                  <h2 className='text-lg sm:text-xl text-gray-600'>{item.processor}</h2>
                  <h3 className='text-2xl sm:text-3xl font-semibold text-royal tracking-wide uppercase'>{item.model}</h3>
                  <Link to={`/product/${item.id}`}>
                    <button className='mt-20 px-6 py-3 bg-gradient-to-r from-blue-700 to-royal text-white rounded-full shadow-md hover:shadow-xl hover:brightness-110 transition-all duration-300'>
                      Explore Now
                    </button>
                  </Link>
                </div>

                <div className='order-1 sm:order-2 flex justify-center' data-aos="zoom-in">
                  <img
                    src={`${API_BASE_URL}${item.image}`}
                    alt={item.title}
                    className='w-[400px] h-[400px] sm:h-[450px] sm:scale-105 lg:scale-110 object-contain mx-auto drop-shadow-[-8px-4px-6px-rgba(0,0,0,.4)]'
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Hero;

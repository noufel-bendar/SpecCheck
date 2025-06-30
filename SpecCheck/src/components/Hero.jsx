import React, { useEffect } from 'react'
import Slider from "react-slick";
import AOS from 'aos';
import 'aos/dist/aos.css';

import Image1 from "../assets/images/lap/huaweiMate.png";
import Image2 from "../assets/images/lap/MacBookPro.png";
import Image3 from "../assets/images/lap/nitro.png";

const HeroData = [
  {
    id: 1,
    title: 'HUAWEI',
    title2: 'MateBook X Pro',
    img: Image1,
    subtitle: 'Your Next-Level Laptop Experience Starts Here',
  },
  {
    id: 2,
    title: 'ACER',
    title2: 'Nitro 5',
    img: Image3,
    subtitle: 'Unleash Your Gaming Potential with Nitro 5',
  },
  {
    id: 3,
    title: 'APPLE',
    title2: 'MacBook Pro',
    img: Image2,
    subtitle: 'Power Meets Elegance in Every Byte',
  }
];

function Hero() {
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

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className='pt-20 sm:pt-24 px-4 sm:px-8'>
      <div className='bg-opacity-90 p-4 sm:p-6 rounded-lg shadow-lg mb-6 min-h-[250px] sm:min-h-[320px] lg:min-h-[280px] bg-gradient-to-r from-indigo-200 to-blue-200'>
        <Slider {...settings}>
          {HeroData.map((item) => (
            <div key={item.id} className='flex flex-col items-center justify-center text-center gap-4 sm:pl-3 pt-12 sm:pt-0 sm:text-left order-2 sm:order-1'>
              <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-8'>

                {/* TEXT */}
                <div
                  className='space-y-5 text-left sm:text-left'
                  data-aos="fade-right"
                >
                  <h2 className='text-lg sm:text-xl text-gray-600'>{item.subtitle}</h2>
                  <h1 className='text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight'>{item.title}</h1>
                  <h3 className='text-3xl sm:text-4xl font-semibold text-royal tracking-wide uppercase'>{item.title2}</h3>
                  <button className='mt-4 px-6 py-3 bg-gradient-to-r from-blue-700 to-royal text-white rounded-full shadow-md hover:shadow-xl hover:brightness-110 transition-all duration-300'>
                    Explore Now
                  </button>
                </div>

                {/* IMAGE */}
                <div
                  className='order-1 sm:order-2 flex justify-center'
                  data-aos="zoom-in"
                >
                  <img
                    src={item.img}
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

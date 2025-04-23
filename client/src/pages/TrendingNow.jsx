import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';  
import 'swiper/css'; 
import luckyBasler from "../assets/lucky-baskhar.jpg"
import stranger1 from "../assets/stranger-things-sm.png"
import magaraja from "../assets/maharaja.jpg" 
import houornytwo from "../assets/journey-2.jpeg" 
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const TrendingNow = () => {
  const swiperRef = useRef(null);  

  const slidesData = [
    {
      id: 1,
      image: luckyBasler,
      alt: 'Movie 1',
      recentlyAdded: true
    },
    {
      id: 2,
      image: stranger1,
      alt: 'Movie 2',
      recentlyAdded: true
    },
    {
      id: 3,
      image: magaraja,
      alt: 'Movie 3',
      recentlyAdded: true
    },
    {
      id: 4,
      image: houornytwo,
      alt: 'Movie 4',
      recentlyAdded: true
    },
    {
      id: 5,
      image: stranger1,
      alt: 'Movie 5',
      recentlyAdded: true
    },
    {
      id: 6,
      image: luckyBasler,
      alt: 'Movie 6',
      recentlyAdded: true
    },
    {
      id: 7,
      image: houornytwo,
      alt: 'Movie 7',
      recentlyAdded: true
    },
    {
      id: 8,
      image: magaraja,
      alt: 'Movie 8',
      recentlyAdded: true
    },
    {
      id: 9,
      image: stranger1,
      alt: 'Movie 9',
      recentlyAdded: true
    },
    {
      id: 10,
      image: luckyBasler,
      alt: 'Movie 10',
      recentlyAdded: true
    }
  ];

  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goToPrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="w-full h-64 flex items-center pe-10">
      {/* Previous Button */}
      <div 
        onClick={goToPrevSlide} 
        className="bg-gray-900 h-full w-10 flex items-center justify-center text-white cursor-pointer"
      >
        <MdKeyboardArrowLeft size={24} />
      </div>

      {/* Swiper */}
      <div className="flex-grow w-full h-full">
        <Swiper
          ref={swiperRef}
          spaceBetween={10} // Adjust space between slides
          breakpoints={{
            320: { // For mobile screens
              slidesPerView: 1,
            },
            490: { // For small tablets
                slidesPerView: 2,
              },
            640: { // For small tablets
              slidesPerView: 3,
            },
            768: { // For tablets
              slidesPerView: 4,

            },
            1024: { // For desktop
              slidesPerView: 4,
            },
            1280: { // For large screens
              slidesPerView: 6,
            }
          }}
          className="w-full h-full"
        >
          {slidesData.map(({ id, image, alt, recentlyAdded }) => (
            <SwiperSlide
              key={id}
              className="relative p-2 flex flex-col items-center justify-start"
            >
              {/* Image */}
              <div className="w-full h-full flex items-center justify-center">
                <img
                  className="w-full h-full object-cover rounded-md sm:w-5/5  md:w-3/4 lg:w-2/2"
                  src={image}
                  alt={alt}
                />
              </div>

            
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Next Button */}
      <div 
        onClick={goToNextSlide} 
        className="bg-gray-900 h-full w-10 flex items-center justify-center text-white cursor-pointer"
      >
        <MdKeyboardArrowRight size={24} />
      </div>
    </div>
  );
};

export default TrendingNow;

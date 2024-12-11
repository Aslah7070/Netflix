
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';  
import 'swiper/css'; 

const SouthIndian = () => {
    const swiperRef = useRef(null);  

    const slidesData = [
      {
        id: 1,
        image: 'https://lumiere-a.akamaihd.net/v1/images/alladin_600x450_moviespg_mobile_7_d097b99b.jpeg?region=0,0,600,450',
        alt: 'Movie 1'
      },
      {
        id: 2,
        image: 'https://lumiere-a.akamaihd.net/v1/images/alladin_600x450_moviespg_mobile_7_d097b99b.jpeg?region=0,0,600,450',
        alt: 'Movie 2'
      },
      {
        id: 3,
        image: 'https://lumiere-a.akamaihd.net/v1/images/alladin_600x450_moviespg_mobile_7_d097b99b.jpeg?region=0,0,600,450',
        alt: 'Movie 3'
      },
      {
        id: 4,
        image: 'https://lumiere-a.akamaihd.net/v1/images/alladin_600x450_moviespg_mobile_7_d097b99b.jpeg?region=0,0,600,450',
        alt: 'Movie 4'
      },
      {
        id: 5,
        image: 'https://lumiere-a.akamaihd.net/v1/images/alladin_600x450_moviespg_mobile_7_d097b99b.jpeg?region=0,0,600,450',
        alt: 'Movie 5'
      },
      {
        id: 6,
        image: 'https://lumiere-a.akamaihd.net/v1/images/alladin_600x450_moviespg_mobile_7_d097b99b.jpeg?region=0,0,600,450',
        alt: 'Movie 6'
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
      <div className="relative w-full h-48">
        <Swiper
          ref={swiperRef}  
          spaceBetween={0}      
          slidesPerView={4}     
          onSlideChange={() => console.log('slide change')} 
          onSwiper={(swiper) => console.log(swiper)}         
          className="w-full h-full"
        >
          {slidesData.map(({ id, image, alt }) => (
            <SwiperSlide key={id} className="p-0 m-0">
              <img 
                className="w-full h-full object-cover"
                src={image} 
                alt={alt} 
              />
            </SwiperSlide>
          ))}
        </Swiper>
  
      
        <button 
          onClick={goToPrevSlide} 
          className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-3xl bg-transparent border-none cursor-pointer z-20"
        >
          ←
        </button>
  
        
        <button 
          onClick={goToNextSlide} 
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-3xl bg-transparent border-none cursor-pointer z-20"
        >
          →
        </button>
      </div>
    );
  
}

export default SouthIndian

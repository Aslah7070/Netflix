import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HindiMovies = () => {
  const movies = useSelector((state) => state.movies.movies) || [];
  const Hindi = movies.filter((movie) => movie.language === "Hindi");
const navigate=useNavigate()
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="relative mx-auto mt-10 w-full px-6 z--10">
      <h2 className="text-start text-2xl font-semibold text-white mb-4">
        Hindi Movies
      </h2>

      {/* Slider Component */}
      <Slider {...settings}>
        {Hindi.map((movie) => (
          <div key={movie._id} className="p-2">
            <div className="rounded-lg h-32 overflow-hidden relative cursor-pointer transition-transform transform ease-in-out"
            onClick={()=> navigate(`/movieplayer/${movie._id}`)}
            >
              {/* Always display the movie thumbnail */}
              <img
                src={movie.thumbnailUrl}
                alt={movie.title || "Movie Thumbnail"}
                className="w-full h-40 object-cover rounded-lg"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-lg font-semibold">
                  {movie.title || "Untitled"}
                </h3>
                <p className="text-gray-400 text-sm">
                  {movie.duration || "N/A"} • {movie.genre.join(", ")}
                </p>
                <div className="flex gap-2 mt-2">
                  <button className="bg-white text-black p-2 rounded-full">
                    <FaPlay />
                  </button>
                  <button className="bg-gray-600 text-white p-2 rounded-full">
                    <FaPlus />
                  </button>
                  <button className="bg-gray-600 text-white p-2 rounded-full">
                    <FaThumbsUp />
                  </button>
                  <button className="bg-gray-600 text-white p-2 rounded-full">
                    <FaChevronDown />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HindiMovies;

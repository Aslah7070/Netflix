import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../../axiosInstance/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [hoveredShow, setHoveredShow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const response = await api.get("/allshows");
        setTvShows(response.data.shows);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    };
    fetchTvShows();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const navigateToEpisode = (episodeID) => {
    navigate(`/tvplayer/${episodeID}`);
  };

  return (
    <div className="relative mx-auto mt-10 w-full px-6">
      <h2 className="text-start text-2xl font-semibold text-white mb-4">
        TV Shows
      </h2>

      <Slider {...settings}>
        {tvShows.map((show) => (
          <div key={show._id} className="p-2">
            <h1 className="text-white text-lg font-semibold mb-2">
              {show.title}
            </h1>
            <div
              className="rounded-lg h-32 overflow-hidden relative cursor-pointer"
              onMouseEnter={() => setHoveredShow(show._id)}
              onMouseLeave={() => setHoveredShow(null)}
            >
              <img
                src={show.seasons[0]?.episodes[0]?.thumbnailUrl || ""}
                alt={show.title || "Show Thumbnail"}
                className="w-full h-40 object-cover rounded-lg"
                loading="lazy"
              />
              {hoveredShow === show._id && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                  <h3 className="text-white text-lg font-semibold">
                    {show.title}
                  </h3>
                  <div>
                    {show.seasons?.map((season) => (
                      <div key={season._id} className="mt-2">
                        <h5 className="text-white text-sm font-semibold">
                          Season {season.seasonNumber}
                        </h5>
                        <ul className="text-white text-xs list-disc ml-5">
                          {season.episodes?.map((episode) => (
                            <li
                              key={episode.episodeNumber}
                              className="cursor-pointer hover:underline"
                              onClick={() => navigateToEpisode(episode._id)}
                            >
                              Episode {episode.episodeNumber}: {episode.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TVShows;

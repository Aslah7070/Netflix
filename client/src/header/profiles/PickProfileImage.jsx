




import React, { useEffect, useRef, useState } from "react";
import api from "../../axiosInstance/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { setProfileUrl } from "../../redux/profile.slice";

const PickProfileImage = () => {
  const [profileIcons, setProfileIcons] = useState([]);
  const { profileId } = useParams();
  const [selectedProfile, setSelectedProfile] = useState("");
  const navigate=useNavigate()
  const location = useLocation()
  
  const previousLocation = useRef(location.pathname); 
  console.log("previousLocation",previousLocation);
  
  
  
   const dispatch=useDispatch()
  const findProfile = async () => {
    try {
      const response = await api.get(`/fidPprofilebyid/${profileId}`);
      console.log("Profile Data:", response.data.pro);
      setSelectedProfile(response.data.pro);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    findProfile();
    dispatch(setProfileUrl(""))
  }, [profileId]);

  // Fetch profile icons
  const fetchProfileIcons = async () => {
    try {
      const response = await api.get("/getProfileIcons");
      setProfileIcons(response.data.profileicons);
    } catch (error) {
      console.error("Error fetching profile icons:", error);
    }
  };

  useEffect(() => {
    fetchProfileIcons();
  }, []);

  // Slider settings for React Slick
  const sliderSettings = {
    dots: true, // Add navigation dots
    infinite: false, // Infinite scrolling
    speed: 500,
    slidesToShow: 9, // Number of slides to show at a time
    slidesToScroll: 1,
    arrows: true,
    responsive: [
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


  const handleProfileImage=(image)=>{
   
    dispatch(setProfileUrl(image))
    navigate(`/editprofile/${profileId}`)
  }
  

  return (
    <div className="w-full px-4 py-8 bg-gray-300  flex flex-col items-center justify-center">
      <div className="w-3/4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Choose a Profile Icon
      </h1>
      <span className="text-2xl ">For {selectedProfile.name}</span>

      {profileIcons.length > 0 ? (
        profileIcons.map((category) => (
          <div key={category._id} className="mb-8 w-full">
            {/* Category Title */}
            <h2 className="text-3xl font-semibold mb-4 text-gray-700 capitalize">
              {category.name}
            </h2>

            {/* Image Slider */}
            <Slider {...sliderSettings}>
              {category.profileImages.map((imageUrl, index) => (
                <div
                onClick={()=>handleProfileImage(imageUrl)}
                  key={index}
                  className="px-2"
                >
                  <img
                    src={imageUrl}
                    alt={`${category.name}-${index}`}
                    className="w-full h-36 object-cover rounded-md shadow-md"
                  />
                </div>
              ))}
            </Slider>
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-600 text-center">Loading icons...</p>
      )}
      </div>
    </div>
  );
};

export default PickProfileImage;

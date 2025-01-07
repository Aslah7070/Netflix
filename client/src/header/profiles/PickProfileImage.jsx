import React, { useEffect, useState } from "react";
import api from "../../axiosInstance/api";
import { useParams } from "react-router-dom";

const PickProfileImage = () => {
  const [profileIcons, setProfileIcons] = useState([]);

  const {profileId}=useParams()
    
  const [selectedProfile,setSelectedProfile]=useState("")

const findProfile=async()=>{

    const response=await api.get(`/fidPprofilebyid/${profileId}`)
    console.log("responseddddddddddddddddd",response.data.pro);
    setSelectedProfile(response.data.pro)
  }
  useEffect(()=>{
    findProfile()
  },[profileId])
  // Fetch profile icons from API
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

  return (
    <div className="  w-3/4 px-4 py-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Choose a Profile Icon
      </h1>
      <span>For {selectedProfile.name}</span>

      {profileIcons.length > 0 ? (
        profileIcons.map((category) => (
          <div key={category._id} className="mb-8 w-full">
            {/* Category Title */}
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 capitalize">
              {category.name}
            </h2>

            {/* Image Slider */}
            <div className="flex overflow-x-scroll space-x-4 scrollbar-hide">
              {category.profileImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className="min-w-[150px] max-w-[150px] flex-shrink-0 text-center"
                >
                  <img
                    src={imageUrl}
                    alt={`${category.name}-${index}`}
                    className="w-full h-36 object-cover rounded-md shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-600 text-center">Loading icons...</p>
      )}
    </div>
  );
};

export default PickProfileImage;

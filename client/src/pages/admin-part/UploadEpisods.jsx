import React, { useState } from "react";
import axios from "axios";
import api from "../../axiosInstance/api";

const UploadEpisodeForm = ({ tvShowId }) => {
  const [seasonNumber, setSeasonNumber] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [airDate, setAirDate] = useState("");
  const [durationOfEpisode, setDurationOfEpisode] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "videoFile") {
      setVideoFile(files[0]);
    } else if (name === "imageFile") {
      setImageFile(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("seasonNumber", seasonNumber);
    formData.append("episodeNumber", episodeNumber);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("airDate", airDate);
    formData.append("durationOfEpisode", durationOfEpisode);

    if (videoFile) formData.append("videoFile", videoFile); // Correct key name
    if (imageFile) formData.append("imageFile", imageFile);

    // Debugging FormData
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    try {
        const response = await api.post("/tvshowseasonuploading/676c0700cc56dd188b40694a", formData);
        setMessage(response.data.message);
        console.log("Response:", response);
    } catch (error) {
        console.error("Upload error:", error.response || error.message);
        setMessage("An error occurred while uploading the episode.");
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Upload Episode</h2>

      {message && <div className="mb-4 text-center text-red-600">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="seasonNumber">
            Season Number
          </label>
          <input
            type="number"
            id="seasonNumber"
            name="seasonNumber"
            value={seasonNumber}
            onChange={(e) => setSeasonNumber(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="episodeNumber">
            Episode Number
          </label>
          <input
            type="number"
            id="episodeNumber"
            name="episodeNumber"
            value={episodeNumber}
            onChange={(e) => setEpisodeNumber(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="title">
            Episode Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="description">
            Episode Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="duration">
            Episode Duration (in minutes)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="airDate">
            Air Date
          </label>
          <input
            type="date"
            id="airDate"
            name="airDate"
            value={airDate}
            onChange={(e) => setAirDate(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="durationOfEpisode">
            Duration of Episode (in minutes)
          </label>
          <input
            type="number"
            id="durationOfEpisode"
            name="durationOfEpisode"
            value={durationOfEpisode}
            onChange={(e) => setDurationOfEpisode(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="videoFile">
            Video File
          </label>
          <input
            type="file"
            id="videoFile"
            name="videoFile"
            onChange={handleFileChange}
            className="mt-2 w-full"
            accept="video/*"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="thumbnailFile">
            Thumbnail File
          </label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            onChange={handleFileChange}
            className="mt-2 w-full"
            accept="image/*"
            required
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Episode"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadEpisodeForm;

import React, { useState } from "react";
import axios from "axios";

const UploadEpisodesForm = ({ tvShowId }) => {
  const [seasonNumber, setSeasonNumber] = useState("");
  const [episodes, setEpisodes] = useState([
    {
      episodeNumber: "",
      title: "",
      description: "",
      duration: "",
      airDate: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  ]);

  const handleEpisodeChange = (index, field, value) => {
    const updatedEpisodes = [...episodes];
    updatedEpisodes[index][field] = value;
    setEpisodes(updatedEpisodes);
  };

  const addEpisode = () => {
    setEpisodes([
      ...episodes,
      {
        episodeNumber: "",
        title: "",
        description: "",
        duration: "",
        airDate: "",
        videoUrl: "",
        thumbnailUrl: "",
      },
    ]);
  };

  const removeEpisode = (index) => {
    const updatedEpisodes = episodes.filter((_, i) => i !== index);
    setEpisodes(updatedEpisodes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/tvshow/${tvShowId}/episodes`, // Adjust the endpoint as needed
        {
          seasonNumber: parseInt(seasonNumber),
          episodes,
        }
      );
      alert(response.data.message);
      setSeasonNumber("");
      setEpisodes([
        {
          episodeNumber: "",
          title: "",
          description: "",
          duration: "",
          airDate: "",
          videoUrl: "",
          thumbnailUrl: "",
        },
      ]);
    } catch (error) {
      alert("Error uploading episodes");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Upload Episodes for TV Show</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Season Number</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded"
            value={seasonNumber}
            onChange={(e) => setSeasonNumber(e.target.value)}
            required
          />
        </div>

        {episodes.map((episode, index) => (
          <div key={index} className="mb-4 border-b py-4">
            <h3 className="font-medium text-lg">Episode {index + 1}</h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Episode Number</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded"
                value={episode.episodeNumber}
                onChange={(e) =>
                  handleEpisodeChange(index, "episodeNumber", e.target.value)
                }
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={episode.title}
                onChange={(e) => handleEpisodeChange(index, "title", e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded"
                value={episode.description}
                onChange={(e) =>
                  handleEpisodeChange(index, "description", e.target.value)
                }
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Duration (min)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded"
                value={episode.duration}
                onChange={(e) =>
                  handleEpisodeChange(index, "duration", e.target.value)
                }
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Air Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded"
                value={episode.airDate}
                onChange={(e) =>
                  handleEpisodeChange(index, "airDate", e.target.value)
                }
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Video URL</label>
              <input
                type="url"
                className="w-full px-3 py-2 border rounded"
                value={episode.videoUrl}
                onChange={(e) =>
                  handleEpisodeChange(index, "videoUrl", e.target.value)
                }
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Thumbnail URL</label>
              <input
                type="url"
                className="w-full px-3 py-2 border rounded"
                value={episode.thumbnailUrl}
                onChange={(e) =>
                  handleEpisodeChange(index, "thumbnailUrl", e.target.value)
                }
                required
              />
            </div>

            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => removeEpisode(index)}
            >
              Remove Episode
            </button>
          </div>
        ))}

        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          onClick={addEpisode}
        >
          Add Episode
        </button>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-4"
        >
          Upload Episodes
        </button>
      </form>
    </div>
  );
};

export default UploadEpisodesForm;

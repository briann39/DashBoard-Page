import React, { useContext, useState } from "react";
import "./style.css";
import { YoutubeId } from "../../contexts/videoContext";

export const Searchmusic = () => {
  const [videos, setVideos] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const apiKey = process.env.REACT_APP_YT_API_KEY;
  const [id, setId] = useContext(YoutubeId);

  const search = async (query) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=25&key=${apiKey}`
      );
      const data = await res.json();
      setVideos(data.items);
      setSearchInput("");
      console.log(data.items);
    } catch (e) {
      console.log(e);
    }
  };

  const updateVideo = (videoId) => {
    setId(videoId);
  };

  return (
    <div className="gadget-search-music">
      <p className="title-gadget">Buscar Cancion</p>
      <form className="form-search-music" action={() => search(searchInput)}>
        <input
          placeholder="Buscar canción..."
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" onClick={() => search(searchInput)}>
          Buscar
        </button>
      </form>
      <ul>
        {videos.map((e) => {
          return (
            <li
              key={e.id.videoId}
              onClick={() => updateVideo(e.id.videoId)}
              className="video-item"
            >
              <img src={e.snippet.thumbnails.high.url} alt="" />
              <div className="description-video">
                <h3>{e.snippet.title}</h3>
                <p>{e.snippet.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

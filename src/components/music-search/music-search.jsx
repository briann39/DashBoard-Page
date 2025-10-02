import React, { useContext, useState } from "react";
import "./style.css";
import { YoutubeId, Playlists } from "../../contexts/videoContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faListUl,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

export const Searchmusic = () => {
  const [videos, setVideos] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const apiKey = process.env.REACT_APP_YT_API_KEY;
  const [id, setId] = useContext(YoutubeId);

  const [playlist, setPlaylist] = useContext(Playlists);

  const search = async (query, e) => {
    e.preventDefault();
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

  const addToPlaylist = (playlistindex, newitem) => {
    setPlaylist((prev) =>
      prev.map((pl, i) =>
        i === playlistindex ? { ...pl, list: [...pl.list, newitem] } : pl
      )
    );
    console.log(playlist);
  };

  const updateVideo = (videoId) => {
    setId(videoId);
  };

  return (
    <div className="gadget-search-music">
      <p className="title-gadget">Buscar Cancion</p>
      <form
        className="form-search-music"
        onSubmit={(e) => search(searchInput, e)}
      >
        <input
          placeholder="Buscar canción..."
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Buscar</button>
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
                <button
                  onClick={() => addToPlaylist(0, e)}
                  className="add-to-playlist"
                >
                  <FontAwesomeIcon icon={faCirclePlus} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <ul>
        {playlist.map((o, i) => (
          <div key={i}>
            <h3>{o.name}</h3>
            <ul>
              {o.list.map((e, j) => {
                return (
                  <li
                    key={j}
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
        ))}
      </ul>
    </div>
  );
};

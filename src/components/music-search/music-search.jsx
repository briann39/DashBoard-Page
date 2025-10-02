import React, { useContext, useState } from "react";
import "./style.css";
import { YoutubeId, Playlists } from "../../contexts/videoContext";

import Select, { components } from "react-select";

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

  const [selected, setSelected] = useState("");
  const [playlist, setPlaylist] = useContext(Playlists);

  const [searchActive, setSearchActive] = useState(true);

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

  const recVideotoPlaylist = () => {};

  const addToPlaylist = (playlistName, newitem) => {
    setPlaylist((prev) =>
      prev.map((pl, i) => {
        return pl.value === playlistName
          ? { ...pl, list: [...pl.list, newitem] }
          : pl;
      })
    );
    console.log(playlist);
  };

  const updateVideo = (videoId) => {
    setId(videoId);
  };

  return (
    <div className="gadget-search-music">
      <p className="title-gadget">Videos y Playlists</p>
      <div className="buttons-container">
        <button
          className={`button-menu ${searchActive ? "active" : ""}`}
          onClick={() => setSearchActive(true)}
        >
          Buscador
        </button>
        <button
          className={`button-menu ${!searchActive ? "active" : ""}`}
          onClick={() => setSearchActive(false)}
        >
          Playlists
        </button>
      </div>
      <form
        style={{ display: searchActive ? "flex" : "none" }}
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
      {videos.length > 0 ? (
        <ul style={{ display: searchActive ? "block" : "none" }}>
          {videos.map((e) => {
            return (
              <div className="video-container">
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
                <Select
                  isSearchable={false}
                  menuPlacement="bottom"
                  menuPosition="fixed"
                  styles={{
                    control: (base) => ({
                      ...base,
                      width: "fit-content", // control angosto
                      backgroundColor: "var(--bg)",
                      margin: "0.5rem",
                      padding: "0 5px",
                      border: "solid 1px var(--muted)",
                    }),
                    menu: (base) => ({
                      ...base,
                      width: "10rem", // menú más ancho
                      backgroundColor: "var(--bg)",
                      border: "solid 1px var(--muted)",
                      borderRadius: "0.5rem",
                      marginTop: "0.5rem",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "var(--text-high)",
                      fontFamily: "var(--font-title)",
                      fontWeight: "500",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      boxContent: "border-box",
                      backgroundColor: state.isFocused
                        ? "var(--primary-700)"
                        : state.isSelected
                        ? "var(--Primary)"
                        : "transparent",
                      color: state.isSelected
                        ? "var(--bg-eleved)"
                        : "var(--text-high)",
                      fontFamily: "var(--font-text)",
                    }),
                  }}
                  value={null}
                  placeholder="+"
                  classNamePrefix="myselect"
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  // el value debe ser el objeto con { value, label }
                  onChange={(selected) => addToPlaylist(selected.value, e)}
                  options={playlist} // lista de opciones />
                />
              </div>
            );
          })}
        </ul>
      ) : (
        <p
          style={{ display: searchActive ? "flex" : "none" }}
          className="label-notSearch"
        >
          Busca un video...
        </p>
      )}

      <ul style={{ display: searchActive ? "none" : "block" }}>
        <Select
          sx={{ width: 200 }}
          styles={{
            control: (base) => ({
              ...base,
              boxSizing: "border-box",

              width: "10rem", // control angosto
              minWidth: "10rem",
              maxWidth: "10rem",
              backgroundColor: "var(--bg)",
              border: "solid 1px var(--muted)",
            }),
            menu: (base) => ({
              ...base,
              width: "10rem", // menú más ancho
              backgroundColor: "var(--bg)",
              border: "solid 1px var(--muted)",
              borderRadius: "0.5rem",
              marginTop: "0.5rem",
            }),
            singleValue: (provided) => ({
              ...provided,
              maxWidth: "100%", // no permite que se salga del control
              overflow: "hidden",
              textOverflow: "ellipsis", // corta con "..."
              whiteSpace: "nowrap",
              color: "var(--text-high)",
              fontFamily: "var(--font-title)",
              fontWeight: "500",
            }),
            option: (provided, state) => ({
              ...provided,
              boxContent: "border-box",
              backgroundColor: state.isFocused
                ? "var(--primary-700)"
                : state.isSelected
                ? "var(--Primary)"
                : "transparent",
              color: state.isSelected ? "var(--bg-eleved)" : "var(--text-high)",
              fontFamily: "var(--font-text)",
            }),
          }}
          classNamePrefix="myselect"
          value={selected} // opción seleccionada
          onChange={(e) => {
            console.log(e);
            if (e.value === "add") {
              console.log("hola");
            } else {
              setSelected(e);
            }
          }} // se llama al cambiar
          options={playlist} // lista de opciones
        />

        {playlist.map((o, i) => {
          if (o === selected)
            return (
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
            );
        })}
      </ul>
    </div>
  );
};

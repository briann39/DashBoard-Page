import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { Playlists, YoutubeId } from "../../contexts/videoContext";
import Select from "react-select";

export const MusicController = () => {
  const [player, setPlayer] = useState(null);
  const [id, setId] = useContext(YoutubeId);
  const [playlist, setPlaylist] = useContext(Playlists);
  const [pauseVideo, setPauseVideo] = useState(false);
  const [videoIds, setVideoIds] = useState([]);

  useEffect(() => {
    // cargar el script de la API si no existe
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    // cuando la API está lista
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player("ytplayer", {
        height: "300",
        width: "300",
        playerVars: {
          playsinline: 1,
          autoplay: 0,
          playlist: videoIds.join(","), // 👈 carga la playlist de IDs
        },
        events: {
          onReady: () => console.log("Player listo"),
        },
      });
      setPlayer(newPlayer);
    };
  }, [videoIds]);

  const togglePause = () => {
    if (!player) return;
    if (pauseVideo) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setPauseVideo((prev) => !prev);
  };

  const runPlaylist = (playlistValue) => {
    // Encontrar la playlist seleccionada
    const selectedPlaylist = playlist.find((pl) => pl.value === playlistValue);

    // Sacar los IDs de esa playlist
    const ids = selectedPlaylist
      ? selectedPlaylist.list.map((e) => e.id.videoId)
      : [];

    // Guardar en el estado
    setVideoIds(ids);

    // Si el player ya existe, cargar la nueva playlist
    if (player && ids.length > 0) {
      player.loadPlaylist(ids);
    }
  };

  // cuando cambia el id, cargamos ese video puntual
  useEffect(() => {
    if (player && id) {
      player.loadVideoById(id);
      setPauseVideo(true);
    }
  }, [id, player]);

  return (
    <div className="gadget-music-controller">
      <div className="video" id="ytplayer"></div>
      <div className="buttons-controller">
        <p className="title-gadget">Musica</p>
        <button onClick={togglePause}>{pauseVideo ? "⏸" : "▶"}</button>

        <button onClick={() => player && player.stopVideo()}>⏹ Stop</button>
        <Select
          options={playlist}
          styles={{
            control: (base) => ({
              ...base,
              width: "10rem", // control angosto
              backgroundColor: "var(--bg)",
              margin: "0.5rem",
              textOverflow: "ellipsis",
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
              color: state.isSelected ? "var(--bg-eleved)" : "var(--text-high)",
              fontFamily: "var(--font-text)",
            }),
          }}
          onChange={(selected) => runPlaylist(selected.value)}
        />
      </div>
    </div>
  );
};

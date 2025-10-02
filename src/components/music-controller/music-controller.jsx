import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { Playlists, YoutubeId } from "../../contexts/videoContext";

export const MusicController = () => {
  const [player, setPlayer] = useState(null);
  const [id, setId] = useContext(YoutubeId);
  const [playlist, setPlaylist] = useContext(Playlists);
  const [pauseVideo, setPauseVideo] = useState(false);

  // Extraemos solo los IDs de la playlist
  const videoIds = playlist[0]?.list.map((e) => e.id.videoId) || [];

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

  const runPlaylist = () => {
    player.loadPlaylist(videoIds);
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
        <button onClick={runPlaylist}>PlayList</button>
        <button onClick={() => player && player.stopVideo()}>⏹ Stop</button>
      </div>
    </div>
  );
};

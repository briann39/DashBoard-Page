import React, { useContext, useEffect, useState } from "react";

import "./style.css";
import { YoutubeId } from "../../contexts/videoContext";

export const MusicController = ({ videoId }) => {
  const [player, setPlayer] = useState(null);
  const [id, setId] = useContext(YoutubeId);

  useEffect(() => {
    // cargar el script de la API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    if (window.YT) return;
    // cuando la API está lista
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player("ytplayer", {
        height: "300",
        width: "300",
        /*playerVars: {
          listType: "playlist",
          list: "RDVbqv6yH9JVo", // 👈 la playlist
        }*/
        videoId: id || "Zmd_KO2Lric",
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: () => console.log("Player listo"),
        },
      });
      setPlayer(newPlayer);
    };
  }, []);

  useEffect(() => {
    if (player && id) {
      player.loadVideoById(id);
    }
  }, [id, player]);

  return (
    <div className="gadget-music-controller">
      <div className="video" id="ytplayer"></div>
      <div className="buttons-controller">
        <p className="title-gadget">Musica</p>

        <button onClick={() => player && player.playVideo()}>▶ Play</button>
        <button onClick={() => player && player.pauseVideo()}>⏸ Pause</button>
        <button onClick={() => player && player.stopVideo()}>⏹ Stop</button>
      </div>
    </div>
  );
};

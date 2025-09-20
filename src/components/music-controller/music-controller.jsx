import React, { useEffect, useState } from "react";

import "./style.css";

export const MusicController = ({ videoId }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // cargar el script de la API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    // cuando la API está lista
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player("ytplayer", {
        height: "300",
        width: "300",
        playerVars: {
          listType: "playlist",
          list: "RDVbqv6yH9JVo", // 👈 la playlist
        },
        events: {
          onReady: () => console.log("Player listo"),
        },
      });
      setPlayer(newPlayer);
    };
  }, []);

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

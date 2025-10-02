import { useState, createContext, useEffect } from "react";

export const YoutubeId = createContext();

export const YoutubeIdProvider = ({ children }) => {
  const [id, setId] = useState(null);

  console.log(id);
  return (
    <YoutubeId.Provider value={[id, setId]}>{children}</YoutubeId.Provider>
  );
};

export const Playlists = createContext();

export const PlaylistsProvider = ({ children }) => {
  const [Playlist, setPlaylist] = useState([
    {
      value: "Mi mix",
      label: "Mi mix",
      list: [],
    },
    {
      value: "Musica",
      label: "Musica",
      list: [],
    },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("Playlists");
    if (saved) {
      setPlaylist(JSON.parse(saved));
    }
  }, []);
  // guardar cada vez que cambie Playlist
  useEffect(() => {
    localStorage.setItem("Playlists", JSON.stringify(Playlist));
  }, [Playlist]);
  return (
    <Playlists.Provider value={[Playlist, setPlaylist]}>
      {children}
    </Playlists.Provider>
  );
};

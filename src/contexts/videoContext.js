import { useState, createContext } from "react";

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
      name: "Mi mix",
      list: [
        {
          kind: "youtube#searchResult",
          etag: "3LbMUGzsQi9bARzAYJIVLeOYZ_M",
          id: {
            kind: "youtube#video",
            videoId: "Zmd_KO2Lric",
          },
          snippet: {
            publishedAt: "2025-06-26T23:00:23Z",
            channelId: "UCRI7hheejBbWS6etTNwMT0g",
            title: "Anuel AA - Little Demon (Video Oficial)",
            description:
              "Real Hasta La Muerte X Siempre Blessd https://youtu.be/icuTFvt0vOY?si=u2jaAEm-N-l-L1Es -------------- Nuevo ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/Zmd_KO2Lric/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/Zmd_KO2Lric/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/Zmd_KO2Lric/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Anuel AA",
            liveBroadcastContent: "none",
            publishTime: "2025-06-26T23:00:23Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "YbQ8RoAD8TEKtEleL6QO_WdoLpo",
          id: {
            kind: "youtube#video",
            videoId: "icuTFvt0vOY",
          },
          snippet: {
            publishedAt: "2025-08-22T00:00:03Z",
            channelId: "UCRI7hheejBbWS6etTNwMT0g",
            title: "ANUEL AA ❌ BLESSD | PORTATE BONITO",
            description:
              "Real Hasta La Muerte X Siempre Blessd La Doble A y el Bendito te Escribieron a Ti LETRA ANUEL AA ❌ BLESSD ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/icuTFvt0vOY/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/icuTFvt0vOY/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/icuTFvt0vOY/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Anuel AA",
            liveBroadcastContent: "none",
            publishTime: "2025-08-22T00:00:03Z",
          },
        },
        {
          kind: "youtube#searchResult",
          etag: "3LbMUGzsQi9bARzAYJIVLeOYZ_M",
          id: {
            kind: "youtube#video",
            videoId: "Zmd_KO2Lric",
          },
          snippet: {
            publishedAt: "2025-06-26T23:00:23Z",
            channelId: "UCRI7hheejBbWS6etTNwMT0g",
            title: "Anuel AA - Little Demon (Video Oficial)",
            description:
              "Real Hasta La Muerte X Siempre Blessd https://youtu.be/icuTFvt0vOY?si=u2jaAEm-N-l-L1Es -------------- Nuevo ...",
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/Zmd_KO2Lric/default.jpg",
                width: 120,
                height: 90,
              },
              medium: {
                url: "https://i.ytimg.com/vi/Zmd_KO2Lric/mqdefault.jpg",
                width: 320,
                height: 180,
              },
              high: {
                url: "https://i.ytimg.com/vi/Zmd_KO2Lric/hqdefault.jpg",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "Anuel AA",
            liveBroadcastContent: "none",
            publishTime: "2025-06-26T23:00:23Z",
          },
        },
      ],
    },
  ]);

  console.log(Playlist);
  return (
    <Playlists.Provider value={[Playlist, setPlaylist]}>
      {children}
    </Playlists.Provider>
  );
};

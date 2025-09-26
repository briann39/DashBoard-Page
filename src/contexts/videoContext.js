import { useState, createContext } from "react";

export const YoutubeId = createContext();

export const YoutubeIdProvider = ({ children }) => {
  const [id, setId] = useState(null);
  console.log(id);
  return (
    <YoutubeId.Provider value={[id, setId]}>{children}</YoutubeId.Provider>
  );
};

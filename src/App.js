import React from "react";
import "./App.css";

import { Clock } from "./components/reloj/clock";
import { MusicController } from "./components/musicController/musicController.jsx";
import { ToDoList } from "./components/toDoList/toDo.jsx";
import { Searchmusic } from "./components/musicSearch/musicSearch.jsx";
import { MiniChatBot } from "./components/miniChatBot/chatBot.jsx";

const App = () => {
  return (
    <div className="app">
      <div className="pomodoro">
        <Clock />
      </div>
      <div className="mini-chat-bot">
        <MiniChatBot />
      </div>
      <div className="music-controller">
        <MusicController />
      </div>
      <div className="tasks">
        <ToDoList />
      </div>
      <div className="search-music">
        <Searchmusic />
      </div>
    </div>
  );
};

export default App;

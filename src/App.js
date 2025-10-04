import React from "react";
import "./App.css";

import { Clock } from "./components/reloj/clock";
import { MusicController } from "./components/music-controller/music-controller.jsx";
import { ToDoList } from "./components/todolist/todolist.jsx";
import { Searchmusic } from "./components/music-search/music-search.jsx";
import { MiniChatBot } from "./components/miniChatBot/mini-chatbot.jsx";

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

import logo from "./logo.svg";
import "./App.css";
import { Clock } from "./components/reloj/clock";
import { MusicController } from "./components/music-controller/music-controller.jsx";
import { ToDoList } from "./components/todolist/todolist.jsx";

function App() {
  return (
    <div className="app">
      <div className="pomodoro">
        <Clock />
      </div>
      <div className="music-controller">
        <MusicController />
      </div>
      <div className="tasks">
        <ToDoList />
      </div>
    </div>
  );
}

export default App;

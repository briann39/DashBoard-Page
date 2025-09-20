import logo from "./logo.svg";
import "./App.css";
import { Clock } from "./components/reloj/clock";

function App() {
  return (
    <div className="app">
      <Clock className="pomodoro" />
    </div>
  );
}

export default App;

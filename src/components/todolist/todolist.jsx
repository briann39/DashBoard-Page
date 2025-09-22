import React, { use, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./style.css";

export const ToDoList = () => {
  const [task, setTask] = useState([
    { id: 1, task: "Mirar Youtube", checked: false },
    { id: 2, task: "Mirar Peliculas", checked: true },
  ]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput !== "") {
      setTask([...task, { id: task.length + 1, task: taskInput }]);
      console.log(task);
      setTaskInput("");
    }
  };

  return (
    <div className="gadget-todolist">
      <p className="title-gadget">Tareas</p>
      <ul>
        {task.map((e) => (
          <li id={e.id} className="task">
            <input type="checkbox" checked={e.checked} />
            {e.task}{" "}
            <button>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
      <div className="task-input">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={addTask}>Agregar</button>
      </div>
    </div>
  );
};

import React, { use, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./style.css";

export const ToDoList = () => {
  const [task, setTask] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput !== "") {
      setTask([...task, { id: task.length + 1, task: taskInput }]);
      console.log(task);
      setTaskInput("");
    }
  };

  const removeTask = (id) => {
    console.log(id);
    setTask(task.filter((e) => e.id !== id));
  };

  const checkTask = (id) => {
    setTask(task.map((e) => (e.id === id ? { ...e, done: !e.done } : e)));
    console.log(task);
  };

  const emptyTask = () => {};

  return (
    <div className="gadget-todolist">
      <p className="title-gadget">Tareas</p>
      {task.length > 0 ? (
        <ul>
          {task.map((e) => (
            <li key={e.id} className={`task  ${e.done ? "done" : ""}`}>
              <div>
                <input
                  type="checkbox"
                  checked={e.done}
                  onChange={() => checkTask(e.id)}
                />
                {e.task}{" "}
              </div>
              <button onClick={() => removeTask(e.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="tasks-empty">
          <h3>No hay Tareas</h3>
        </ul>
      )}
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

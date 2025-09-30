import React, { use, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./style.css";

export const ToDoList = () => {
  const [task, setTask] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("Tasks");
    if (saved) {
      setTask(JSON.parse(saved));
    }
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (taskInput !== "") {
      const newTask = [...task, { id: task.length + 1, content: taskInput }];
      setTask(newTask);
      localStorage.setItem("Tasks", JSON.stringify(newTask));
      console.log(task);
      setTaskInput("");
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  const removeTask = (id) => {
    console.log(id);

    const deleteTask = task.filter((e) => e.id !== id);
    setTask(deleteTask);
    localStorage.setItem("Tasks", JSON.stringify(deleteTask));
  };

  const checkTask = (id) => {
    setTask(task.map((e) => (e.id === id ? { ...e, done: !e.done } : e)));
    console.log(task);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="gadget-todolist">
        <p className="title-gadget">Tareas</p>
        {task.length > 0 ? (
          <Droppable droppableId="tasks" direction="vertical">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {task.map(({ id, content, done }, index) => (
                  <Draggable key={id} draggableId={id.toString()} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`task ${done ? "done" : ""}`}
                      >
                        <div>
                          <input
                            type="checkbox"
                            checked={done}
                            onChange={() => checkTask(id)}
                          />
                          {content}
                        </div>
                        <button onClick={() => removeTask(id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
            )}
          </Droppable>
        ) : (
          <ul className="tasks-empty">
            <h3>No hay Tareas</h3>
          </ul>
        )}
        <form onSubmit={addTask} className="task-input">
          <input
            placeholder="Escribe una nueva tarea..."
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button type="submit">Agregar</button>
        </form>
      </div>
    </DragDropContext>
  );
};

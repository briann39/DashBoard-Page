import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Select, { components } from "react-select";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./style.css";

export const ToDoList = () => {
  const [task, setTask] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [cats, setCats] = useState([
    { value: "trabajo", label: "Trabajo", color: "#FF5733" },
    { value: "personal", label: "Personal", color: "#33C3FF" },
    { value: "add", label: "Agregar...", color: "white" },
  ]);
  const [selected, setSelected] = useState("");

  const [showCategory, setShowCategory] = useState(false);
  const [color, setColor] = useState("");
  const [nameCat, setNameCat] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("Tasks");
    if (saved) {
      setTask(JSON.parse(saved));
    }

    const savedCategory = localStorage.getItem("Categorys");
    if (savedCategory) {
      setCats(JSON.parse(savedCategory));
    }
  }, []);

  const sortedOptions = [
    ...cats.filter((o) => o.value !== "add"),
    ...cats.filter((o) => o.value === "add"),
  ];

  const addCategory = () => {
    if (nameCat !== "" && color !== "") {
      const categorys = [
        ...cats,
        { value: nameCat, label: nameCat, color: color },
      ];

      setCats(categorys);
      setShowCategory(false);
      localStorage.setItem("Categorys", JSON.stringify(categorys));
    }
  };

  const Option = (props) => (
    <components.Option {...props}>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: 20,
            height: 20,
            backgroundColor: props.data.color,
            borderRadius: "4px",
            marginRight: 8,
          }}
        />
        {props.data.label}
      </div>
    </components.Option>
  );

  const SingleValue = (props) => (
    <components.SingleValue {...props}>
      <div
        style={{
          width: 20,
          height: 20,
          backgroundColor: props.data.color,
          borderRadius: "4px",
        }}
      />
    </components.SingleValue>
  );

  const CustomPlaceholder = (props) => {
    return (
      <components.Placeholder {...props}>
        <div
          style={{
            width: 20,
            height: 20,
            backgroundColor: "var(--bg-eleved)",
            borderRadius: "4px",
            marginRight: 8,
          }}
        />
      </components.Placeholder>
    );
  };

  const addTask = (e) => {
    e.preventDefault();
    console.log(selected);
    if (taskInput !== "") {
      const newTask = [
        ...task,
        { id: task.length + 1, content: taskInput, category: selected.value },
      ];
      setTask(newTask);
      localStorage.setItem("Tasks", JSON.stringify(newTask));
      console.log(task);
      setTaskInput("");
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(task);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTask(items);
    localStorage.setItem("Tasks", JSON.stringify(items));
  };

  const removeTask = (id) => {
    console.log(id);

    const deleteTask = task.filter((e) => e.id !== id);
    setTask(deleteTask);
    localStorage.setItem("Tasks", JSON.stringify(deleteTask));
  };

  const checkTask = (id) => {
    const tasks = task.map((e) => (e.id === id ? { ...e, done: !e.done } : e));

    setTask(tasks);
    localStorage.setItem("Tasks", JSON.stringify(tasks));

    console.log(task);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="gadget-todolist">
        <p className="title-gadget">Tareas</p>
        <div
          className="add-category"
          style={{ display: showCategory ? "flex" : "none" }}
        >
          <input
            onChange={(e) => setColor(e.target.value)}
            value={color}
            type="color"
            name="color"
            id=""
          />
          <input
            className="input-text"
            onChange={(e) => setNameCat(e.target.value)}
            value={nameCat}
            type="text"
            name=""
            id=""
          />
          <button onClick={(e) => addCategory()}>Agregar</button>
        </div>
        {task.length > 0 ? (
          <Droppable droppableId="tasks" direction="vertical">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {task.map(({ id, content, done, category }, index) => (
                  <Draggable key={id} draggableId={id.toString()} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`task ${done ? "done" : ""}`}
                      >
                        <div>
                          {cats.map((e) => {
                            if (e.value === category)
                              return (
                                <div
                                  className="color-category"
                                  key={index}
                                  style={{
                                    backgroundColor: e.color, // suponiendo que cada cat tiene .color
                                  }}
                                />
                              );
                          })}
                          <input
                            type="checkbox"
                            checked={done}
                            onChange={() => checkTask(id)}
                          />
                          {content}
                        </div>
                        <div>
                          <button onClick={() => removeTask(id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          {/* Drag handle */}
                          <span
                            {...provided.dragHandleProps}
                            className="drag-handle"
                          >
                            ☰
                          </span>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
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
          <div className="button-cont">
            <Select
              components={{
                SingleValue,
                Option,
                Placeholder: CustomPlaceholder,
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  width: "5rem", // control angosto
                  backgroundColor: "var(--bg)",
                  border: "solid 1px var(--muted)",
                }),
                menu: (base) => ({
                  ...base,
                  width: "10rem", // menú más ancho
                  backgroundColor: "var(--bg)",
                  border: "solid 1px var(--muted)",
                  borderRadius: "0.5rem",
                  marginTop: "0.5rem",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "var(--text-high)",
                  fontFamily: "var(--font-title)",
                  fontWeight: "500",
                }),
                option: (provided, state) => ({
                  ...provided,
                  boxContent: "border-box",
                  backgroundColor: state.isFocused
                    ? "var(--primary-700)"
                    : state.isSelected
                    ? "var(--Primary)"
                    : "transparent",
                  color: state.isSelected
                    ? "var(--bg-eleved)"
                    : "var(--text-high)",
                  fontFamily: "var(--font-text)",
                }),
              }}
              classNamePrefix="myselect"
              value={selected} // opción seleccionada
              onChange={(e) => {
                console.log(e);
                if (e.value === "add") {
                  console.log("hola");
                  setShowCategory(true);
                } else {
                  setSelected(e);
                }
              }} // se llama al cambiar
              menuPlacement="top"
              options={sortedOptions} // lista de opciones
            />

            <button type="submit">Agregar</button>
          </div>
        </form>
      </div>
    </DragDropContext>
  );
};

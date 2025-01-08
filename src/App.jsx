import React from "react";
import Input from "./Components/Input";
import Button from "./Components/Button";
import { useState } from "react";
import Task from "./Components/Task";
import { appStyle, inputStyle } from "./Styles/style";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div style={appStyle}>
      <h1>Todo List</h1>
      <form onSubmit={addTask}>

        <div>
          <Input
            type="text"
            style={inputStyle}
            placeholder="Add a task"
            handleOnChange={(e) => setNewTask(e.target.value)}
          />
          <Button type="submit" text=">>" />
        </div>
      </form>
      <div
        style={{
          gap: "1em",
          
          borderRadius: "15px",
        }}
      >
        {tasks.map((task, index) => {
          return (
            <Task
              key={index}
              index={index}
              task={task}
              completeTask={completeTask}
              removeTask={removeTask}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
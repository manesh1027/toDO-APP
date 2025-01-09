import React from "react";
import Input from "./Components/Input";
import Button from "./Components/Button";
import { useState } from "react";
import Task from "./Components/Task";
import { appStyle, inputStyle } from "./Styles/style";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [visibleTasks, setVisibleTasks] = useState(5);
  const [showAll, setShowAll] = useState(false);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, { text: newTask, completed: false }];
        setVisibleTasks(5);
        setShowAll(false);
        return updatedTasks;
      });
      setNewTask("");
    }
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((_, i) => i !== index);
      return updatedTasks;
    });
  };

  const toggleShowTasks = () => {
    if (showAll) {
      setVisibleTasks(5);
    } else {
      setVisibleTasks(tasks.length);
    }
    setShowAll(!showAll);
  };

  return (
    <div style={appStyle}>
      <h1>
        Todo List <i className="fas fa-check"></i>

      </h1>
      <form onSubmit={addTask}>
        <div>
          <Input
            type="text"
            style={inputStyle}
            placeholder="Add a task"
            value={newTask}
            handleOnChange={(e) => setNewTask(e.target.value)}
          />
          <Button type="submit" text=">>"/>
        </div>
      </form>
      <div
        style={{
          gap: "1em",
          borderRadius: "15px",
        }}
      >
        {tasks.slice(0, visibleTasks).map((task, index) => {
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
      {tasks.length > 5 && (
        <Button
          onClick={toggleShowTasks}
          text={showAll ? "Show Less" : "Show More"}
        />
      )}
    </div>
  );
};

export default App;
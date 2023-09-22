import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import Title from "./components/Title";
import "./css/main.css";

const App = () => {
  const [fetchedTodData, setFetchedTodData] = useState([]);
  const [todoArray, setTodoArray] = useState([{}]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchedData();
  }, [todoArray]);

  const fetchedData = () => {
    fetch("/getTodos")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFetchedTodData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/createTodo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todos: inputValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTodoArray(data);
      });
    setInputValue("");
  };

  const handleDeleteTodo = (id) => {
    fetch(`/deleteTodos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTodoArray(data);
      })
      .catch((err) => {
        console.log(err);
      });

    // const newTodos = todoArray.filter((todo) => todo._id !== id);
    // setTodoArray(newTodos);
  };

  return (
    <>
      <div className="app">
        <div className="todolist">
          <Title myName="Yes" />
          <Form
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSubmit={handleSubmit}
          />
          {fetchedTodData.map((todo, index) => (
            <Todo
              todo={todo}
              index={index}
              handleDeleteTodo={handleDeleteTodo}
              key={todo.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;

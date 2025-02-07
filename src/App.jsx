import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";
const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [currentEditingId, setCurrentEditingId] = useState(null);

  let isDisabled = todo.trim().length < 1;

  // let isDisabled=false;
  // if(isDisabled<todo.trim().length<1){
  //     isDisabled=true;
  // }else{
  //    isDisabled=false;
  // }

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };


  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    saveToLS();
  };

  const handleEdit = (e, id) => {
    let newTodo = todos.find((item) => item.id === id);
    if (!newTodo) return;

    if (currentEditingId && currentEditingId !== id) {
      const confirmSwitch = window.confirm(
        "You have unsaved changes. Do you want to save before switching?"
      );

      if (confirmSwitch) {
        setTodos((prevTodos) => {
          return prevTodos.map((item) =>
            item.id === currentEditingId ? { ...item, todo } : item
          );
        });
        saveToLS();
      } else {
        return; // Stay on the same todo if cancel is pressed
      }
    }

    setTodo(newTodo.todo);
    setCurrentEditingId(id);
  };

  const handleDelete = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />

      <div className="md:container mx-1/5 sm:mx-auto md:mx-auto rounded-xl text-center m-10 p-5 min-h-[80vh] w-4/5 sm:w-3/5 md:w-10/15 bg-violet-100 ">
        <div className="addTodo flex flex-col gap-4 my-5">
          <h2 className="text-lg mt-2pt-3 font-bold ">Add Todos</h2>
          <input
            onChange={handleChange}
            value={todo}
            className="bg-white w-full  rounded-lg p-3"
            type="text"
            placeholder="Enter a todo item"
          />
          <button
            onClick={handleAdd}
            disabled={isDisabled}
            className="bg-violet-500 disabled:bg-gray-800 hover:bg-violet-800 text-white font-bold rounded-md p-2 mx-6"
          >
            {isDisabled ? "Disabled" : "Add"}
          </button>
        </div>

        {/* <input onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished */}
        <h2 className="text-xl my-3 font-bold">Your Todos</h2>
        <div className="todos space-y-2">
          {todos.length === 0 && (
            <div className="m-5">No todos to Dispaly!</div>
          )}
          {todos.map((item) => (
            <div
              key={item.id}
              className="todo flex justify-between items-center  text-center md:w-3/4 md:mx-auto w-full p-2 bg-white rounded-md shadow-md"
            >
              <div className="flex w-1/2  gap-5">
                {/* Checkbox */}
                <div className="flex gap-5">
                  <input
                    onChange={handleCheckBox}
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id}
                    className="checkbox ml-2 h-3 my-auto "
                  />

                  {/* Todo Text */}
                  <span
                    className={`p-2 text-md ${
                      item.isCompleted ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {item.todo}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="buttons flex">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="bg-green-500 hover:bg-green-800 text-white font-bold rounded-md px-4 py-2"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    handleDelete(e, item.id);
                  }}
                  className="bg-red-500 hover:bg-red-700 ml-3 text-white font-bold rounded-md px-4 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;

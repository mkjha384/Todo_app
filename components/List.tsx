import { useState } from "react";
import { Todoinput } from "./Todoinput";
import { Todoitems } from "./Todoitems";
import { Button } from "~/components/ui/button";

export const List = () => {
  // Data Base
  const [todos, setTodos] = useState<Todo>([]);
  const [currentList, setCurrentList] = useState<Filtertype>("all");

  const todoAdd = (text) => {
    const addTodo = {
      id: crypto.randomUUID(),
      text,
      status: "active",
      checked: false,
    };
    setTodos([addTodo, ...todos]);
  };
  // show the length of todolist
  const countActive = todos.filter((todo) => !todo.checked).length;
  const countComplete = todos.filter((todo) => todo.checked).length;

  const todoList =
    currentList === "complete"
      ? todos.filter((list) => list.status === "complete")
      : currentList === "active"
        ? todos.filter((list) => list.status === "active")
        : todos;

  // Checkebox
  const toggleCheck = (list) => {
    const checkToggle = todos.map((todo) => {
      if (list.id === todo.id) {
        list.status = todo.status === "active" ? "complete" : "active";
        list.checked = !todo.checked;
      }
      return todo;
    });

    setTodos(checkToggle);
  };
  // delete todo
  const removeToggle = (todo) => {
    setTodos(todos.filter((list) => todo.id !== list.id));
  };
  // clear the complete todos..
  const clearBtn = () => {
    const clearComplete = todos.filter((list) => list.checked)
      ? todos.filter((list) => !list.checked)
      : todos;

    setTodos(clearComplete);
  };

  const filterItem = (tabStatus) => {
    setCurrentList(tabStatus);
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex justify-center mx-auto p-1">
        <img
          className="w-8 h-8 md:w-12 md:h-12 mx-2 rounded-full"
          src="https://i.pinimg.com/736x/26/4f/93/264f9360a20c950288e38f9aef4d7aa6.jpg"
          alt="right mark logo"
        />
        <h1 className="text-3xl md:text-5xl text-center font-semibold text-white">
          Todo App
        </h1>
      </div>
      <p className="text-center text-gray-100 text-sm md:text-lg my-2 mb-5">
        Organize your tasks and stay productive
      </p>
      {/* Input section */}
      <Todoinput onAdd={todoAdd} />
      {/* Status btns.. */}
      <div className="w-full md:w-[45%]  mx-auto my-2 p-1 flex justify-start items-center">
        <Button
          onClick={() => filterItem("all")}
          className={`px-3  text-md font-medium cursor-pointer ${
            currentList === "all"
              ? "bg-green-500 text-white hover:bg-green-500"
              : "bg-white text-gray-900 hover:bg-gray-50"
          }`}
        >
          All
        </Button>
        <Button
          onClick={() => filterItem("active")}
          className={`px-3 mx-2 text-md font-medium cursor-pointer ${
            currentList === "active"
              ? "bg-green-500 text-white hover:bg-green-500"
              : "bg-white text-gray-900 hover:bg-gray-50"
          }`}
        >
          {countActive} Active
        </Button>
        <Button
          onClick={() => filterItem("complete")}
          className={`px-3 mx-2 text-md font-medium cursor-pointer ${
            currentList === "complete"
              ? "bg-green-500 text-white hover:bg-green-500"
              : "bg-white text-gray-900 hover:bg-gray-50"
          }`}
        >
          {countComplete} Complete
        </Button>
      </div>
      {/* Data displaying.... */}
      <div className="space-y-2">
        <div className="flex flex-col justify-center items-center">
          {todoList.length === 0 ? (
            <div className="w-full md:w-[45%] text-center py-12 bg-white rounded-lg border border-gray-200">
              <img
                className="w-30 h-30 flex justify-center mx-auto"
                src="https://i.pinimg.com/736x/1c/de/81/1cde818933dfbed5b0b69d09efabed41.jpg"
                alt="empty png"
              />
              <p className="text-red-500 text-center text-lg font-mono font-medium p-2">
                {currentList === "all"
                  ? "No task yet, please add one above"
                  : currentList === "active"
                    ? "No active task yet"
                    : "No complete task yet"}
              </p>
            </div>
          ) : (
            todoList.map((todo) => (
              <Todoitems
                key={todo.id}
                todo={todo}
                Togglebtn={toggleCheck}
                Removebtn={removeToggle}
              />
            ))
          )}
        </div>
      </div>

      <div className="flex justify-end items-end mx-auto w-full sm:w-[45%]">
        <button
          onClick={clearBtn}
          type="button"
          className="text-sm text-red-500 hover:text-red-700 font-medium font-sans"
        >
          Clear Complete
        </button>
      </div>
    </div>
  );
};

import { useState } from "react";
import { Input } from "./Input";
import { TodoList } from "./TodoList";

type Filtertype = "all" | "active" | "complete";

type Todo = {
  id: string;
  text: string;
  status: string;
  inputCheck: boolean;
};

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentStatus, setCurrentStatus] = useState<Filtertype>("all");

  const addTodo = (text: string) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      status: "active",
      inputCheck: false,
    };

    setTodos([newTodo, ...todos]);
  };

  const checkedToggle = (list: Todo) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === list.id) {
        list.status = list.status === "complete" ? "active" : "complete";
        list.inputCheck = !list.inputCheck;
      }
      return todo;
    });
    console.log("updateTodos", updateTodos);
    setTodos(updateTodos);
  };

  // Remove the element from the list using Todo Id
  const deleteTodo = (todo: Todo) => {
    setTodos(todos.filter((list) => list.id !== todo.id));
  };

  //  delete the completed todo..
  const clearTodo = () => {
    const trashTodo = todos.filter((todo) => todo.inputCheck)
      ? todos.filter((todo) => !todo.inputCheck)
      : todos;
    setTodos(trashTodo);
  };

  // show the todo list
  const todosList =
    currentStatus === "all"
      ? todos
      : currentStatus === "active"
        ? todos.filter((list) => list.status === currentStatus)
        : currentStatus === "complete"
          ? todos.filter((list) => list.status === currentStatus)
          : [];

  // status count which is active or complete
  const activeCount = todos.filter((todo) => !todo.inputCheck).length;
  const completeCount = todos.filter((todo) => todo.inputCheck).length;

  return (
    <div>
      <div className="grid justify-center items-center mx-auto p-5">
        {/* Heading */}
        <h1 className="text-center text-white text-3xl font-semibold">
          Todo App
        </h1>
        <h2 className="text-center text-gray-300 text-sm font-medium my-2">
          Organize your tasks and stay productive
        </h2>
      </div>
      <Input OnAdd={addTodo} />

      <div className="w-[80%] md:w-[37%] mx-auto   flex justify-start items-center my-2 p-1">
        <h2 className="text-gray-400 text-sm font-medium">
          {activeCount} active,{" "}
        </h2>
        <h2 className="text-gray-400 text-sm font-medium">
          {completeCount} completed{" "}
        </h2>
      </div>

      <div className="w-[80%] md:w-[40%] mx-auto   flex justify-start items-center my-2 p-1">
        {/* Button For active */}
        <button
          onClick={() => setCurrentStatus("all")}
          type="button"
          className={`text-md max-w-fit  px-3 mx-2 rounded-md ${currentStatus === "all" ? "bg-green-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}`}
        >
          All
        </button>
        <button
          onClick={() => setCurrentStatus("active")}
          type="button"
          className={`text-md max-w-fit  px-3 mx-2 rounded-md ${currentStatus === "active" ? "bg-green-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}`}
        >
          Active
        </button>
        <button
          onClick={() => setCurrentStatus("complete")}
          type="button"
          className={`text-md max-w-fit  px-3 mx-2 rounded-md ${currentStatus === "complete" ? "bg-green-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}`}
        >
          Completed
        </button>
      </div>

      {/* Displaying Data */}
      <div className="space-y-2">
        {todosList?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">
              {currentStatus === "complete"
                ? "No completed tasks yet"
                : currentStatus === "active"
                  ? "No active tasks"
                  : "No tasks yet. Add one above!"}
            </p>
          </div>
        ) : (
          todosList?.map((todo: any) => (
            <TodoList
              key={todo.id}
              todo={todo}
              onToggle={checkedToggle}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>

      {/* clearing the task */}
      <div className="w-[80%] md:w-[40%] mx-auto my-2 p-2 flex justify-end items-ends">
        {
          <button
            onClick={clearTodo}
            type="button"
            className="text-red-500 text-sm hover:text-red-600"
          >
            Clear Completed
          </button>
        }
      </div>
    </div>
  );
};

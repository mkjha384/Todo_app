export interface Todos {
  id: string;
  text: string;
  status: string;
  checked: boolean;
}

interface Todotypes {
  todo: Todos;
  Togglebtn: (todo: Todos) => void;
  Removebtn: (todo: Todos) => void;
}

export const Todoitems = ({ todo, Togglebtn, Removebtn }: Todotypes) => {
  return (
    <div className="w-full md:w-[45%] gap-3 p-4 my-1  flex  items-center bg-white rounded-md shadow-2xs hover:shadow-xl/30 border border-gray-400">
      <div className="flex items-center w-full mx-auto">
        <button
          type="button"
          onClick={() => Togglebtn(todo)}
          className={`flex justify-center items-center mx-2 size-5 shrink-0 rounded border-2 transition-colors cursor-pointer ${
            todo.checked
              ? "border-green-500 text-white bg-green-500"
              : "border-gray-500 hover:border-green-500"
          }`}
          aria-label={todo.checked ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.checked && (
            <svg
              className="size-3 text-white"
              fill="none"
              strokeWidth="3"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          )}
        </button>
        <span
          className={`flex transition-color ${
            todo.status === "complete"
              ? "font-semibold text-green-600"
              : "text-gray-900"
          }`}
        >
          {todo.text}
        </span>
      </div>

      <div className="flex justify-end items-center mx-auto">
        <button
          onClick={() => Removebtn(todo)}
          className="shrink-0 opacity-50 hover:opacity-100 text-gray-400 hover:fill-red-500  p-1 rounded hover:bg-red-50 transition-all cursor-pointer"
          aria-label="Remove-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

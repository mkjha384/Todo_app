export interface Todo {
  id: string;
  text: string;
  status: string;
  inputCheck: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export function TodoList({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="w-[80%] md:w-[40%] mx-auto flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-green-500 transition-shadow group">
      <button
        onClick={() => onToggle(todo)}
        className={`shrink-0 size-5 rounded border-2 flex items-center justify-center transition-colors ${
          todo.inputCheck
            ? "bg-green-500  border-green-500"
            : "border-gray-300 hover:border-green-400"
        }`}
        aria-label={todo.inputCheck ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.inputCheck && (
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
        className={`flex-1 transition-all ${
          todo.status === "completed"
            ? "font-semibold text-green-500"
            : "text-gray-900"
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo)}
        className="shrink-0 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1 rounded hover:bg-red-50"
        aria-label="Delete todo"
      >
        <svg
          className="hover:text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
      </button>
    </div>
  );
}

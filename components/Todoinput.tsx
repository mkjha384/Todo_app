import { useState } from "react";

interface InputProps {
  onAdd: (text: string) => void;
}

export const Todoinput = ({ onAdd }: InputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    if (text.trim() === "") return;
    e.preventDefault();
    onAdd(text);
    setText("");

    console.log("text valid", text);
  };

  return (
    <div className="w-full m-2 p-2 max-h-screen mx-auto flex-1">
      <div className="w-full  mx-auto grid  md:flex justify-center align-middle p-2">
        <form
          className="w-full  grid  md:flex justify-center"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Add a new task.."
            value={text}
            onChange={(e) => setText((e.target as HTMLInputElement).value)}
            className="w-[90%] md:w-[40%] rounded-lg  border py-2 px-5 mx-2 text-gray-400"
          />
          <br />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 w-[90%] md:w-40 px-32 md:px-5 py-2 mx-2 max-w-fit rounded-lg text-white text-lg font-medium transition-colors cursor-pointer disabled:opacity-50  disabled:cursor-not-allowed"
            disabled={!text.trim()}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

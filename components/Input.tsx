import { useState } from "react";

interface InputProps {
  OnAdd: (text: string) => void;
}

export const Input = ({ OnAdd }: InputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    if (text.trim() === "") return;
    e.preventDefault();
    OnAdd(text);
    setText("");
  };

  console.log("Text valie", text);
  return (
    <div>
      <div className="flex justify-center items-center w-full mx-auto ">
        <form onSubmit={handleSubmit}>
          <input
            className="w-50 md:w-120 rounded-lg border py-2 px-5 mx-3"
            type="text"
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            className="text-xl text-white font-medium  bg-green-400 px-4 py-2 rounded-lg cursor-pointer hover:bg-green-500 max-w-fit transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!text.trim()}
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

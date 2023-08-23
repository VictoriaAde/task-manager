import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuEdit } from "react-icons/lu";

const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`space-y-6 max-w-lg w-full  bg-white p-4 md:p-8 rounded-md shadow-lg mb-8 ${
        task.completed ? "completed" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <div className="flex justify-between max-sm:flex-col max-sm:gap-1">
        <h2 className="text-lg font-medium">{task.taskTitle}</h2>
        <span className="text-gray-600">{task.date}</span>
      </div>
      <div className="w-full h-[0.0125rem] bg-black bg-opacity-10 mt-8"></div>

      <p>{task.description}</p>
      <div className="w-full h-[0.0125rem] bg-black bg-opacity-10 mt-8"></div>

      <div className="flex justify-center gap-8">
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-sm text-right"
        >
          <RiDeleteBin6Line fontSize={22} />
        </button>

        <button>
          <LuEdit fontSize={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

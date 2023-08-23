import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuEdit } from "react-icons/lu";

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTask({ ...task });
  };

  const handleSave = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  return (
    <div
      className={`space-y-6 max-w-lg w-full  bg-white p-4 md:p-8 rounded-md shadow-lg mb-8 ${
        task.completed ? "completed" : ""
      }`}
    >
      <input
        className="appearance-none checked:bg-[#5c31b3] focus:checked:bg-[#5c31b3] w-5 h-5"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={editedTask.taskTitle}
            onChange={(e) =>
              setEditedTask({ ...editedTask, taskTitle: e.target.value })
            }
          />
          <input
            type="date"
            value={editedTask.date}
            onChange={(e) =>
              setEditedTask({ ...editedTask, date: e.target.value })
            }
          />
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
          />
          <div className="flex justify-center mb-4">
            <button
              onClick={handleSave}
              className="bg-[#04a134] text-white px-6 py-2 rounded-sm mt-5"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between max-sm:flex-col max-sm:gap-1">
            <h2 className="text-lg font-medium">{task.taskTitle}</h2>
            <span className="text-gray-600">{task.date}</span>
          </div>
          <div className="w-full h-[0.0125rem] bg-black bg-opacity-10 mt-8"></div>

          <p>{task.description}</p>
          <div className="w-full h-[0.0125rem] bg-black bg-opacity-10 mt-8"></div>
        </div>
      )}

      <div className="flex justify-center gap-8">
        <button onClick={() => onDelete(task.id)} className="">
          <RiDeleteBin6Line fontSize={22} />
        </button>

        <button onClick={handleEdit}>
          <LuEdit fontSize={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

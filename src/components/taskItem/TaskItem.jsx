import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuEdit } from "react-icons/lu";

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}-${day}-${year}`;
  };

  const handleEdit = () => {
    setIsEditing(true);

    // Format the due_date for the date input (if it exists)
    const formattedDueDate = task.due_date ? task.due_date.split("T")[0] : "";

    setEditedTask({
      ...task,
      due_date: formattedDueDate,
    });
  };

  const handleSave = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };
  const handleInputChange = (field, value) => {
    if (field === "due_date") {
      // Convert the input date format to "yyyy-MM-dd"
      const formattedDate = new Date(value).toISOString().split("T")[0];
      setEditedTask({ ...editedTask, [field]: formattedDate });
    } else {
      setEditedTask({ ...editedTask, [field]: value });
    }
  };
  return (
    <div className="space-y-6 max-w-lg w-full  bg-white p-4 md:p-8 rounded-md shadow-lg mb-8">
      <div className="flex justify-between items-center">
        <div>
          <input
            className="appearance-none checked:bg-[#5c31b3] focus:checked:bg-[#5c31b3] w-5 h-5"
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task._id)}
          />
        </div>

        <div>
          {task.completed ? (
            <span className="ml-2 bg-[#5c31b3] text-white text-xs rounded-lg py-1 px-3">
              Completed
            </span>
          ) : (
            <span className="ml-2 bg-red-500 text-white text-xs rounded-lg p-1 px-3">
              Pending
            </span>
          )}
        </div>
      </div>
      {isEditing ? (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="focus:border-[#04a134] "
            value={editedTask.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
          <input
            type="date"
            className="focus:border-[#04a134] "
            value={editedTask.due_date}
            onChange={(e) => handleInputChange("due_date", e.target.value)}
          />
          <textarea
            className="focus:border-[#04a134] "
            type="text"
            value={editedTask.content}
            onChange={(e) => handleInputChange("content", e.target.value)}
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
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">{task.title}</h2>
            <span className="text-gray-600 text-sm">
              {formatDate(task.due_date)}
            </span>
          </div>
          <div className="w-full h-[0.0125rem] bg-black bg-opacity-10 mt-8"></div>
          <p className="text-base">{task.content}</p>
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

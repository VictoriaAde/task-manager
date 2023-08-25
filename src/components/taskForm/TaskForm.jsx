import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axiosInstance from "../../api";

const TaskForm = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    taskTitle: "",
    description: "",
    date: "",
  });

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.taskTitle.trim() &&
      formData.date.trim() &&
      formData.description.trim()
    ) {
      try {
        await axiosInstance.post("/tasks", {
          title: formData.taskTitle,
          content: formData.description,
          due_date: formData.date,
        });

        // Call the 'onAdd' function with the new task data
        onAdd({
          taskTitle: formData.taskTitle,
          description: formData.description,
          date: formData.date,
        });

        // Reset the form data to empty values
        setFormData({
          taskTitle: "",
          description: "",
          date: "",
        });

        onClose();
      } catch (error) {
        console.error("Could not create task:", error);
      }
    }
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 bg-black bg-opacity-80 w-full flex justify-center items-center">
      <form
        action="POST"
        className="space-y-6 max-w-lg w-full overflow-scroll  bg-white p-8 rounded-md shadow-lg relative"
        onSubmit={handleSubmit}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex place-items-center justify-between cursor-pointer">
          <h5 className="text-lg font-medium">Add New Task</h5>
          <button onClick={onClose}>
            <IoMdClose fontSize={22} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="taskTitle" className="text-gray-700">
            Task Title
          </label>
          <input
            id="taskTitle"
            name="taskTitle"
            type="text"
            autoComplete="text"
            required
            className="focus:border-[#04a134] "
            value={formData.taskTitle}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-gray-700">
            Due date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            autoComplete="date"
            required
            className="focus:border-[#04a134] "
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-gray-700">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            type="text"
            autoComplete="text"
            required
            className="focus:border-[#04a134] "
            value={formData.description}
            onChange={handleChange}
            cols="30"
            rows="5"
          ></textarea>
        </div>

        <div className="inline-flex">
          <button
            onClick={onClose}
            type="button"
            className=" text-white bg-[#5e5476] px-6 py-2 rounded-sm mt-5 mr-4"
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-[#04a134] text-white px-6 py-2 rounded-sm mt-5"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

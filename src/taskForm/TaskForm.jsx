import React, { useState } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

const TaskForm = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    taskTitle: "",
    date: "",
    description: "",
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

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (
      formData.taskTitle.trim() &&
      formData.date.trim() &&
      formData.description.trim()
    ) {
      // Call the 'onAdd' function with the new task data
      onAdd({
        taskTitle: formData.taskTitle,
        date: formData.date,
        description: formData.description,
      });

      // Reset the form data to empty values
      setFormData({
        taskTitle: "",
        date: "",
        description: "",
      });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (
  //     formData.taskTitle.trim() &&
  //     formData.date.trim() &&
  //     formData.description.trim()
  //   ) {
  //     try {
  //       const response = await axios.post("http://localhost:3001/api/login", {
  //         tasktitle: formData.taskTitle,
  //         date: formData.date,
  //         description: formData.description,
  //       });

  //       console.log("Login Successful:", response.data);

  //       // Call the 'onAdd' function with the new task data
  //       onAdd({
  //         taskTitle: formData.taskTitle,
  //         date: formData.date,
  //         description: formData.description,
  //       });

  //       // Reset the form data to empty values
  //       setFormData({
  //         taskTitle: "",
  //         date: "",
  //         description: "",
  //       });

  //       // Redirect to a new page after successful submission
  //       window.location.href = "/dashboard";
  //     } catch (error) {
  //       console.error("Login Error:", error);
  //     }
  //   }
  // };

  return (
    <div className="fixed left-0 top-0 bottom-0 bg-black bg-opacity-80 w-full flex justify-center items-center">
      <form
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
            className=" text-white bg-gray-500 px-6 py-2 rounded-sm mt-5 mr-4"
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

import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const TaskForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    due_date: "",
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
    e.preventDefault();

    if (
      formData.title.trim() &&
      formData.due_date.trim() &&
      formData.content.trim()
    ) {
      onSubmit(formData); // Call the onSubmit prop with the form data
      setFormData({
        title: "",
        content: "",
        due_date: "",
      });

      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

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
          <label htmlFor="title" className="text-gray-700">
            Task Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            autoComplete="text"
            required
            className="focus:border-[#04a134] "
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="due_date" className="text-gray-700">
            Due date
          </label>
          <input
            id="due_date"
            name="due_date"
            type="date"
            autoComplete="due_date"
            required
            className="focus:border-[#04a134] "
            value={formData.due_date}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="text-gray-700">
            content
          </label>

          <textarea
            id="content"
            name="content"
            type="text"
            autoComplete="text"
            required
            className="focus:border-[#04a134] "
            value={formData.content}
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
          <button className="bg-[#04a134] text-white px-6 py-2 rounded-sm mt-5">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

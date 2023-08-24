import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TaskForm from "../../components/taskForm/TaskForm";
import TaskList from "../../components/taskList/TaskList";
import Dropdown from "../../components/dropdown/Dropdown";

const Dashboard = () => {
  const [taskFormIsOpen, setTaskFormIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    const newTask = { id: Date.now(), ...task, completed: false };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const editTask = (editedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === editedTask.id ? { ...editedTask } : task
      )
    );
  };

  const openTaskForm = () => {
    setTaskFormIsOpen(true);
  };

  const closeTaskForm = () => {
    setTaskFormIsOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-full bg-white p-4 md:p-8 rounded-md shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          Task Manager
        </h1>
        <div className="flex justify-between items-center">
          <div
            onClick={openTaskForm}
            id="addNew"
            data-bs-toggle="taskForm"
            data-bs-target="#form"
            className="inline-flex gap-2 cursor-pointer border border-[#04a134] p-1 rounded"
          >
            <span className="text-base">Add New Task</span>
            <button>
              <FaPlus />
            </button>
          </div>

          <div>
            <Dropdown />
          </div>
        </div>
        <div className="w-full h-[0.0125rem] bg-black bg-opacity-10 mt-8"></div>

        <h5 className="text-left my-7 text-xl font-medium text-gray-900">
          Tasks
        </h5>
        <TaskForm
          onAdd={addTask}
          isOpen={taskFormIsOpen}
          onClose={closeTaskForm}
        />
        <div id="tasks">
          <TaskList
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleTask}
            onEdit={editTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

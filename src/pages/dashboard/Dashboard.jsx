import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TaskForm from "../../components/taskForm/TaskForm";
import TaskList from "../../components/taskList/TaskList";
import Dropdown from "../../components/dropdown/Dropdown";

const Dashboard = () => {
  const [taskFormIsOpen, setTaskFormIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);

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

  const filterTasks = () => {
    if (selectedFilter === "Completed") {
      return tasks.filter((task) => task.completed);
    } else if (selectedFilter === "Pending") {
      return tasks.filter((task) => !task.completed);
    } else {
      return tasks;
    }
  };

  const handleSortingOptionChange = (option) => {
    setSelectedSortingOption(option);
  };
  const getFilteredAndSortedTasks = (tasks, filter, sortingOption) => {
    let filteredTasks = filterTasks(tasks, filter);

    if (sortingOption === "Newer First") {
      return filteredTasks.slice().sort((a, b) => b.date.localeCompare(a.date));
    } else if (sortingOption === "Older First") {
      return filteredTasks.slice().sort((a, b) => a.date.localeCompare(b.date));
    } else {
      return filteredTasks;
    }
  };

  const filteredAndSortedTasks = getFilteredAndSortedTasks(
    tasks,
    selectedFilter,
    selectedSortingOption
  );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-full bg-white p-4 md:p-8 rounded-md shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          Task Manager
        </h1>
        <div className="flex flex-col max-sm:gap-6 md:flex-row justify-between items-center">
          <div
            onClick={openTaskForm}
            id="addNew"
            data-bs-toggle="taskForm"
            data-bs-target="#form"
            className="inline-flex gap-2 cursor-pointer border border-[#04a134] p-1 px-2 rounded"
          >
            <span className="text-base">Add New Task</span>
            <button>
              <FaPlus />
            </button>
          </div>

          <div>
            <Dropdown
              onSortingOptionChange={handleSortingOptionChange}
              selectedSortingOption={selectedSortingOption}
            />
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
            tasks={filteredAndSortedTasks} // Use filteredAndSortedTasks
            // tasks={filterTasks()} // Apply the filter to tasks
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

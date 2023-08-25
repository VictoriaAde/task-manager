import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TaskForm from "../../components/taskForm/TaskForm";
import TaskList from "../../components/taskList/TaskList";
import Dropdown from "../../components/dropdown/Dropdown";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutModal from "../../components/logoutModal/LogoutModal";

const Dashboard = () => {
  const [taskFormIsOpen, setTaskFormIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

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

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Task Manager
          </h1>
          <button
            onClick={() => setShowLogoutConfirmation(true)}
            className="bg-red-500 text-white py-1 px-3 rounded font-semibold"
          >
            Log Out
          </button>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirmation && (
          <LogoutModal setShowLogoutConfirmation={setShowLogoutConfirmation} />
        )}

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
              onFilterChange={handleFilterChange}
              selectedFilter={selectedFilter}
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
            tasks={filteredAndSortedTasks}
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

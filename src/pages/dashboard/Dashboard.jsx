import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import TaskForm from "../../components/taskForm/TaskForm";
import TaskList from "../../components/taskList/TaskList";
import Dropdown from "../../components/dropdown/Dropdown";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutModal from "../../components/logoutModal/LogoutModal";
import axiosInstance from "../../api";

const Dashboard = () => {
  const [taskFormIsOpen, setTaskFormIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get("/tasks");
      const tasksFromAPI = response.data;
      setTasks(tasksFromAPI);
      setLoading(false);
    } catch (error) {
      console.error("Could not fetch tasks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const addTask = async (task) => {
    try {
      const response = await axiosInstance.post("/tasks", {
        title: task.taskTitle,
        content: task.description,
        due_date: task.date,
        completed: false,
      });

      const newTask = response.data.task;
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Could not add task:", error);
    }
  };

  const deleteTask = async (_id) => {
    try {
      await axiosInstance.delete(`/tasks/${_id}`);
      setTasks(tasks.filter((task) => task._id !== _id));
    } catch (error) {
      console.error("Could not delete task:", error);
    }
  };

  const toggleTask = async (_id) => {
    try {
      const taskToUpdate = tasks.find((task) => task._id === _id);
      const updatedTask = {
        ...taskToUpdate,
        completed: !taskToUpdate.completed,
      };
      await axiosInstance.put(`/tasks/${_id}`, updatedTask);
      setTasks(tasks.map((task) => (task._id === _id ? updatedTask : task)));
    } catch (error) {
      console.error("Could not toggle task:", error);
    }
  };

  const editTask = async (editedTask) => {
    try {
      await axiosInstance.put(`/tasks/${editedTask._id}`, editedTask);
      setTasks(
        tasks.map((task) => (task._id === editedTask._id ? editedTask : task))
      );
    } catch (error) {
      console.error("Could not edit task:", error);
    }
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
    let filteredTasks = filterTasks();

    if (sortingOption === "Newer First") {
      return filteredTasks.slice().sort((a, b) => {
        if (a.due_date && b.due_date) {
          return b.due_date.localeCompare(a.due_date);
        }
        return 0; // Handle the case where due_date is missing
      });
    } else if (sortingOption === "Older First") {
      return filteredTasks.slice().sort((a, b) => {
        if (a.due_date && b.due_date) {
          return a.due_date.localeCompare(b.due_date);
        }
        return 0; // Handle the case where due_date is missing
      });
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
        <div className="flex justify-between items-center mb-8 max-sm:flex-col max-sm:gap-6 ">
          <h1 className="text-3xl sm:text-xl font-extrabold text-gray-900 max-sm:order-2">
            Task Manager
          </h1>
          <button
            onClick={() => setShowLogoutConfirmation(true)}
            className="bg-red-500 text-white py-1 px-3 rounded font-semibold max-sm:order-1 max-sm:grid max-sm:self-end"
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
          {loading ? (
            <p>Loading tasks...</p>
          ) : (
            <TaskList
              tasks={filteredAndSortedTasks}
              onDelete={deleteTask}
              onToggle={toggleTask}
              onEdit={editTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

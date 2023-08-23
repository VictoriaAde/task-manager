import React from "react";
import TaskItem from "../taskItem/TaskItem";

const TaskList = ({ tasks, onDelete, onToggle }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      {tasks.length === 0 ? (
        <div className="w-full">
          <p className=" text-[#454545] text-sm py-16">
            Your added tasks wil show here
          </p>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
